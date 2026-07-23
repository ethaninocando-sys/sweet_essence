"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LoopingVideoProps {
  src: string;
  /** Still frame shown before the video loads, on the same honey-gradient backing. */
  poster?: string;
  position?: string;
  className?: string;
}

/**
 * A muted, looping video on the shared honey-gradient backing. Matches
 * AssetImage so video and photo frames read as one system. Playback is gated
 * to when the frame is on screen (IntersectionObserver), so several background
 * clips down a page don't all decode at once.
 */
export function LoopingVideo({
  src,
  poster,
  position = "center center",
  className,
}: LoopingVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background:
          "linear-gradient(150deg, #efe4d0 0%, #e7cf9f 45%, #d9a94e 100%)",
      }}
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
