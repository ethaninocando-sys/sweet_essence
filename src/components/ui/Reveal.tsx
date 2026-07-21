"use client";

import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger helper — seconds of delay before the reveal begins. */
  delay?: number;
  /** Vertical travel distance in px (default 24, matching the design). */
  y?: number;
}

/**
 * Scroll-triggered fade-up. Replaces the design's load-time `seFadeUp`
 * animation with an on-view reveal.
 *
 * Reduced-motion is handled explicitly (read from matchMedia rather than
 * framer's hook, which proved unreliable here): those users get a plain,
 * always-visible container so content is never left hidden.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
