"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Camera,
  Star,
  Video,
  CreditCard,
  Code,
  Bot,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import ServiceVFXCanvas from "@/components/vfx/ServiceVFXCanvas";

export interface ServiceData {
  _id?: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  features?: string[];
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  published?: boolean;
  order?: number;
}

const getServiceIcon = (title: string, slug: string) => {
  const key = `${title} ${slug}`.toLowerCase();
  if (key.includes("gmb") || key.includes("profile") || key.includes("google business")) return MapPin;
  if (key.includes("360") || key.includes("virtual") || key.includes("tour")) return Camera;
  if (key.includes("review") || key.includes("reputation")) return Star;
  if (key.includes("drone") || key.includes("fpv") || key.includes("shoot")) return Video;
  if (key.includes("nfc") || key.includes("card") || key.includes("smart")) return CreditCard;
  if (key.includes("web") || key.includes("site") || key.includes("development")) return Code;
  if (key.includes("ai") || key.includes("automation") || key.includes("bot")) return Bot;
  return Sparkles;
};

export default function ServiceCard({
  service,
  index = 0,
}: {
  service: ServiceData;
  index?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const Icon = getServiceIcon(service.title, service.slug);
  const formattedIndex = String(index + 1).padStart(2, "0");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotate({
      x: -y * 0.06,
      y: x * 0.06,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative rounded-3xl bg-white/85 border border-slate-200/80 p-7 sm:p-8 flex flex-col justify-between hover:bg-white hover:border-cyan-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
    >
      {/* Soft Ambient Light Gradient on Hover */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-400/15 via-violet-500/15 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

      <div>
        {/* Header Icon & Step Number */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-500/10 group-hover:border-cyan-300 group-hover:scale-105 transition-all duration-300">
            <Icon className="w-6 h-6 transition-transform group-hover:rotate-6" />
          </div>
          <span className="text-2xl font-mono font-black text-slate-300 group-hover:text-cyan-600 transition-colors">
            {formattedIndex}
          </span>
        </div>

        {/* Dynamic 3D Service Visual Canvas */}
        <div className="mb-5 overflow-hidden rounded-2xl">
          <ServiceVFXCanvas slug={service.slug} isHovered={isHovered} />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal line-clamp-3">
          {service.shortDescription || service.description}
        </p>

        {/* Features Checklist */}
        {service.features && service.features.length > 0 && (
          <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-700 font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="pt-2 border-t border-slate-100">
        <Link
          href={service.ctaLink || `/services#${service.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 group-hover:text-cyan-700 transition-colors"
        >
          <span>{service.ctaText || "Explore Solution"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-cyan-600" />
        </Link>
      </div>
    </motion.div>
  );
}
