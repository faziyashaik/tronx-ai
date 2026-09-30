"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Layers, Play } from "lucide-react";

interface CaseStudyMediaProps {
  image?: string;
  title: string;
  category?: string;
  pointer: { x: number; y: number };
  reducedMotion?: boolean;
}

export default function CaseStudyMedia({
  image,
  title,
  category,
  pointer,
  reducedMotion = false,
}: CaseStudyMediaProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80";
  const displayImage = image && image.trim() !== "" ? image : fallbackImage;

  // Calculate subtle pointer shift & 3D tilt
  const translateX = reducedMotion ? 0 : pointer.x * 14;
  const translateY = reducedMotion ? 0 : pointer.y * 14;
  const rotateX = reducedMotion ? 0 : -pointer.y * 4;
  const rotateY = reducedMotion ? 0 : pointer.x * 4;

  return (
    <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden group perspective-1000 shadow-2xl border border-white/60 bg-white/40 backdrop-blur-xl">
      {/* Container with smooth lerp pointer transform */}
      <div
        className="w-full h-full relative transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${translateX}px, ${translateY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Main Project Image */}
        <Image
          src={displayImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 50vw"
          className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent transition-opacity duration-300" />
        
        {/* Light Sweep Highlight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Category Floating Pill */}
        {category && (
          <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-xs font-bold uppercase tracking-wider text-cyan-900 shadow-md">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>{category}</span>
          </div>
        )}

        {/* Floating TRONX AI Interactive Badge */}
        <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-mono text-cyan-400 shadow-md">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>TRONX CASE STUDY</span>
        </div>

        {/* Bottom Interactive Prompt */}
        <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white text-xs font-bold text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play className="w-3.5 h-3.5 text-cyan-600 fill-cyan-600" />
          <span>Interactive Preview</span>
        </div>
      </div>
    </div>
  );
}
