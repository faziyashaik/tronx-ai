import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import Portfolio from "@/lib/models/Portfolio";
import Homepage from "@/lib/models/Homepage";
import SiteSettings from "@/lib/models/SiteSettings";

const servicesData = [
  {
    title: "Google Business Profile (GMB) Setup",
    slug: "google-business-profile-gmb-setup",
    shortDescription:
      "Optimize your Google Business Profile for local SEO, customer engagement, and higher search rankings.",
    description:
      "Comprehensive setup and optimization of your Google Business Profile to boost local visibility, manage products & services, post updates, and track performance with analytics.",
    features: [
      "Business Setup",
      "Verification Support",
      "SEO Optimization",
      "Products & Services",
      "Photos & Posts",
      "Analytics",
    ],
    published: true,
    order: 1,
  },
  {
    title: "Google Virtual 360° Tour",
    slug: "google-virtual-360-tour",
    shortDescription:
      "Immersive 360° virtual tours published directly to Google Maps and Search.",
    description:
      "High-resolution 360° virtual tours for indoor and outdoor spaces with seamless Google Maps integration and interactive navigation.",
    features: [
      "Indoor Tour",
      "Outdoor Tour",
      "Google Maps Integration",
      "Interactive Navigation",
      "High Resolution",
    ],
    published: true,
    order: 2,
  },
  {
    title: "Online Review Management",
    slug: "online-review-management",
    shortDescription:
      "Monitor, respond to, and boost your online reviews and brand reputation.",
    description:
      "End-to-end reputation management including automated review monitoring, sentiment analysis, negative review mitigation, and monthly analytics reports.",
    features: [
      "Review Monitoring",
      "Automated Responses",
      "Negative Review Management",
      "Reputation Analytics",
      "Monthly Reports",
      "Customer Sentiment",
    ],
    published: true,
    order: 3,
  },
  {
    title: "FPV Drone Shoots",
    slug: "fpv-drone-shoots",
    shortDescription:
      "Cinematic indoor and outdoor FPV drone photography and videography.",
    description:
      "Captivating 4K cinematic FPV drone footage tailored for social reels, corporate brand films, and immersive property walkthroughs.",
    features: [
      "Indoor FPV",
      "Outdoor FPV",
      "4K Cinematic",
      "Social Reels",
      "Corporate Films",
      "Property Tours",
    ],
    published: true,
    order: 4,
  },
  {
    title: "NFC Smart Solutions",
    slug: "nfc-smart-solutions",
    shortDescription:
      "Contactless NFC business tools for instant digital sharing and engagement.",
    description:
      "Smart NFC business cards, digital menu cards, table stands, and custom QR profiles for modern contactless sharing.",
    features: [
      "NFC Business Cards",
      "NFC Menu Cards",
      "NFC Table Stands",
      "Smart QR",
      "Digital Profiles",
      "Contactless Sharing",
    ],
    published: true,
    order: 5,
  },
  {
    title: "Website Development",
    slug: "website-development",
    shortDescription:
      "Blazing fast, SEO-optimized custom web applications and business sites.",
    description:
      "Custom website development built with React, Next.js, WordPress, and Tailwind CSS engineered for peak performance and conversion.",
    features: [
      "React",
      "Next.js",
      "WordPress",
      "Tailwind CSS",
      "SEO Ready",
      "Blazing Fast",
    ],
    published: true,
    order: 6,
  },
  {
    title: "AI Automation",
    slug: "ai-automation",
    shortDescription:
      "Custom AI agents, voice bots, and automated workflows for 24/7 operations.",
    description:
      "Transform operational efficiency with custom AI chatbots, voice agents, WhatsApp bots, and automated CRM integrations operating 24/7.",
    features: [
      "Chatbots",
      "Voice Agents",
      "WhatsApp Automation",
      "CRM Automation",
      "Custom AI Agents",
      "24/7 Ops",
    ],
    published: true,
    order: 7,
  },
];

const portfolioData = [
  {
    title: "Fine Dining Restaurant",
    slug: "fine-dining-restaurant",
    category: "Hospitality",
    shortDescription:
      "Interactive 360° tour and digital NFC menus for a premium dining establishment.",
    description:
      "Enhanced dining experience with Google Virtual Tour and smart NFC table stands leading to contactless digital menus.",
    technologies: ["360 Virtual Tour", "NFC Solutions", "GMB Optimization"],
    published: true,
    order: 1,
  },
  {
    title: "Boutique Hotel Chain",
    slug: "boutique-hotel-chain",
    category: "Hotels",
    shortDescription:
      "FPV drone walkthroughs and Google Business Profile optimization.",
    description:
      "Stunning 4K FPV drone property tours and local SEO optimization driving direct hotel bookings.",
    technologies: ["FPV Drone", "GMB SEO", "Next.js"],
    published: true,
    order: 2,
  },
  {
    title: "Multi-specialty Hospital",
    slug: "multi-specialty-hospital",
    category: "Healthcare",
    shortDescription:
      "Virtual hospital navigation and automated patient inquiry chatbots.",
    description:
      "Comprehensive indoor virtual tour alongside 24/7 AI WhatsApp chatbot for appointment scheduling.",
    technologies: ["AI Automation", "Virtual Tour", "WhatsApp Bot"],
    published: true,
    order: 3,
  },
  {
    title: "International School",
    slug: "international-school",
    category: "Education",
    shortDescription:
      "Campus FPV video shoot and modern responsive website.",
    description:
      "High-speed Next.js web portal combined with immersive campus FPV drone footage for prospective admissions.",
    technologies: ["Next.js", "FPV Drone", "Tailwind CSS"],
    published: true,
    order: 4,
  },
  {
    title: "Luxury Real Estate",
    slug: "luxury-real-estate",
    category: "Real Estate",
    shortDescription:
      "Interactive property showcase with 360° virtual tours and NFC digital profiles.",
    description:
      "High-resolution virtual property walkthroughs and smart NFC cards for luxury real estate brokers.",
    technologies: ["360 Virtual Tour", "NFC Cards", "GMB Setup"],
    published: true,
    order: 5,
  },
  {
    title: "Corporate HQ Office",
    slug: "corporate-hq-office",
    category: "Corporate",
    shortDescription:
      "Enterprise website development and AI workflow automation.",
    description:
      "Custom Next.js enterprise web portal integrated with automated CRM workflows and AI voice agents.",
    technologies: ["Next.js", "AI Agents", "CRM Automation"],
    published: true,
    order: 6,
  },
];

