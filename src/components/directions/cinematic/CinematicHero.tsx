"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Cinematic hero.
 *
 * The honey "film" is a muted, looping <video> drawn through a WebGL shader
 * so the grain / vignette / chromatic-aberration / parallax look is
 * preserved. It just autoplays — no scroll pin, no scrub. All animation
 * state lives in refs; React never re-renders during playback.
 */

const VIDEO_SRC = "/assets/vid-hero-cinematic.mp4";
const POSTER = "/assets/gen-hero-cine.png";

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
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!pin || !stage || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- renderer: WebGL (with effects) or plain <video> fallback ---------
    let disposed = false;
    let useGL = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.Camera | null = null;
    let texture: THREE.VideoTexture | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let mesh: THREE.Mesh | null = null;
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

      texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

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
    }
    // No WebGL: the plain <video> element in the JSX below shows through and
    // plays on its own, so there's nothing else to set up here.

    // ---- sizing (read once per resize, not per frame) ---------------------
    const setSize = () => {
      if (useGL && renderer && uniforms) {
        renderer.setSize(pin.clientWidth, pin.clientHeight);
        const buf = renderer.getDrawingBufferSize(new THREE.Vector2());
        (uniforms.uResolution.value as THREE.Vector2).set(buf.x, buf.y);
      }
    };

    // ---- render loop (single rAF, driven by GSAP's ticker) ---------------
    const render = (_t: number, deltaMs: number) => {
      if (disposed || !renderer || !scene || !camera || !uniforms) return;
      if (video.videoWidth) {
        (uniforms.uTexAspect.value as number) = video.videoWidth / video.videoHeight;
      }
      (uniforms.uTime.value as number) += (deltaMs || 16) / 1000;
      renderer.render(scene, camera);
    };

    // ---- pointer parallax (desktop only; no-op on touch) ------------------
    const targetMouse = new THREE.Vector2(0, 0);
    const onPointer = (e: PointerEvent) => {
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

    // ---- boot: just autoplay, no scroll pin / scrub ------------------------
    setSize();

    const hidePoster = () => {
      if (posterRef.current) posterRef.current.style.opacity = "0";
    };

    // Reduced motion: leave the poster in place, nothing plays or animates.
    if (!reduce) {
      video.addEventListener("playing", hidePoster, { once: true });
      video.play().catch(() => {
        // Autoplay blocked; poster stays until the user interacts.
      });

      if (useGL) {
        gsap.ticker.add(render);
        gsap.ticker.add(easeMouse);
      }
    }

    // ---- teardown -----------------------------------------------------------
    return () => {
      disposed = true;
      gsap.ticker.remove(render);
      gsap.ticker.remove(easeMouse);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      video.removeEventListener("playing", hidePoster);
      if (renderer) {
        renderer.domElement.remove();
        mesh?.geometry.dispose();
        material?.dispose();
        texture?.dispose();
        renderer.dispose();
      }
    };
  }, []);

  return (
    <section className="relative">
      <div
        ref={pinRef}
        className="relative h-[100svh] min-h-[620px] w-full overflow-hidden"
      >
        {/* source video: WebGL reads it as a texture; also the fallback if WebGL is unavailable */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />

        {/* WebGL stage (drawn on top of the video when available) */}
        <div ref={stageRef} className="absolute inset-0 z-0" />

        {/* poster: shown until the video starts playing */}
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
