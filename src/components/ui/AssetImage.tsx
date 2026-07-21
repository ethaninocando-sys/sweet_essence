import Image from "next/image";
import { cn } from "@/lib/utils";

interface AssetImageProps {
  src: string;
  alt: string;
  /** object-position passed through to the underlying image. */
  position?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * A `fill` image on a honey-gradient backing. The gradient guarantees the
 * frame reads as intentional even before/without the photo, and gives every
 * product/hero frame a warm base tone consistent across the three directions.
 */
export function AssetImage({
  src,
  alt,
  position = "center center",
  className,
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority = false,
}: AssetImageProps) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background:
          "linear-gradient(150deg, #efe4d0 0%, #e7cf9f 45%, #d9a94e 100%)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
