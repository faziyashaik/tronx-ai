"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, ArrowUpRight, Globe, Share2, Video } from "lucide-react";

interface SettingsData {
  siteName?: string;
  description?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  footerText?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<SettingsData | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/site-settings");
        const json = await res.json();
        if (json.success && json.data) {
          setSettings(json.data);
        }
      } catch (err) {
        console.error("Failed to load footer site settings", err);
      }
    }
    fetchSettings();
  }, []);

  const phone = settings?.phone && settings.phone !== "[YOUR_PHONE_NUMBER]" ? settings.phone : "+1 (800) 555-TRONX";
  const email = settings?.email && settings.email !== "[YOUR_EMAIL_ADDRESS]" ? settings.email : "consult@tronx.ai";
  const address = settings?.address && settings.address !== "[YOUR_STREET_ADDRESS]" ? settings.address : "Innovation Way, Suite 500";
  const city = settings?.city && settings.city !== "[YOUR_CITY]" ? settings.city : "Tech District";
  const whatsapp = settings?.whatsapp && settings.whatsapp !== "[YOUR_WHATSAPP_NUMBER]" ? settings.whatsapp : "+18005558766";
  const footerText = settings?.footerText || "© 2026 TRONX AI Smart Consultancy. All rights reserved.";

  return (
    <footer className="relative bg-vfx-light-alt border-t border-slate-200/80 pt-16 pb-12 overflow-hidden text-slate-600">
      {/* Background Orbs */}
      <div className="glow-cyan-light-orb bottom-0 left-1/4" />
      <div className="glow-violet-light-orb top-0 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                TRONX <span className="text-vfx-cyan-light">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              {settings?.description ||
                "Transforming modern businesses with AI-powered automation, 360° virtual tours, 4K FPV drone cinematography, and high-performance web applications."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-cyan-50 text-slate-600 hover:text-cyan-700 transition-all shadow-sm"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {settings?.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-violet-50 text-slate-600 hover:text-violet-700 transition-all shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-rose-50 text-slate-600 hover:text-rose-700 transition-all shadow-sm"
                >
                  <Video className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link href="/" className="hover:text-cyan-700 transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-cyan-700 transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-cyan-700 transition-colors">About Us</Link></li>
              <li><Link href="/process" className="hover:text-cyan-700 transition-colors">Our Process</Link></li>
              <li><Link href="/portfolio" className="hover:text-cyan-700 transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-700 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase">Services</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link href="/services" className="hover:text-cyan-700 transition-colors">AI Automation</Link></li>
              <li><Link href="/services" className="hover:text-cyan-700 transition-colors">GMB Setup</Link></li>
              <li><Link href="/services" className="hover:text-cyan-700 transition-colors">Google 360° Tour</Link></li>
              <li><Link href="/services" className="hover:text-cyan-700 transition-colors">FPV Drone Shoots</Link></li>
              <li><Link href="/services" className="hover:text-cyan-700 transition-colors">NFC Solutions</Link></li>
              <li><Link href="/services" className="hover:text-cyan-700 transition-colors">Website Development</Link></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase">Direct Contact</h4>
            <div className="space-y-3 text-sm font-medium">
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-cyan-700 transition-colors">
                <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-cyan-700 transition-colors">
                <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{email}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-1" />
                <span>{address}, {city}</span>
              </div>
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-300 text-emerald-700 text-xs font-bold hover:bg-emerald-500/20 transition-all mt-1"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-semibold">
          <p>{footerText}</p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-slate-900 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
