"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { DesignSwitcher } from "@/components/DesignSwitcher";
import { BoldHome } from "@/components/directions/bold/BoldHome";
import { CinematicHome } from "@/components/directions/cinematic/CinematicHome";
import { EditorialHome } from "@/components/directions/editorial/EditorialHome";
import { OrganicHome } from "@/components/directions/organic/OrganicHome";
import type { Direction } from "@/lib/types";

const isDirection = (n: number): n is Direction =>
  n === 1 || n === 2 || n === 3 || n === 4;

/**
 * Client shell that owns the active design direction. The choice is mirrored
 * to the URL (`?design=2`) so a refresh or shared link keeps the same look.
 */
export function HomeExperience() {
  const [direction, setDirection] = useState<Direction>(1);
  const reduce = useReducedMotion();

  // Hydrate the initial direction from the URL once on mount.
  useEffect(() => {
    const param = Number(
      new URLSearchParams(window.location.search).get("design")
    );
    if (isDirection(param)) setDirection(param);
  }, []);

  const choose = (d: Direction) => {
    setDirection(d);
    const url = new URL(window.location.href);
    url.searchParams.set("design", String(d));
    window.history.replaceState(null, "", url);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.35 }}
        >
          {direction === 1 && <EditorialHome />}
          {direction === 2 && <OrganicHome />}
          {direction === 3 && <BoldHome />}
          {direction === 4 && <CinematicHome />}
        </motion.div>
      </AnimatePresence>

      <DesignSwitcher value={direction} onChange={choose} />
    </>
  );
}
