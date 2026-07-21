"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
  /** Classes for the hamburger / close trigger. */
  triggerClassName?: string;
  /** Classes for the dropdown panel surface. */
  panelClassName?: string;
  /** Classes for each link. */
  linkClassName?: string;
}

/**
 * Shared mobile navigation. The three directions have no mobile nav in the
 * mockup, so this introduces an accessible hamburger + dropdown, themed per
 * direction through the *ClassName props. Only rendered under `lg`.
 */
export function MobileMenu({
  items,
  triggerClassName,
  panelClassName,
  linkClassName,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full",
          triggerClassName
        )}
      >
        {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute right-0 top-14 z-50 flex w-60 flex-col gap-1 rounded-2xl p-3 shadow-2xl",
              panelClassName
            )}
          >
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-[15px] font-medium",
                  linkClassName
                )}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