const homepageData = {
  hero: {
    eyebrow: "AI-Powered Consultancy · Now booking Q3 2026",
    title: "Transforming Businesses with AI, Smart Technology & Digital Growth",
    description:
      "TRONX AI Smart Consultancy delivers cutting-edge AI automation, virtual 360 tours, FPV drone media, and modern web solutions to scale your business.",
    primaryCtaText: "Get Started",
    primaryCtaLink: "/#contact",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "/#services",
  },
  stats: [
    { value: "100+", label: "Projects", order: 1 },
    { value: "95%", label: "Satisfaction", order: 2 },
    { value: "24/7", label: "Support", order: 3 },
    { value: "10x", label: "Faster Delivery", order: 4 },
  ],
  about: {
    eyebrow: "About TRONX AI",
    title: "Next-Gen Technology for Modern Enterprises",
    description:
      "We combine AI automation, immersive virtual media, and high-performance software engineering to give businesses a decisive competitive edge.",
  },
  process: [
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
  ],
  whyChooseUs: [
    {
      title: "AI-First Approach",
      description: "Integrating intelligent agents and workflows directly into your business ops.",
      icon: "cpu",
      order: 1,
    },
    {
      title: "Immersive Media",
      description: "Google 360° tours and 4K FPV drone footage that captivate customers.",
      icon: "video",
      order: 2,
    },
    {
      title: "Rapid Execution",
      description: "10x faster delivery backed by modern tech stacks like Next.js & React.",
      icon: "zap",
      order: 3,
    },
  ],
  fpvSection: {
    title: "Cinematic FPV Drone Experiences",
    description:
      "Fly through your facility with smooth, immersive 4K FPV footage built for social media and web showcases.",
    ctaText: "Watch Showreel",
    ctaLink: "/#fpv",
  },
};

const siteSettingsData = {
  siteName: "TRONX AI Smart Consultancy",
  description:
    "AI-Powered Business Solutions, Virtual 360° Tours, FPV Drone Shoots & Next.js Web Development",
  phone: "[YOUR_PHONE_NUMBER]",
  email: "[YOUR_EMAIL_ADDRESS]",
  whatsapp: "[YOUR_WHATSAPP_NUMBER]",
  address: "[YOUR_STREET_ADDRESS]",
  city: "[YOUR_CITY]",
  instagram: "[YOUR_INSTAGRAM_URL]",
  linkedin: "[YOUR_LINKEDIN_URL]",
  youtube: "[YOUR_YOUTUBE_URL]",
  logo: "/logo.png",
  footerText: "© 2026 TRONX AI Smart Consultancy. All rights reserved.",
};

async function seedDatabase() {
  console.log("🌱 Starting database seeding process...");

  try {
    await connectDB();
    console.log("✅ Database connection established.");

    // 1. Seed Services
    let servicesInserted = 0;
    let servicesUpdated = 0;
    for (const service of servicesData) {
      const existing = await Service.findOne({ slug: service.slug });
      if (existing) {
        await Service.updateOne({ slug: service.slug }, { $set: service });
        servicesUpdated++;
      } else {
        await Service.create(service);
        servicesInserted++;
      }
    }

    // 2. Seed Portfolio Items
    let portfolioInserted = 0;
    let portfolioUpdated = 0;
    for (const portfolio of portfolioData) {
      const existing = await Portfolio.findOne({ slug: portfolio.slug });
      if (existing) {
        await Portfolio.updateOne({ slug: portfolio.slug }, { $set: portfolio });
        portfolioUpdated++;
      } else {
        await Portfolio.create(portfolio);
        portfolioInserted++;
      }
    }

    // 3. Seed Homepage Singleton
    let homepageAction = "updated";
    const existingHomepage = await Homepage.findOne();
    if (existingHomepage) {
      await Homepage.updateOne({ _id: existingHomepage._id }, { $set: homepageData });
    } else {
      await Homepage.create(homepageData);
      homepageAction = "created";
    }

    // 4. Seed SiteSettings Singleton
    let siteSettingsAction = "updated";
    const existingSiteSettings = await SiteSettings.findOne();
    if (existingSiteSettings) {
      await SiteSettings.updateOne(
        { _id: existingSiteSettings._id },
        { $set: siteSettingsData }
      );
    } else {
      await SiteSettings.create(siteSettingsData);
      siteSettingsAction = "created";
    }

    // Print Console Summary
    console.log("\n==========================================");
    console.log("🎉 Database Seeding Summary");
    console.log("==========================================");
    console.log(
      `🔹 Services     : ${servicesInserted} inserted, ${servicesUpdated} updated`
    );
    console.log(
      `🔹 Portfolio    : ${portfolioInserted} inserted, ${portfolioUpdated} updated`
    );
    console.log(`🔹 Homepage     : Singleton document ${homepageAction}`);
    console.log(`🔹 SiteSettings : Singleton document ${siteSettingsAction}`);
    console.log("==========================================\n");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
  }
}

seedDatabase();
