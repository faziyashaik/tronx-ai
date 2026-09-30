import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Sparkles, Calendar, Clock, CheckCircle } from "lucide-react";

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen bg-vfx-light bg-vfx-grid-light text-slate-900 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Priority Consultation · Q3 2026</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Book Your Strategic Discovery Session
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Reserve a 30-minute deep-dive consultation with our senior solution architects to plan your AI automation and digital media strategy.
          </p>
        </div>
      </section>

      {/* Main Form Container */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl vfx-glass-light p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-600" />
                <span>What to Expect</span>
              </h3>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-cyan-600 mt-1 shrink-0" />
                  <span>Comprehensive analysis of your existing tech stack and search presence.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-cyan-600 mt-1 shrink-0" />
                  <span>Custom AI automation and FPV/360° media architecture recommendation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-cyan-600 mt-1 shrink-0" />
                  <span>Transparent timeline, sprint roadmap, and fixed investment quote.</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3 text-xs text-slate-500 font-medium">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Duration: 30 Minutes · No obligation</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
