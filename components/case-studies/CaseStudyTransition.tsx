"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface CaseStudyTransitionProps {
  itemKey: string | number;
  children: ReactNode;
}

export default function CaseStudyTransition({
  itemKey,
  children,
}: CaseStudyTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={itemKey}
        initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)", y: 12 }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, scale: 0.97, filter: "blur(8px)", y: -12 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
