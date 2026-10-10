import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Circular avatar cropping the character illustration to the head.
 * Crop offsets come from Figma (128px frame) as percentages so it scales.
 * Hover makes the character wave its head.
 */
export function Avatar({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`group relative size-32 shrink-0 overflow-hidden rounded-full border-2 border-line bg-paper shadow-halo ${className}`}
      style={style}
    >
      <Image
        src="/brand/avatar-character.svg"
        alt="Illustration of Jason"
        width={320}
        height={325}
        preload
        className="absolute max-w-none origin-[56%_28%] group-hover:animate-wave"
        style={{ left: "-93.07%", top: "23.62%", width: "250.24%", height: "auto" }}
      />
    </div>
  );
}
