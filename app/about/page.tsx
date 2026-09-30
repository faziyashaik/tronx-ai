import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, ShieldCheck, Cpu, Zap, ArrowRight, Award, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-vfx-light bg-vfx-grid-light text-slate-900 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>About TRONX AI</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Pioneering Intelligent Business Transformation
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            TRONX AI is an elite technology consultancy bridging autonomous AI software engineering with immersive 3D/FPV visual media.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="rounded-3xl vfx-glass-light p-8 space-y-4 vfx-glass-hover">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower modern enterprises with high-performance AI agents, immersive media, and robust software architectures that drive measurable business growth.
            </p>
          </div>

          <div className="rounded-3xl vfx-glass-light p-8 space-y-4 vfx-glass-hover">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Standards</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We hold every deliverable to strict enterprise standards: zero bloat, blazing fast execution, 99.9% uptime, and total data privacy compliance.
            </p>
          </div>

          <div className="rounded-3xl vfx-glass-light p-8 space-y-4 vfx-glass-hover">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-200 flex items-center justify-center text-sky-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Client-Centric Philosophy</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We partner deeply with business leaders, providing end-to-end guidance from initial discovery sessions to long-term autonomous operations.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-slate-200/80">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          Ready to Collaborate with TRONX AI?
        </h2>
        <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto">
          Let us help you design and deploy your next AI automation or digital showcase project.
        </p>
        <Link
          href="/book-consultation"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 shadow-xl shadow-cyan-500/25 transition-all"
        >
          <span>Book a Consultation</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
