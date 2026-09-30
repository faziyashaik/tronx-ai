"use client";

import { useRef, useEffect } from "react";
import { PortfolioData } from "@/components/PortfolioCard";
import { ChevronRight } from "lucide-react";

interface CaseStudyNavigationProps {
  items: PortfolioData[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function CaseStudyNavigation({
  items,
  selectedIndex,
  onSelect,
  categories,
  selectedCategory,
  onSelectCategory,
}: CaseStudyNavigationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        onSelect((selectedIndex + 1) % Math.max(1, items.length));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        onSelect((selectedIndex - 1 + items.length) % Math.max(1, items.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, items.length, onSelect]);

  return (
    <div className="space-y-6 flex flex-col justify-between h-full">
      {/* Category Pills Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold tracking-widest text-slate-600 uppercase">
          Filter Sector
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white/80 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Selector List */}
      <div
        ref={containerRef}
        className="space-y-2 overflow-y-auto max-h-[380px] lg:max-h-[460px] pr-2 custom-scrollbar focus:outline-none"
        tabIndex={0}
        aria-label="Case study list navigation. Use arrow keys to change selection."
      >
        <div className="text-xs font-mono font-bold tracking-widest text-slate-600 uppercase mb-3">
          Select Transformation ({items.length})
        </div>

        {items.map((item, idx) => {
          const isSelected = idx === selectedIndex;
          const formattedNum = String(idx + 1).padStart(2, "0");

          return (
            <button
              key={item._id || item.slug || idx}
              type="button"
              onClick={() => onSelect(idx)}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                isSelected
                  ? "bg-gradient-to-r from-cyan-600/10 via-violet-600/10 to-transparent border-l-4 border-cyan-600 shadow-sm text-slate-900"
                  : "bg-white/40 border border-slate-200/60 hover:bg-white/90 text-slate-600"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={`text-sm font-mono font-black ${
                    isSelected ? "text-cyan-700" : "text-slate-600"
                  }`}
                >
                  {formattedNum}
                </span>
                <div className="truncate">
                  <div
                    className={`text-sm font-bold truncate ${
                      isSelected
                        ? "text-slate-900"
                        : "text-slate-700 group-hover:text-slate-900"
                    }`}
                  >
                    {item.title}
                  </div>
                  {item.category && (
                    <div className="text-[11px] font-mono text-slate-600 truncate">
                      {item.category}
                    </div>
                  )}
                </div>
              </div>

              <ChevronRight
                className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                  isSelected
                    ? "text-cyan-600 translate-x-1"
                    : "text-slate-600 group-hover:translate-x-0.5"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
