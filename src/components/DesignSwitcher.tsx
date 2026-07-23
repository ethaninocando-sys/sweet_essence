"use client";

import type { Direction } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DesignSwitcherProps {
  value: Direction;
  onChange: (d: Direction) => void;
}

const OPTIONS: { id: Direction; label: string }[] = [
  { id: 1, label: "1 · Editorial" },
  { id: 2, label: "2 · Organic" },
  { id: 3, label: "3 · Bold" },
  { id: 4, label: "4 · Cinematic" },
];

/**
 * Floating pill that toggles between the three home-page directions —
 * a faithful port of the design's bottom switcher, now keyboard-operable.
 */
export function DesignSwitcher({ value, onChange }: DesignSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Choose a design direction"
      className="fixed bottom-5 left-1/2 z-[999] flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-honey/25 bg-[rgba(20,13,5,0.92)] p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <span className="px-3 pl-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-taupe">
        Design
      </span>
      {OPTIONS.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 sm:px-5",
              active
                ? "bg-honey text-espresso"
                : "bg-transparent text-sand hover:text-parchment"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
