import { cn } from "@/lib/utils";

interface LoopingVideoProps {
  src: string;
  /** Still frame shown before the video loads, on the same honey-gradient backing. */
  poster?: string;
  position?: string;
  className?: string;
}

/**
 * A muted, autoplaying, looping video on the shared honey-gradient backing.
 * Matches AssetImage so video and photo frames read as one system, and the
 * gradient keeps the frame warm before the clip loads.
 */
export function LoopingVideo({
  src,
  poster,
  position = "center center",
  className,
}: LoopingVideoProps) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background:
          "linear-gradient(150deg, #efe4d0 0%, #e7cf9f 45%, #d9a94e 100%)",
      }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
