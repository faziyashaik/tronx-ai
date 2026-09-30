"use client";

import { AnimatedNumber } from "@/components/core/animated-number";

interface AnimatedStatItemProps {
  rawVal?: string;
  label?: string;
}

export default function AnimatedStatItem({ rawVal = "", label = "" }: AnimatedStatItemProps) {
  // Parse numeric part and suffix/prefix
  const match = rawVal.match(/^(\D*)(\d+)(\D*)$/);

  if (!match) {
    return (
      <div className="space-y-1">
        <div className="text-3xl sm:text-5xl font-black tracking-tight text-vfx-cyan-light font-mono">
          {rawVal}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
          {label}
        </div>
      </div>
    );
  }

  const prefix = match[1] || "";
  const numericVal = parseInt(match[2], 10);
  const suffix = match[3] || "";

  return (
    <div className="space-y-1">
      <div className="text-3xl sm:text-5xl font-black tracking-tight text-vfx-cyan-light font-mono inline-flex items-center justify-center">
        {prefix && <span>{prefix}</span>}
        <AnimatedNumber
          value={numericVal}
          className="inline-flex items-center"
          springOptions={{
            bounce: 0,
            duration: 2000,
          }}
        />
        {suffix && <span>{suffix}</span>}
      </div>
      <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
        {label}
      </div>
    </div>
  );
}
