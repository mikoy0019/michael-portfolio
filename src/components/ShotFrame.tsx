import Image from "next/image";
import type { Shot } from "@/content/projects";

type FrameProps = {
  shot: Shot;
  /** Text in the window bar, usually the hostname. Omitted on small insets. */
  label?: string;
  sizes: string;
  priority?: boolean;
  /** Crop the image to the parent's box instead of keeping its own aspect ratio. */
  fill?: boolean;
  className?: string;
};

/** A screenshot inside a browser-window frame: three dots, an optional title, then the image. */
export function Frame({ shot, label, sizes, priority = false, fill = false, className = "" }: FrameProps) {
  const contain = fill && shot.portrait;
  return (
    <div className={`frame ${className}`.trim()}>
      <div className="frame-bar" aria-hidden>
        <span className="frame-dot" />
        <span className="frame-dot" />
        <span className="frame-dot" />
        {label && <span className="frame-label">{label}</span>}
      </div>
      <div className={`frame-body ${fill ? "frame-body-fill" : ""} ${contain ? "frame-body-contain" : ""}`.trim()}>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.w ?? 1600}
          height={shot.h ?? 1000}
          sizes={sizes}
          priority={priority}
          className={fill ? (contain ? "h-full w-full object-contain" : "h-full w-full object-cover object-left-top") : "h-auto w-full"}
        />
      </div>
    </div>
  );
}

/**
 * The card visual: a lead screenshot with an optional second one layered over its corner,
 * on a soft accent glow. Always a 16:10 box so cards in a grid line up.
 */
export function ShotStack({ lead, inset, label, sizes }: { lead: Shot; inset?: Shot; label?: string; sizes: string }) {
  return (
    <div className="visual" data-visual>
      <Frame shot={lead} label={label} sizes={sizes} fill className="visual-lead" />
      {inset && <Frame shot={inset} sizes="(min-width: 768px) 260px, 45vw" fill className={`visual-inset ${inset.portrait ? "is-portrait" : ""}`.trim()} />}
    </div>
  );
}

export function hostOf(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}
