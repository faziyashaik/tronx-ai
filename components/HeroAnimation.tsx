"use client";

import dynamic from "next/dynamic";
import { Cpu } from "lucide-react";

const AIQuantumCore = dynamic(
  () => import("@/components/vfx/AIQuantumCore"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[560px] rounded-3xl bg-slate-950/90 border border-cyan-500/40 shadow-2xl flex items-center justify-center">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold animate-pulse">
          <Cpu className="w-5 h-5 animate-spin text-cyan-400" />
          <span>INITIALIZING 3D QUANTUM NEURAL ENGINE...</span>
        </div>
      </div>
    ),
  }
);

export default function HeroAnimation() {
  return (
    <div className="relative w-full">
      <AIQuantumCore />
    </div>
  );
}
