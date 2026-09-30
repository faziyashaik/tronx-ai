"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PortfolioData } from "@/components/PortfolioCard";
import CaseStudyVFX from "./CaseStudyVFX";
import CaseStudyTransition from "./CaseStudyTransition";
import CaseStudyMedia from "./CaseStudyMedia";
import CaseStudyDetails from "./CaseStudyDetails";
import CaseStudyNavigation from "./CaseStudyNavigation";

interface CaseStudyStageProps {
  items: PortfolioData[];
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function CaseStudyStage({
  items,
  categories,
  selectedCategory,
  onSelectCategory,
}: CaseStudyStageProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const targetPointer = useRef({ x: 0, y: 0 });
  const currentPointer = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleChange = () => setReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Clamp index if filtered items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [selectedCategory]);

  // Handle pointer tracking & lerp
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetPointer.current = { x, y };
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    targetPointer.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const loop = () => {
      currentPointer.current.x +=
        (targetPointer.current.x - currentPointer.current.x) * 0.08;
      currentPointer.current.y +=
        (targetPointer.current.y - currentPointer.current.y) * 0.08;

      setPointer({
        x: currentPointer.current.x,
        y: currentPointer.current.y,
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion]);

  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500 rounded-3xl bg-white/60 border border-slate-200">
        <p className="text-lg font-medium">No case studies available.</p>
      </div>
    );
  }

  const activeItem = items[selectedIndex] || items[0];

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-3xl vfx-glass-light p-6 sm:p-8 lg:p-12 overflow-hidden border border-white/80 shadow-2xl"
    >
      {/* Background Ambient VFX */}
      <CaseStudyVFX />

      {/* Main Responsive Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column: Case Study Navigation Selector */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <CaseStudyNavigation
            items={items}
            selectedIndex={selectedIndex}
            onSelect={(idx) => setSelectedIndex(idx)}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>

        {/* Right Stage: Interactive Selected Case Study Visual + Editorial Details */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-8 flex flex-col justify-between">
          <CaseStudyTransition itemKey={activeItem._id || activeItem.slug || selectedIndex}>
            <div className="space-y-8">
              {/* Media Player Showcase */}
              <CaseStudyMedia
                image={activeItem.image}
                title={activeItem.title}
                category={activeItem.category}
                pointer={pointer}
                reducedMotion={reducedMotion}
              />

              {/* Editorial Content details */}
              <CaseStudyDetails item={activeItem} index={selectedIndex} />
            </div>
          </CaseStudyTransition>
        </div>

      </div>
    </div>
  );
}
