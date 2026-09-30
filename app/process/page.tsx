import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProcessTimeline from "@/components/ProcessTimeline";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-vfx-light bg-vfx-grid-light text-slate-900 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Proven Methodology</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Our 5-Step Delivery Framework
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From initial strategy discovery to ongoing growth support, discover how we ensure total precision and speed at every stage.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ProcessTimeline />
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-slate-200/80">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          Start Phase 01 Today
        </h2>
        <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto">
          Book your initial consultation to begin your custom project roadmap.
        </p>
        <Link
          href="/book-consultation"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 shadow-xl shadow-cyan-500/25 transition-all"
        >
          <span>Book Consultation</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
