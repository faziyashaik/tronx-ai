"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export interface ProcessStep {
  number?: string;
  title: string;
  description: string;
  order?: number;
}

const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    description: "In-depth discovery session to understand your goals and tech requirements.",
    order: 1,
  },
  {
    number: "02",
    title: "Planning",
    description: "Designing a tailored strategy, architecture, and deployment roadmap.",
    order: 2,
  },
  {
    number: "03",
    title: "Development",
    description: "Building, integrating AI models, and capturing high-end media assets.",
    order: 3,
  },
  {
    number: "04",
    title: "Launch",
    description: "Seamless deployment, testing, and go-live optimization.",
    order: 4,
  },
  {
    number: "05",
    title: "Growth Support",
    description: "Ongoing maintenance, analytics monitoring, and scaling support.",
    order: 5,
  },
];

export default function ProcessTimeline({ steps }: { steps?: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const displaySteps = steps && steps.length > 0 ? steps : defaultSteps;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Scroll-Bound Glowing 3D Vector Path Line (Desktop horizontal / Tablet path) */}
      <div className="absolute top-1/2 left-8 right-8 hidden lg:block -translate-y-1/2 pointer-events-none z-0">
        <svg className="w-full h-20 overflow-visible">
          <defs>
            <linearGradient id="tronxPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Background Guide Line */}
          <path
            d="M 20 40 Q 250 10, 500 40 T 980 40"
            fill="none"
            stroke="rgba(203, 213, 225, 0.4)"
            strokeWidth="3"
          />

          {/* Animated Scroll-Bound Vector Path */}
          <motion.path
            d="M 20 40 Q 250 10, 500 40 T 980 40"
            fill="none"
            stroke="url(#tronxPathGrad)"
            strokeWidth="4"
            filter="url(#pathGlow)"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Grid of Steps 01 to 05 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {displaySteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="group relative rounded-3xl vfx-glass-light p-6 flex flex-col justify-between vfx-glass-light-hover border border-white/80 shadow-md"
          >
            <div>
              {/* Step Index Badge with Scale & Glow */}
              <div className="flex items-center justify-between mb-6">
                <motion.span
                  whileHover={{ scale: 1.15 }}
                  className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 font-mono"
                >
                  {step.number || `0${index + 1}`}
                </motion.span>
                {index < displaySteps.length - 1 && (
                  <ArrowRight className="hidden lg:block w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1.5 transition-all" />
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>

            {/* Footer Phase Badge */}
            <div className="mt-6 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-cyan-700">
              <Sparkles className="w-3 h-3 text-cyan-600" />
              <span>Phase {index + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
