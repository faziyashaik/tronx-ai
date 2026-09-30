"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles, Video, ArrowRight, Radio } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface FpvSectionData {
  title?: string;
  description?: string;
  video?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function FPVSection({ data }: { data?: FpvSectionData }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const title = data?.title || "Cinematic FPV Drone Experiences";
  const description =
    data?.description ||
    "Fly through your facilities with smooth, high-octane 4K FPV drone footage designed for high-conversion social media reels and interactive web showcases.";
  const ctaText = data?.ctaText || "Book FPV Shoot";
  const ctaLink = data?.ctaLink || "/book-consultation";
  const videoUrl = data?.video || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

  return (
    <section className="relative py-24 bg-vfx-light-alt overflow-hidden border-y border-slate-200/80">
      {/* Background Volumetric Fog */}
      <div className="glow-cyan-light-orb top-1/2 left-1/4 -translate-y-1/2" />
      <div className="glow-violet-light-orb top-1/2 right-1/4 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-800 text-xs font-bold uppercase tracking-wider">
              <Video className="w-3.5 h-3.5 text-cyan-600" />
              <span>Cinematic FPV Production</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 shadow-xl shadow-cyan-500/20 transition-all light-sweep-white group"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Video Showcase Card with HUD Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/90 bg-white shadow-2xl group-hover:border-cyan-400/60 transition-all duration-500">
              
              {/* Poster Image */}
              <div className="relative h-[340px] sm:h-[440px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80"
                  alt="FPV Drone Showreel"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* FPV HUD Scanning Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2 bg-slate-950/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-[11px] font-mono text-emerald-400">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                    <span>REC ● TRONX FPV 4K</span>
                  </div>
                  <div className="bg-slate-950/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-[11px] font-mono text-cyan-300">
                    FPS: 60 · 4K HDR
                  </div>
                </div>

                {/* Reticle Corner Crosshairs */}
                <div className="absolute top-12 left-8 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute top-12 right-8 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-16 left-8 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-16 right-8 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[2px] shadow-2xl shadow-cyan-500/50 group-hover:scale-110 transition-transform duration-300 focus:outline-none"
                    aria-label="Play Showreel"
                  >
                    <div className="w-full h-full bg-white/90 rounded-full flex items-center justify-center text-cyan-700">
                      <Play className="w-8 h-8 fill-cyan-600 translate-x-0.5" />
                    </div>
                    <span className="absolute -inset-3 rounded-full border border-cyan-400/60 animate-ping pointer-events-none" />
                  </button>
                </div>

                {/* Bottom HUD Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-semibold text-white">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Indoor & Outdoor FPV Flythrough Systems</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:text-cyan-400 border border-white/20 transition-colors"
                aria-label="Close Video"
              >
                <X className="w-6 h-6" />
              </button>

              <iframe
                src={videoUrl}
                title="FPV Showreel"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
