"use client";

import Link from "next/link";
import { ArrowRight, Cpu, CheckCircle2 } from "lucide-react";
import { PortfolioData } from "@/components/PortfolioCard";

interface CaseStudyDetailsProps {
  item: PortfolioData;
  index: number;
}

export default function CaseStudyDetails({ item, index }: CaseStudyDetailsProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  const ctaDestination =
    item.ctaLink && item.ctaLink.trim() !== ""
      ? item.ctaLink
      : `/portfolio/${item.slug}`;

  const ctaLabel = item.ctaText || "View Case Study";

  return (
    <div className="flex flex-col justify-between h-full space-y-6 lg:space-y-8">
      {/* Top Editorial Metadata & Number */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <span className="text-4xl sm:text-6xl font-black font-mono tracking-tighter text-vfx-cyan-light">
            {formattedIndex}
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-[11px] font-mono font-bold tracking-widest text-cyan-900 uppercase">
            <Cpu className="w-3 h-3 text-cyan-600" />
            <span>{item.category || "CASE STUDY"}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
          {item.title}
        </h3>

        {/* Short Description */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {item.shortDescription || item.description}
        </p>
      </div>

      {/* Center: Tech Stack Pills & Features */}
      {item.technologies && item.technologies.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>Technologies & Capabilities</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-mono font-bold text-slate-700 hover:border-cyan-400 hover:text-cyan-800 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA Button */}
      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
        <Link
          href={ctaDestination}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </Link>

        <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-widest hidden sm:inline-block">
          TRONX Transformation
        </span>
      </div>
    </div>
  );
}
