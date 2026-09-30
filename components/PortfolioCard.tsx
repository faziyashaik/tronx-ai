"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers } from "lucide-react";

export interface PortfolioData {
  _id?: string;
  title: string;
  slug: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  ctaText?: string;
  ctaLink?: string;
  published?: boolean;
  order?: number;
}

export default function PortfolioCard({
  item,
  index = 0,
}: {
  item: PortfolioData;
  index?: number;
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const defaultImage =
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotate({
      x: -y * 0.06,
      y: x * 0.06,
    });

    setParallax({
      x: x * 0.12,
      y: y * 0.12,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setParallax({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative rounded-3xl vfx-glass-light overflow-hidden vfx-glass-light-hover flex flex-col justify-between shadow-xl border border-white/80"
    >
      {/* Image Banner with Parallax Depth Offset */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <div
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0px) scale(1.05)`,
          }}
        >
          <Image
            src={item.image || defaultImage}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge */}
        {item.category && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white text-xs font-bold text-cyan-900 shadow-md">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>{item.category}</span>
          </div>
        )}
      </div>

      {/* Floating Glass Plate Content with Faster Layer Shift */}
      <div
        className="p-6 sm:p-7 flex-1 flex flex-col justify-between transition-transform duration-200 ease-out relative z-10"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 15px)`,
        }}
      >
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed font-normal">
            {item.shortDescription || item.description}
          </p>

          {/* Tech Badges */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {item.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 text-[11px] font-mono text-slate-700 font-semibold shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
          <Link
            href={`/portfolio/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-900 group-hover:text-cyan-700 transition-colors"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-cyan-600" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
