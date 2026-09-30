import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { Sparkles, Phone, Mail, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-vfx-light bg-vfx-grid-light text-slate-900 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Connect with TRONX AI</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Let&apos;s Build Your Next Technical Edge
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our team of senior solution architects, AI developers, and media specialists are ready to discuss your custom project.
          </p>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Contact Information
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Reach out directly via email, phone, or WhatsApp to connect with our strategic technical team.
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-700">
              <div className="flex items-start gap-4 p-4 rounded-2xl vfx-glass-light">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Call Us</h4>
                  <a href="tel:+18005558766" className="text-base font-bold text-slate-900 hover:text-cyan-600 transition-colors">
                    +1 (800) 555-TRONX
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Mon–Fri, 9am–6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl vfx-glass-light">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Inquiry</h4>
                  <a href="mailto:consult@tronx.ai" className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                    consult@tronx.ai
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">24h response time SLA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl vfx-glass-light">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">WhatsApp Instant</h4>
                  <a href="https://wa.me/18005558766" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-emerald-600 hover:underline">
                    Chat on WhatsApp
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Instant technical response</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl vfx-glass-light">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Headquarters</h4>
                  <div className="text-sm font-bold text-slate-900">Innovation Way, Suite 500</div>
                  <div className="text-xs text-slate-500">Tech District, USA</div>
                </div>
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
