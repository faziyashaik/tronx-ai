import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroAnimation from "@/components/HeroAnimation";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard, { ServiceData } from "@/components/ServiceCard";
import PortfolioCard, { PortfolioData } from "@/components/PortfolioCard";
import CaseStudies from "@/components/case-studies/CaseStudies";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialSlider, { TestimonialData } from "@/components/TestimonialSlider";
import FAQAccordion, { FAQData } from "@/components/FAQAccordion";
import FPVSection from "@/components/FPVSection";
import ContactForm from "@/components/ContactForm";
import AnimatedStatItem from "@/components/AnimatedStatItem";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Zap, Video, Phone, Mail, MapPin } from "lucide-react";

async function getHomepageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/homepage`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

async function getServicesData(): Promise<ServiceData[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/services`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

async function getPortfolioData(): Promise<PortfolioData[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/portfolio`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

async function getTestimonialsData(): Promise<TestimonialData[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/testimonials`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

async function getFAQData(): Promise<FAQData[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/faq`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [homepage, services, portfolio, testimonials, faqs] = await Promise.all([
    getHomepageData(),
    getServicesData(),
    getPortfolioData(),
    getTestimonialsData(),
    getFAQData(),
  ]);

  const hero = homepage?.hero || {
    eyebrow: "AI-POWERED CONSULTANCY · NOW BOOKING Q3 2026",
    title: "Transforming Businesses with AI, Smart Technology & Digital Growth",
    description: "TRONX AI Smart Consultancy delivers cutting-edge AI automation, virtual 360 tours, FPV drone media, and modern web solutions to scale your business.",
    primaryCtaText: "Book a Consultation",
    primaryCtaLink: "/book-consultation",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "/services",
  };

  const stats = homepage?.stats && homepage.stats.length > 0
    ? homepage.stats
    : [
        { value: "100+", label: "Projects Delivered" },
        { value: "95%", label: "Satisfaction SLA" },
        { value: "24/7", label: "Autonomous Support" },
        { value: "10x", label: "Velocity Advantage" },
      ];

  const about = homepage?.about || {
    eyebrow: "Who We Are",
    title: "Next-Gen Technology for Modern Enterprises",
    description: "We combine enterprise AI automation, immersive virtual media, and high-performance software engineering to give forward-thinking companies a decisive competitive edge.",
  };

  const whyChooseUs = homepage?.whyChooseUs && homepage.whyChooseUs.length > 0
    ? homepage.whyChooseUs
    : [
        { title: "AI-First Architecture", description: "Deploy custom 24/7 intelligent agents, voice bots, and automated CRM workflows.", icon: "cpu" },
        { title: "Immersive 3D & FPV Media", description: "Captivate clients with certified Google Virtual Tours & 4K FPV drone walkthroughs.", icon: "video" },
        { title: "10x Engineering Velocity", description: "Blazing fast Next.js web applications engineered for total market dominance.", icon: "zap" },
      ];

  return (
    <div className="min-h-screen bg-vfx-light bg-vfx-grid-light text-slate-900 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Layered Light VFX Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Layer 1-4 Atmospheric Light Glow Orbs */}
        <div className="glow-cyan-light-orb top-10 left-10" />
        <div className="glow-violet-light-orb top-20 right-10" />
        <div className="glow-magenta-light-orb bottom-10 left-1/3" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-violet-600/10 to-pink-500/10 border border-cyan-300/50 backdrop-blur-xl shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-800 uppercase">
                {hero.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-900">
              Transforming Businesses with{" "}
              <span className="text-vfx-cyan-light">AI</span>,{" "}
              <span className="text-vfx-violet-light">Smart Technology</span> &{" "}
              <span className="text-vfx-gold-light">Digital Growth</span>
            </h1>

            {/* Subtitle Description */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={hero.primaryCtaLink || "/book-consultation"}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 light-sweep group"
              >
                <span>{hero.primaryCtaText || "Book a Consultation"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-white" />
              </Link>

              <Link
                href={hero.secondaryCtaLink || "/services"}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white/80 hover:bg-white border border-slate-200 shadow-sm transition-all hover:border-slate-300"
              >
                <span>{hero.secondaryCtaText || "Explore Services"}</span>
              </Link>
            </div>

            {/* Badges */}
            <div className="pt-8 flex flex-wrap items-center gap-6 text-xs font-bold text-slate-600 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Enterprise Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-violet-600" />
                <span>Autonomous AI Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>10x Execution Speed</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic AI Neural Core */}
          <div className="lg:col-span-5 relative">
            <HeroAnimation />
          </div>

        </div>
      </section>

      {/* Cinematic Stats Strip */}
      <section className="relative py-14 border-y border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat: { value?: string; label?: string }, idx: number) => (
              <AnimatedStatItem key={idx} rawVal={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Who We Are / About */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-cyan-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>{about.eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {about.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {about.description}
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 hover:text-cyan-800 transition-colors"
                >
                  <span>Read Full Executive Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl vfx-glass-light p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-200 flex items-center justify-center text-cyan-600">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Autonomous Intelligence</h3>
                    <p className="text-xs text-slate-500">Replacing manual bottlenecks with smart bots</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-200 flex items-center justify-center text-violet-600">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Immersive Virtual Media</h3>
                    <p className="text-xs text-slate-500">Google 360° Tours & Cinematic FPV Shoots</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">High-Speed Next.js Core</h3>
                    <p className="text-xs text-slate-500">Blazing performance & search optimization</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative bg-slate-50/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Core Capabilities"
            title="7 Enterprise Services Engineered for Growth"
            description="From Google Business Profile optimization to custom AI voice agents, explore our full suite of technical consultancy services."
          />

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={service._id || idx} service={service} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No services found in database.
            </div>
          )}
        </div>
      </section>

      {/* FPV Reel Showcase */}
      <FPVSection data={homepage?.fpvSection} />

      {/* Why Choose Us */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose TRONX AI"
            title="Built for Speed, Scale & Unmatched Distinction"
            description="We eliminate legacy agency bloat to deliver high-impact digital transformation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item: { title: string; description: string; icon?: string }, idx: number) => (
              <div
                key={idx}
                className="rounded-3xl vfx-glass-light p-8 space-y-4 vfx-glass-hover"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-200 flex items-center justify-center text-cyan-600">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 relative bg-slate-50/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Proven Methodology"
            title="5 Steps from Strategy to Deployment"
            description="Our structured consultancy framework ensures transparent communication, rapid iteration, and flawless go-live execution."
          />
          <ProcessTimeline steps={homepage?.process} />
        </div>
      </section>

      {/* ThreeUI Inspired Interactive Case Studies Section */}
      <CaseStudies initialData={portfolio} />

      {/* Testimonials Section */}
      <section className="py-24 relative bg-slate-50/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by Industry Leaders"
            description="Read what executives and business owners say about partnering with TRONX AI."
          />
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Everything You Need to Know"
            description="Got questions about our services, timelines, or technology integration? Find quick answers below."
          />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Contact / Lead Section */}
      <section id="contact" className="py-24 relative bg-slate-50/80 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-cyan-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Ready to Scale Your Business with AI?
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Book a consultation with our technology team. We will analyze your current digital presence and deliver a custom transformation plan.
              </p>

              <div className="space-y-4 pt-4 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-cyan-600 shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Direct Phone</div>
                    <div className="font-bold text-slate-900">+1 (800) 555-TRONX</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-cyan-600 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Email Inquiry</div>
                    <div className="font-bold text-slate-900">consult@tronx.ai</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-cyan-600 shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Headquarters</div>
                    <div className="font-bold text-slate-900">Innovation Way, Suite 500 · Tech District</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
