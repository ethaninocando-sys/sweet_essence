"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Cinematic hero.
 *
 * The honey "film" is a lazy-loaded WebP image sequence (not a <video>),
 * drawn through the same WebGL shader as before so the grain / vignette /
 * chromatic-aberration / parallax look is preserved exactly. A GSAP
 * ScrollTrigger pins the stage and scrubs the frame index from scroll
 * progress, giving frame-exact forward AND reverse playback with none of the
 * per-seek video decoding that makes <video> currentTime scrubbing stutter
 * (especially on mobile Safari). All animation state lives in refs; React
 * never re-renders during scroll.
 */

const FRAME_BASE = "/assets/hero-frames/f_";
const FRAME_COUNT = 97;
const FRAME_PAD = 3;
const POSTER = "/assets/gen-hero-cine.png";

const frameUrl = (i: number) =>
  `${FRAME_BASE}${String(i + 1).padStart(FRAME_PAD, "0")}.webp`;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uTex;
  uniform vec2  uResolution;
  uniform float uTexAspect;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uGrain;
  uniform float uAberration;
  uniform float uParallax;
  uniform float uVignette;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec2 coverUv(vec2 uv) {
    float planeAspect = uResolution.x / uResolution.y;
    vec2 scale = planeAspect < uTexAspect
      ? vec2(planeAspect / uTexAspect, 1.0)
      : vec2(1.0, uTexAspect / planeAspect);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 drift = vec2(sin(uTime * 0.08), cos(uTime * 0.06)) * 0.0035;
    vec2 cuv = coverUv(vUv + uMouse * uParallax + drift);

    vec2 dir = cuv - 0.5;
    float ab = uAberration * dot(dir, dir);
    float r = texture2D(uTex, cuv + dir * ab).r;
    float g = texture2D(uTex, cuv).g;
    float b = texture2D(uTex, cuv - dir * ab).b;
    vec3 col = vec3(r, g, b);

    col = pow(col, vec3(0.94));
    col *= vec3(1.04, 1.0, 0.92);

    float d = length(vUv - 0.5);
    col *= mix(1.0, smoothstep(0.9, 0.32, d), uVignette);

    float grain = hash(vUv * uResolution * 0.5 + fract(uTime) * 100.0);
    col += (grain - 0.5) * uGrain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function CinematicHero() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!trigger || !pin || !stage) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- frames: preloaded over the network, decoded on demand ------------
    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let loadedMax = -1; // highest contiguous loaded index; scrub clamps to it

    const preload = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameUrl(i);
      });

    // ---- renderer: WebGL (with effects) or a 2D canvas fallback -----------
    let disposed = false;
    let useGL = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.Camera | null = null;
    let texture: THREE.Texture | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let mesh: THREE.Mesh | null = null;
    let canvas2d: HTMLCanvasElement | null = null;
    let ctx2d: CanvasRenderingContext2D | null = null;
    let uniforms: Record<string, { value: unknown }> | null = null;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      useGL = true;
    } catch {
      useGL = false;
    }

    if (useGL && renderer) {
      THREE.ColorManagement.enabled = false;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.className = "absolute inset-0 h-full w-full";
      stage.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.Camera();

      const blank = document.createElement("canvas");
      blank.width = blank.height = 2;
      texture = new THREE.Texture(blank);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;

      uniforms = {
        uTex: { value: texture },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTexAspect: { value: 16 / 9 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uGrain: { value: 0.055 },
        uAberration: { value: 0.9 },
        uParallax: { value: 0.012 },
        uVignette: { value: 0.85 },
      };
      material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
      });
      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);
    } else {
      canvas2d = document.createElement("canvas");
      canvas2d.className = "absolute inset-0 h-full w-full";
      ctx2d = canvas2d.getContext("2d");
      stage.appendChild(canvas2d);
    }

    // ---- sizing (read once per resize, not per frame) ---------------------
    const size = { w: 0, h: 0, dpr: Math.min(window.devicePixelRatio || 1, 2) };
    const setSize = () => {
      size.w = pin.clientWidth;
      size.h = pin.clientHeight;
      if (useGL && renderer && uniforms) {
        renderer.setSize(size.w, size.h);
        const buf = renderer.getDrawingBufferSize(new THREE.Vector2());
        (uniforms.uResolution.value as THREE.Vector2).set(buf.x, buf.y);
      } else if (canvas2d) {
        canvas2d.width = Math.round(size.w * size.dpr);
        canvas2d.height = Math.round(size.h * size.dpr);
        if (curIdx >= 0) draw2d(curIdx);
      }
    };

    // ---- draw a specific frame -------------------------------------------
    let curIdx = -1;
    const draw2d = (idx: number) => {
      const img = frames[idx];
      if (!img || !ctx2d || !canvas2d) return;
      const cw = canvas2d.width;
      const ch = canvas2d.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number, dh: number;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
      } else {
        dh = ch;
        dw = ch * ir;
      }
      ctx2d.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };
    const showFrame = (idx: number) => {
      const img = frames[idx];
      if (!img) return;
      if (useGL && texture && uniforms) {
        (uniforms.uTexAspect.value as number) =
          img.naturalWidth / img.naturalHeight;
        texture.image = img;
        texture.needsUpdate = true;
      } else {
        draw2d(idx);
      }
      if (posterRef.current && posterRef.current.style.opacity !== "0") {
        posterRef.current.style.opacity = "0";
      }
    };

    // ---- render loop (single rAF, driven by GSAP's ticker) ---------------
    const state = { f: 0 }; // frame float, tweened by ScrollTrigger
    const render = (_t: number, deltaMs: number) => {
      if (disposed) return;
      const idx = Math.min(Math.max(Math.round(state.f), 0), Math.max(loadedMax, 0));
      if (idx !== curIdx && frames[idx]) {
        curIdx = idx;
        showFrame(idx);
      }
      if (useGL && renderer && scene && camera && uniforms) {
        (uniforms.uTime.value as number) += (deltaMs || 16) / 1000;
        renderer.render(scene, camera);
      }
    };

    // ---- pointer parallax (desktop only; no-op on touch) ------------------
    const targetMouse = new THREE.Vector2(0, 0);
    const onPointer = (e: PointerEvent) => {
      if (!pin) return;
      const rect = pin.getBoundingClientRect();
      targetMouse.set(
        ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        ((e.clientY - rect.top) / rect.height - 0.5) * -2,
      );
    };
    const easeMouse = () => {
      if (uniforms) (uniforms.uMouse.value as THREE.Vector2).lerp(targetMouse, 0.05);
    };

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer);

    // ---- boot -------------------------------------------------------------
    let tween: gsap.core.Tween | null = null;

    const boot = async () => {
      setSize();
      // First frame ASAP so the poster can hand off with no black flash.
      await preload(0);
      if (disposed) return;
      loadedMax = 0;
      showFrame(0);
      if (useGL && renderer && scene && camera) renderer.render(scene, camera);

      if (reduce) return; // static hero; no scrub, no ticker

      // Drive frame index from scroll. GSAP `scrub` eases the playhead so it
      // stays glued to the scroll in both directions.
      tween = gsap.to(state, {
        f: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 1.8),
          pin,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.ticker.add(render);
      gsap.ticker.add(easeMouse);
      ScrollTrigger.refresh();

      // Load the remaining frames in order so the scrub range fills in.
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (disposed) return;
        await preload(i);
        loadedMax = i;
      }
      ScrollTrigger.refresh();
    };
    boot();

    // ---- teardown ---------------------------------------------------------
    return () => {
      disposed = true;
      gsap.ticker.remove(render);
      gsap.ticker.remove(easeMouse);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      if (renderer) {
        renderer.domElement.remove();
        mesh?.geometry.dispose();
        material?.dispose();
        texture?.dispose();
        renderer.dispose();
      }
      canvas2d?.remove();
    };
  }, []);

  return (
    <section ref={triggerRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-[100svh] min-h-[620px] w-full overflow-hidden"
      >
        {/* WebGL / canvas stage */}
        <div ref={stageRef} className="absolute inset-0 z-0" />

        {/* poster: shown until the first real frame is drawn */}
        <img
          ref={posterRef}
          src={POSTER}
          alt=""
          aria-hidden
          className="absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500"
        />

        {/* letterbox bars + legibility scrims */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[16vh] bg-gradient-to-b from-espresso/95 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[30vh] bg-gradient-to-t from-espresso via-espresso/70 to-transparent" />

        {/* film-frame accents */}
        <div className="pointer-events-none absolute left-[6vw] top-[13vh] z-[3] flex items-center gap-2 font-mono text-[11px] uppercase tracking-[2px] text-honey/80">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-honey" />
          Rec
        </div>
        <div className="pointer-events-none absolute right-[6vw] top-[13vh] z-[3] font-mono text-[11px] uppercase tracking-[2px] text-sand/70">
          SE · 24fps · RGV
        </div>

        {/* overlay copy */}
        <div className="absolute inset-0 z-[3] flex items-end px-[6vw] pb-[12vh]">
          <Reveal className="max-w-[880px]">
            <span className="font-mono text-[12px] uppercase tracking-[5px] text-honey">
              Raw · Unfiltered · Family Farmed
            </span>
            <h1 className="mt-5 font-display text-[clamp(48px,8vw,120px)] font-extrabold leading-[.92] text-white">
              Liquid gold,
              <br />
              <span className="italic text-honey">in motion.</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[18px] font-light leading-[1.7] text-sand">
              Pure raw honey from our family farm in the Rio Grande Valley. Shot
              up close, exactly as it pours from the comb.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#products"
                className="rounded-full bg-honey px-9 py-[16px] text-[15px] font-bold tracking-[.5px] text-espresso transition-transform hover:-translate-y-0.5"
              >
                Shop the Collection
              </a>
              <a
                href="#story"
                className="rounded-full border border-honey/50 px-9 py-[16px] text-[15px] font-semibold text-parchment-2 transition-colors hover:border-honey"
              >
                Watch the Story
              </a>
            </div>
          </Reveal>
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 text-sand/70">
          <span className="font-mono text-[10px] uppercase tracking-[3px]">Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-honey/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
