"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform, SpringOptions, useInView } from "framer-motion";

export interface AnimatedNumberProps {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
}

export function AnimatedNumber({
  value,
  className = "",
  springOptions = { bounce: 0, duration: 2000 },
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spring = useSpring(0, springOptions);
  const display = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
