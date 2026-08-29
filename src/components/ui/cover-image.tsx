import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface CoverImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackIcon?: "flame" | "sparkles" | "cross";
}

/**
 * Responsive image used on cards. Renders the provided image (local or remote
 * URL) with `next/image`; otherwise shows an elegant branded fallback so the
 * layout never breaks while content placeholders are in use.
 */
export function CoverImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
  priority,
  fallbackIcon = "sparkles",
}: CoverImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-brand-900/90", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gold-300/80">
          <span
            aria-hidden="true"
            className="mb-1 flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/40 bg-brand-900/40"
          >
            <Icon name={fallbackIcon} className="h-6 w-6" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Image
          </span>
        </div>
      )}
    </div>
  );
}