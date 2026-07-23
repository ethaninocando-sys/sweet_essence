"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollVideoProps {
  src: string;
  /** Still shown before the clip is buffered. */
  poster?: string;
  position?: string;
  className?: string;
}

/**
 * A muted video whose playhead is driven by scroll via GSAP ScrollTrigger.
 * As the frame travels up through the viewport, the clip scrubs first→last
 * frame (and back on scroll-up). GSAP's `scrub` eases the playhead so motion
 * reads smooth. The source clips are re-encoded all-intra (every frame a
 * keyframe) so each seek decodes instantly instead of stuttering.
 */
export function ScrollVideo({
  src,
  poster,
  position = "center center",
  className,
}: ScrollVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = { t: 0 };
    let tween: gsap.core.Tween | null = null;

    const build = () => {
      const duration = video.duration || 0;
      if (!duration) return;

      if (reduce) {
        video.currentTime = duration * 0.4;
        return;
      }

      tween = gsap.to(state, {
        t: 1,
        ease: "none",
        onUpdate: () => {
          if (video.readyState >= 1) {
            // stay a hair inside the end so the final frame always resolves
            video.currentTime = Math.min(state.t * duration, duration - 0.05);
          }
        },
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    };

    if (video.readyState >= 1) build();
    else video.addEventListener("loadedmetadata", build, { once: true });

    // Re-measure once layout settles (this direction mounts client-side).
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refresh);
      video.removeEventListener("loadedmetadata", build);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ background: "linear-gradient(150deg,#2a1c0d,#120b04)" }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
