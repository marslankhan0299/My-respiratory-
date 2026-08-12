import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Globe,
  Ghost,
  Facebook,
  Instagram,
  FileText,
  MessageCircle,
  Clock,
  ArrowUpRight,
  User,
  Crown,
  Heart,
  Terminal,
  Cpu,
  Layers,
  Flame,
  Code,
  X,
  Sun,
  Moon
} from "lucide-react";
import { USER_INFO } from "./galleryData";
import { AIAssistant } from "./components/AIAssistant";
import { GalleryMosaic } from "./components/GalleryMosaic";
import { GuestbookBoard } from "./components/GuestbookBoard";
import { SkillsRadar } from "./components/SkillsRadar";
import { LocalZone } from "./components/LocalZone";
import { VibeVisualizer } from "./components/VibeVisualizer";
import { TiltCell } from "./components/TiltCell";
import { EcommerceSections } from "./components/EcommerceSections";
import { DeploymentVelocityChart } from "./components/DeploymentVelocityChart";
import { AIDeveloperProfile } from "./components/AIDeveloperProfile";
import { SecurityEnforcer } from "./components/SecurityEnforcer";
import { SectionGlowDivider } from "./components/SectionGlowDivider";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaSnapchat, FaEnvelope, FaReact, FaNodeJs, FaJs } from 'react-icons/fa6';
import { FaShopify, FaAmazon } from 'react-icons/fa';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 350, damping: 25 } },
};

export default function App() {
  const [theme, setTheme] = useState<"light" | "midnight">("light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "midnight") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isBentoLoading, setIsBentoLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBentoLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
      setScrolledPastHero(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeTab, setActiveTab] = useState<"visuals" | "studio" | "guestbook" | "consult">("visuals");
  const [activeOverlay, setActiveOverlay] = useState<string>("clean");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Client side commission form state
  const [proposal, setProposal] = useState({
    name: "",
    scopetype: "Cinematic Video Package",
    brief: "",
    urgency: "Standard Delivery"
  });

  // Growth Insights newsletter state
  const [subscribingEmail, setSubscribingEmail] = useState("");
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("growth-insights-emails");
      return stored ? JSON.parse(stored) : ["hassaan_growth@storeoperator.com", "arslan_growth@mentor.com"];
    } catch {
      return ["hassaan_growth@storeoperator.com", "arslan_growth@mentor.com"];
    }
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const email = subscribingEmail.trim();
    if (!email) {
      setSubscriptionStatus("error");
      setSubscriptionMessage("Please enter an email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus("error");
      setSubscriptionMessage("Please enter a valid e-mail format.");
      return;
    }
    if (subscribedEmails.includes(email)) {
      setSubscriptionStatus("error");
      setSubscriptionMessage("This email is already in the Growth tips loop!");
      return;
    }

    setSubscriptionStatus("loading");
    setTimeout(() => {
      const updated = [...subscribedEmails, email];
      setSubscribedEmails(updated);
      localStorage.setItem("growth-insights-emails", JSON.stringify(updated));
      setSubscribingEmail("");
      setSubscriptionStatus("success");
      setSubscriptionMessage("Double opt-in saved successfully! Welcome aboard! 🚀");
    }, 850);
  };

  const renderModalContent = () => {
    switch(activeModal) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-extrabold text-[#121214] dark:text-white">Master Profile</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Arslan Arshad is a motivated young professional with experience in Social Media Management, Graphic Design, Sales, and Data Entry based in Islamabad, PAKISTAN. 
              With a profound commitment to engaging digital content and customer interactions, he seamlessly 
              supports business growth through effective communication and marketing strategies.
            </p>
            <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-xl border border-neutral-200/60 dark:border-white/5 mt-4">
              <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Core Philosophy</h4>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 italic">"{USER_INFO.quote}"</p>
            </div>
            <div className="flex gap-2 pt-4">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 font-bold font-mono text-[10px] uppercase rounded-full tracking-wider">Available for Hire</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-bold font-mono text-[10px] uppercase rounded-full tracking-wider">Pakistan</span>
            </div>
          </div>
        );
      case 'stack':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-extrabold text-[#121214] dark:text-white">Tech Stack & Expertise</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              A comprehensive toolkit utilized to craft high-performance applications and cinematic experiences.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {USER_INFO.skills.map((sk) => (
                <div key={sk.name} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/5 rounded-xl">
                  <span className="text-xs font-bold text-neutral-800 dark:text-zinc-200">{sk.name}</span>
                  <span className="text-[10px] font-mono font-extrabold text-[#121214] dark:text-[#121214] bg-[#c5f547] px-2 py-0.5 rounded-full">{sk.level}%</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-extrabold text-[#121214] dark:text-white">Live Projects Hub</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Track record of successful deployments, satisfied clients, and high-impact digital products.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-3xl font-display font-extrabold text-[#121214] dark:text-white">12+</span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-bold mt-1">Global Clients</span>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-3xl font-display font-extrabold text-[#121214] dark:text-white">50+</span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-bold mt-1">Video Edits</span>
              </div>
              <div className="p-4 bg-[#c5f547]/20 border border-[#121214]/10 dark:border-[#c5f547]/15 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-3xl font-display font-extrabold text-[#121214] dark:text-[#c5f547]">4.9</span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-700 dark:text-neutral-300 font-bold mt-1">Avg Rating</span>
              </div>
            </div>
            <a href={USER_INFO.websites.portfolio} target="_blank" rel="noopener noreferrer" className="block w-full py-3 mt-4 bg-[#121214] dark:bg-[#c5f547] text-[#c5f547] dark:text-[#121214] text-center font-mono text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-neutral-800 dark:hover:bg-[#b0dc3d] transition-all">
              Access Full Portfolio
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposal.name.trim() || !proposal.brief.trim()) return;

    const encodedMsg = encodeURIComponent(
      `Hello Arslan! My name is ${proposal.name}. I am visiting your portfolio and want to hire you for: \n` +
      `- *Type*: ${proposal.scopetype}\n` +
      `- *Urgency*: ${proposal.urgency}\n` +
      `- *Project Brief*: ${proposal.brief}\n\n` +
      `Looking forward to collaborating with you! 🚀`
    );
    window.open(`https://wa.me/93748845221?text=${encodedMsg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#08090d] font-sans relative text-[#121214] dark:text-neutral-100 overflow-x-hidden selection:bg-[#c5f547] selection:text-[#121214] transition-colors duration-400">
      
      <SecurityEnforcer />
      
      {/* Scroll Progress Bar at the very top */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#c5f547] z-[100] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(197,245,71,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Signature Animated Glazed Blobs matching AliHx look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="accent-glow w-[350px] h-[350px] bg-[#c5f547] top-[-50px] left-[-100px] rounded-full blur-[100px] dark:opacity-10" />
        <div className="accent-glow w-[450px] h-[450px] bg-blue-400 bottom-[-150px] right-[-100px] rounded-full blur-[110px] dark:opacity-10" />
        <div className="absolute top-[60%] left-1/3 w-80 h-80 bg-gradient-to-tr from-amber-200 to-emerald-200/40 rounded-full blur-[100px] dark:opacity-5" />
      </div>

      {/* Retro Overlays (Compatible with the Custom Art Filters) */}
      {activeOverlay === "scanlines" && (
        <div 
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(18, 18, 20, 0.12) 50%), linear-gradient(90deg, rgba(197, 245, 71, 0.05), rgba(16, 185, 129, 0.02), rgba(59, 130, 246, 0.03))`,
            backgroundSize: `100% 4px, 6px 100%`
          }}
        />
      )}

      {/* Pixel dot layout overlay */}
      {activeOverlay === "pixel" && (
        <div 
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            backgroundImage: `radial-gradient(rgba(18, 18, 20, 0.06) 1.2px, transparent 1.2px)`,
            backgroundSize: `12px 12px`
          }}
        />
      )}

      {/* Film grain noise layout */}
      {activeOverlay === "grain" && (
        <div 
          className="fixed inset-0 pointer-events-none z-40 opacity-[0.25]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      )}

      {/* SEO Optimizaton Structural Block for Googlebot */}
      <h1 className="sr-only">Arslan Portfolio | Arslan Abdul Mateen - Social Media Manager & Graphic Designer</h1>
      <div className="sr-only">
        Welcome to the official portfolio of Arslan Abdul Mateen. I am a Social Media Manager and Graphic Designer based in Kabul, Afghanistan. Known professionally as Arslan, my expertise spans across content creation, digital marketing, graphic design, and customer relations. Connect with Arslan for your digital growth solutions.
      </div>

      {/* Header element aligned precisely to AliHx */}
      <header className="sticky top-0 z-50 border-b border-[#121214]/10 dark:border-white/10 bg-[#FBFAF7]/80 dark:bg-[#08090d]/80 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="grid place-items-center h-10 w-10 bg-[#121214] dark:bg-neutral-850 rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-105 duration-300">
              <img src="https://i.ibb.co/GQrYPYXm/image.png" alt="Arslan Abdul Mateen - Full-Stack Developer Profile avatar" className="w-full h-full object-cover" />
            </span>
            <div className="text-left">
              <span className="font-display font-extrabold tracking-tight text-[#121214] dark:text-white block text-sm sm:text-base leading-none">
                Arslan Portfolio
              </span>
              <span className="text-[9px] text-[#5c5c64] dark:text-neutral-400 font-mono tracking-widest uppercase block mt-0.5 font-bold">
                creative & code
              </span>
            </div>
          </div>

          {/* Hire actions and fast messengers */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "midnight" : "light")}
              className="grid place-items-center h-10 w-10 rounded-full border border-neutral-200 bg-white text-[#121214] hover:bg-[#121214] hover:text-[#c5f547] hover:border-[#121214] transition-all duration-300 shadow-sm cursor-pointer dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-white dark:hover:text-[#121214]"
              title={theme === "light" ? "Switch to Midnight Mode" : "Switch to Ambient Light"}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <a 
              href="https://www.whatsapp.com/channel/0029VbBTSK1EquiWrUt5uV1I"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all border border-white/10 border-t-white/30 ring-1 ring-black/20 bg-zinc-900/80 backdrop-blur-xl relative overflow-visible shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)]"
              title="WhatsApp Channel"
            >
              {/* @ts-ignore */}
              <FaWhatsapp 
                className="w-5 h-5 z-10" 
                style={{ color: '#25D366', filter: 'drop-shadow(0 0 8px #25D366)' }}
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-3 blur-[10px] opacity-60 rounded-full z-0 pointer-events-none" style={{ backgroundColor: '#25D366' }}></div>
            </a>
            <a
              href="#quote-consultation"
              className="group/btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight transition-all duration-305 bg-[#121214] text-white hover:bg-[#121214]/90 hover:-translate-y-0.5 hover:shadow-md hidden sm:inline-flex dark:bg-[#c5f547] dark:text-[#121214] dark:hover:bg-[#b0dc3d]"
            >
              Hire Arslan
              <span className="grid place-items-center h-6 w-6 rounded-full bg-white/10 dark:bg-black/10 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Sandbox */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-10 z-10 relative space-y-6">
        
        {/* BENTO GRID HERO EXPERIENCE - EXACT DESIGN ALIGNMENT & FULL MOBILE SENSITIVITY */}
        {isBentoLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto lg:auto-rows-[170px] relative z-10 w-full">
            {/* Cell 1: Master Profile Skeleton (Col Span 2 / Row Span 2) */}
            <div className="bg-white/90 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col justify-end min-h-[300px] md:col-span-2 lg:row-span-2 relative overflow-hidden">
              <div className="absolute inset-0 shimmer-bg opacity-70" />
              <div className="space-y-3.5 relative z-10 w-full text-left">
                <div className="h-5 bg-neutral-200/80 dark:bg-neutral-800 rounded-full w-28" />
                <div className="h-12 bg-neutral-200/80 dark:bg-neutral-800 rounded-xl w-3/4 mt-2" />
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200/80 dark:bg-neutral-800 rounded w-full" />
                  <div className="h-4 bg-neutral-200/80 dark:bg-neutral-800 rounded w-5/6" />
                </div>
              </div>
            </div>

            {/* Cell 2: Socials Connection Skeleton (Col Span 1 / Row Span 1) */}
            <div className="bg-white/90 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 rounded-[24px] p-5 flex flex-col justify-between min-h-[140px] relative overflow-hidden text-left">
              <div className="absolute inset-0 shimmer-bg opacity-70" />
              <div className="flex justify-between items-center relative z-10">
                <div className="h-3 bg-neutral-200/80 dark:bg-neutral-800 rounded w-20" />
                <div className="h-2.5 w-2.5 bg-neutral-200/80 dark:bg-neutral-800 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 relative z-10">
                <div className="h-10 bg-neutral-200/85 dark:bg-neutral-800 rounded-xl" />
                <div className="h-10 bg-neutral-200/85 dark:bg-neutral-800 rounded-xl" />
                <div className="h-10 bg-neutral-200/85 dark:bg-neutral-800 rounded-xl" />
                <div className="h-10 bg-neutral-200/85 dark:bg-neutral-800 rounded-xl" />
                <div className="h-10 bg-neutral-200/85 dark:bg-neutral-800 rounded-xl" />
                <div className="h-10 bg-neutral-200/85 dark:bg-neutral-800 rounded-xl" />
              </div>
            </div>

            {/* Cell 3: Main High-Contrast Portrait Skeleton (Col Span 1 / Row Span 2) */}
            <div className="bg-white/90 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 rounded-[24px] min-h-[220px] lg:row-span-2 relative overflow-hidden flex flex-col justify-end p-5 text-left">
              <div className="absolute inset-0 shimmer-bg opacity-70" />
              <div className="space-y-2 relative z-10">
                <div className="h-3 bg-neutral-200/80 dark:bg-neutral-800 rounded w-16" />
                <div className="h-4 bg-neutral-200/80 dark:bg-neutral-800 rounded w-24" />
              </div>
            </div>

            {/* Cell 4: Age Indicator Stats Skeleton (Col Span 1 / Row Span 1) */}
            <div className="bg-white/90 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 rounded-[24px] p-6 flex flex-col justify-center items-center gap-2 min-h-[140px] relative overflow-hidden">
              <div className="absolute inset-0 shimmer-bg opacity-70" />
              <div className="h-10 bg-neutral-200/80 dark:bg-neutral-800 rounded-lg w-16 relative z-10" />
              <div className="h-3 bg-neutral-200/80 dark:bg-neutral-800 rounded w-24 relative z-10" />
            </div>

            {/* Cell 5: Tech Stack Skeletons (Col Span 2 / Row Span 1) */}
            <div className="bg-white/90 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 rounded-[24px] p-6 flex flex-col justify-between min-h-[140px] md:col-span-2 relative overflow-hidden text-left">
              <div className="absolute inset-0 shimmer-bg opacity-70" />
              <div className="h-3 bg-neutral-200/80 dark:bg-neutral-800 rounded w-32 relative z-10" />
              <div className="flex flex-wrap gap-1.5 mt-3 relative z-10">
                <div className="h-6 bg-neutral-200/80 dark:bg-neutral-800 rounded-full w-20" />
                <div className="h-6 bg-neutral-200/80 dark:bg-neutral-800 rounded-full w-16" />
                <div className="h-6 bg-neutral-200/80 dark:bg-neutral-800 rounded-full w-24" />
                <div className="h-6 bg-neutral-200/80 dark:bg-neutral-800 rounded-full w-16" />
                <div className="h-6 bg-neutral-200/80 dark:bg-neutral-800 rounded-full w-20" />
              </div>
            </div>

            {/* Cell 6: Personal Quote Block Skeleton (Col Span 1 / Row Span 2) */}
            <div className="bg-white/90 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 rounded-[24px] p-6 flex flex-col justify-between min-h-[140px] md:min-h-auto relative overflow-hidden text-left">
              <div className="absolute inset-0 shimmer-bg opacity-70" />
              <div className="h-3 bg-neutral-200/80 dark:bg-neutral-800 rounded w-24 relative z-10" />
              <div className="space-y-2 mt-4 relative z-10">
                <div className="h-4 bg-neutral-200/80 dark:bg-neutral-800 rounded w-full" />
                <div className="h-4 bg-neutral-200/80 dark:bg-neutral-800 rounded w-full" />
                <div className="h-4 bg-neutral-200/80 dark:bg-neutral-800 rounded w-2/3" />
              </div>
              <div className="h-3 bg-neutral-200/80 dark:bg-neutral-800 rounded w-28 relative z-10 mt-4" />
            </div>

            {/* Cell 7: Portrait Block 2 Skeleton (Col Span 1 / Row Span 1) */}
            <div className="bg-white/90 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 rounded-[24px] min-h-[140px] relative overflow-hidden">
              <div className="absolute inset-0 shimmer-bg opacity-70" />
            </div>

            {/* Cell 8: Live projects indicators Skeleton (Col Span 2 / Row Span 1) */}
            <div className="bg-white/90 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 rounded-[24px] p-6 flex flex-col justify-between min-h-[140px] md:col-span-2 relative overflow-hidden text-left">
              <div className="absolute inset-0 shimmer-bg opacity-70" />
              <div className="flex justify-between items-center relative z-10">
                <div className="h-3 bg-neutral-200/80 dark:bg-neutral-800 rounded w-24" />
                <div className="h-3 bg-neutral-200/80 dark:bg-neutral-800 rounded w-36" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 relative z-10">
                <div className="h-12 bg-neutral-200/80 dark:bg-neutral-800 rounded-xl" />
                <div className="h-12 bg-neutral-200/80 dark:bg-neutral-800 rounded-xl" />
                <div className="h-12 bg-neutral-200/80 dark:bg-neutral-800 rounded-xl" />
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            variants={staggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto lg:auto-rows-[170px] relative z-10 text-[#121214]"
          >
          
          {/* Bento Cell 1: Master Profile Card (Col Span 2 / Row Span 2 on Desktop) */}
          <TiltCell onClick={() => setActiveModal('profile')} className="liquid-glass-card cursor-pointer md:col-span-2 lg:row-span-2 rounded-[24px] p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden text-left min-h-[300px]">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#121214]/10 dark:border-white/10 bg-[#c5f547]/10 px-3 py-1 font-mono text-[10px] text-[#22c55e] dark:text-[#c5f547] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-[#22c55e] dark:bg-[#c5f547] rounded-full animate-pulse" /> Verified Portfolio
              </div>
              <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-none text-[#121214] dark:text-white mt-2">
                Arslan<span className="text-[#c5f547] bg-[#121214] dark:bg-neutral-850 px-1 rounded ml-1 font-normal text-3xl sm:text-5xl">.</span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md mt-2">
                Creative Visual Artist, AI Engineer & Full-Stack Developer creating beautiful interfaces, high-fidelity color grading, and responsive systems globally.
              </p>
            </div>
          </TiltCell>

          {/* Bento Cell 2: Social Interface Grid (Col Span 1 / Row Span 1) */}
          <TiltCell className="liquid-glass-card rounded-[24px] p-4 sm:p-5 lg:p-4 xl:p-5 flex flex-col justify-between text-left min-h-[140px]">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono tracking-widest opacity-50 text-neutral-600 dark:text-neutral-400 font-bold">Socials Connect</span>
              <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full animate-ping shadow-sm" title="Active on web channels" />
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:gap-2 xl:gap-2.5 mt-3 sm:mt-4 lg:mt-3 xl:mt-4">
              <a
                href={USER_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 sm:h-12 md:h-12 lg:h-[44px] xl:h-13 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 bg-[#1877F2] text-white shadow-[inset_0_0_0_0px_#c5f547,0_0_15px_rgba(24,119,242,0.3)] hover:shadow-[inset_0_0_0_2px_#c5f547,0_0_15px_rgba(197,245,71,0.4)] hover:scale-105"
                title="Facebook Channel"
              >
                {/* @ts-expect-error react-icons type issue */}
                <FaFacebookF className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>
              <a
                href={USER_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 sm:h-12 md:h-12 lg:h-[44px] xl:h-13 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-[inset_0_0_0_0px_#c5f547,0_0_15px_rgba(230,104,60,0.3)] hover:shadow-[inset_0_0_0_2px_#c5f547,0_0_15px_rgba(197,245,71,0.4)] hover:scale-105"
                title="Instagram Media"
              >
                {/* @ts-expect-error react-icons type issue */}
                <FaInstagram className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>
              <a
                href={USER_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 sm:h-12 md:h-12 lg:h-[44px] xl:h-13 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/20 bg-black text-white shadow-[inset_0_0_0_0px_#c5f547,0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[inset_0_0_0_2px_#c5f547,0_0_15px_rgba(197,245,71,0.4)] hover:scale-105"
                title="TikTok Beats"
              >
                {/* @ts-expect-error react-icons type issue */}
                <FaTiktok className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>
              <a
                href={USER_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 sm:h-12 md:h-12 lg:h-[44px] xl:h-13 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 bg-[#25D366] text-white shadow-[inset_0_0_0_0px_#c5f547,0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[inset_0_0_0_2px_#c5f547,0_0_15px_rgba(197,245,71,0.4)] hover:scale-105"
                title="WhatsApp Direct Chat"
              >
                {/* @ts-expect-error react-icons type issue */}
                <FaWhatsapp className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>
              <a
                href={USER_INFO.socials.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 sm:h-12 md:h-12 lg:h-[44px] xl:h-13 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 bg-[#FFFC00] text-black shadow-[inset_0_0_0_0px_#c5f547,0_0_15px_rgba(255,252,0,0.3)] hover:shadow-[inset_0_0_0_2px_#c5f547,0_0_15px_rgba(197,245,71,0.4)] hover:scale-105"
                title="Snapchat Vibe"
              >
                {/* @ts-expect-error react-icons type issue */}
                <FaSnapchat className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>
              <a
                href={`mailto:${USER_INFO.email}`}
                className="w-full h-11 sm:h-12 md:h-12 lg:h-[44px] xl:h-13 rounded-xl flex items-center justify-center transition-all duration-300 border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-800 text-[#EA4335] dark:text-red-400 shadow-[inset_0_0_0_0px_#c5f547,0_0_15px_rgba(234,67,53,0.15)] hover:shadow-[inset_0_0_0_2px_#c5f547,0_0_15px_rgba(197,245,71,0.4)] hover:scale-105"
                title="Send official Mail"
              >
                {/* @ts-expect-error react-icons type issue */}
                <FaEnvelope className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>
            </div>
          </TiltCell>

          {/* Bento Cell 3: Main High-Contrast Portrait (Col Span 1 / Row Span 2) */}
          <TiltCell className="liquid-glass-card lg:row-span-2 rounded-[24px] overflow-hidden relative min-h-[220px] group">
            <img 
              src={USER_INFO.profileImages[0]} 
              className="w-full h-full object-cover object-top filter contrast-[1.04] saturate-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.05]" 
              alt="Arslan Profile"
            />
            {/* Elegant banner tag inside image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5f547] font-extrabold block">Official Profile</span>
              <p className="text-xs font-mono text-zinc-300 mt-0.5">Arslan Portfolio</p>
            </div>
          </TiltCell>

          {/* Bento Cell 4: Age Indicator Stats (Col Span 1 / Row Span 1) */}
          <TiltCell className="liquid-glass-card rounded-[24px] p-6 flex flex-col justify-center items-center gap-1 min-h-[140px] group">
            <span className="text-5xl font-extrabold font-display text-[#121214] dark:text-[#c5f547] tracking-tight leading-none group-hover:scale-105 transition-transform text-gradient">
              4+
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#5c5c64] dark:text-neutral-400 font-bold mt-1">
              Years Experience
            </span>
          </TiltCell>

          {/* Bento Cell 5: Tech Stack & Expertise Capsule (Col Span 2 / Row Span 1) */}
          <TiltCell onClick={() => setActiveModal('stack')} className="liquid-glass-card cursor-pointer md:col-span-2 rounded-[24px] p-6 text-left flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">Tech Stack & Expertise</span>
            <div className="flex flex-wrap gap-1.5 mt-4">
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/5 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 cursor-default hover:bg-[#c5f547] hover:border-[#121214] dark:hover:text-[#121214] transition-all">
                ✦ AI Developer
              </span>
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/5 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 cursor-default hover:bg-[#c5f547] hover:border-[#121214] dark:hover:text-[#121214] transition-all">
                ✦ Web Dev
              </span>
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/5 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 cursor-default hover:bg-[#c5f547] hover:border-[#121214] dark:hover:text-[#121214] transition-all">
                ✦ Video Editing
              </span>
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/5 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 cursor-default hover:bg-[#c5f547] hover:border-[#121214] dark:hover:text-[#121214] transition-all">
                ✦ Marketing
              </span>
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/5 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 cursor-default hover:bg-[#c5f547] hover:border-[#121214] dark:hover:text-[#121214] transition-all">
                ✦ Graphic Design
              </span>
            </div>
          </TiltCell>

          {/* Bento Cell 6: Personal Quote Block (Col Span 1 / Row Span 2) on Desktop */}
          <TiltCell className="liquid-glass-card rounded-[24px] p-6 flex flex-col justify-between text-left min-h-[140px] md:min-h-auto relative overflow-hidden">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#5c5c64] dark:text-neutral-400 font-extrabold">Personal Quote</span>
            <p className="text-base italic font-display font-medium leading-snug text-neutral-800 dark:text-neutral-200 mt-4">
              “{USER_INFO.quote}”
            </p>
            <span className="text-[9px] text-[#121214]/60 dark:text-[#c5f547] font-mono tracking-widest mt-4 uppercase block font-bold">
              — Arslan Portfolio Motto
            </span>
          </TiltCell>

          {/* Bento Cell 7: Portrait Block 2 (Col Span 1 / Row Span 1) */}
          <TiltCell className="liquid-glass-card rounded-[24px] overflow-hidden min-h-[140px] relative group">
            <img 
              src={USER_INFO.profileImages[1]} 
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110" 
              alt="Muhammad Arslan Profile headshot"
            />
          </TiltCell>

          {/* Bento Cell 8: Live projects indicators (Col Span 2 / Row Span 1) */}
          <TiltCell onClick={() => setActiveModal('projects')} className="liquid-glass-card cursor-pointer md:col-span-2 rounded-[24px] flex flex-col p-6 text-left justify-between min-h-[140px]">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#5c5c64] dark:text-neutral-400 font-bold">Live Projects Hub</span>
              <a 
                href="https://get-otp-eight.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-blue-600 dark:text-[#c5f547] hover:text-blue-500 underline font-mono flex items-center gap-1 cursor-pointer font-bold"
              >
                Visit fake Numbers<ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
             <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/60 dark:border-white/5 rounded-xl flex items-center justify-center flex-col shadow-sm">
                <span className="text-lg font-bold text-neutral-900 dark:text-zinc-100 leading-none">12+</span>
                <span className="text-[8px] text-neutral-500 dark:text-neutral-400 uppercase font-mono tracking-wider font-extrabold mt-1">Clients</span>
              </div>
              <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/60 dark:border-white/5 rounded-xl flex items-center justify-center flex-col shadow-sm">
                <span className="text-lg font-bold text-neutral-900 dark:text-zinc-100 leading-none">50+</span>
                <span className="text-[8px] text-neutral-500 dark:text-neutral-400 uppercase font-mono tracking-wider font-extrabold mt-1">Videos</span>
              </div>
              <div className="p-2.5 bg-[#c5f547]/25 border border-[#121214]/10 rounded-xl flex items-center justify-center flex-col shadow-sm">
                <span className="text-lg font-bold text-[#121214] dark:text-[#c5f547] leading-none">4.9</span>
                <span className="text-[8px] text-neutral-700 dark:text-neutral-400 uppercase font-mono tracking-wider font-extrabold mt-1">Rating</span>
              </div>
            </div>
          </TiltCell>

         </motion.div>
        )}

        {/* CLOCK ZONE & WEATHER BOARD */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <LocalZone />
        </motion.div>

        {/* INFINITE SCROLLING SERVICES MARQUEE - FULL-STACK FRAMEWORKS */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-y border-[#c5f547]/20 bg-[#121214] overflow-hidden py-5 sm:py-6 my-10 select-none shadow-[0_0_40px_rgba(197,245,71,0.05)] hover:shadow-[0_0_60px_rgba(197,245,71,0.1)] transition-shadow duration-500"
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#121214] to-transparent z-10 pointer-events-none block" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#121214] to-transparent z-10 pointer-events-none block" />
          
          <div className="animate-marquee whitespace-nowrap flex w-max items-center">
            {/* Group 1 */}
            <div className="flex items-center pr-12 sm:pr-20 gap-12 sm:gap-20 font-display text-xl sm:text-2xl font-extrabold uppercase tracking-widest text-[#FBFAF7]">
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><span className="text-[#c5f547] text-2xl sm:text-3xl flex items-center pr-1 animate-spin" style={{ animationDuration: '10s' }}><FaReact /></span> React JS</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><Sparkles className="text-[#c5f547] w-6 h-6 sm:w-8 sm:h-8" /> Next.js</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><span className="text-[#c5f547] text-2xl sm:text-3xl flex items-center pr-1"><FaNodeJs /></span> Node.js</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><Code className="text-[#c5f547] w-6 h-6 sm:w-8 sm:h-8" /> TypeScript</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-350 cursor-default"><Layers className="text-[#c5f547] w-6 h-6 sm:w-8 sm:h-8" /> Tailwind CSS</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><Cpu className="text-[#c5f547] w-6 h-6 sm:w-8 sm:h-8" /> Express.js</span>
            </div>
            {/* Repeated Group for seamless scrolling loop */}
            <div className="flex items-center pr-12 sm:pr-20 gap-12 sm:gap-20 font-display text-xl sm:text-2xl font-extrabold uppercase tracking-widest text-[#FBFAF7]" aria-hidden="true">
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><span className="text-[#c5f547] text-2xl sm:text-3xl flex items-center pr-1 animate-spin" style={{ animationDuration: '10s' }}><FaReact /></span> React JS</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><Sparkles className="text-[#c5f547] w-6 h-6 sm:w-8 sm:h-8" /> Next.js</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><span className="text-[#c5f547] text-2xl sm:text-3xl flex items-center pr-1"><FaNodeJs /></span> Node.js</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><Code className="text-[#c5f547] w-6 h-6 sm:w-8 sm:h-8" /> TypeScript</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-350 cursor-default"><Layers className="text-[#c5f547] w-6 h-6 sm:w-8 sm:h-8" /> Tailwind CSS</span>
              <span className="text-neutral-700 text-sm">✦</span>
              <span className="flex items-center gap-3 hover:text-[#c5f547] transition-colors duration-300 cursor-default"><Cpu className="text-[#c5f547] w-6 h-6 sm:w-8 sm:h-8" /> Express.js</span>
            </div>
          </div>
        </motion.div>

        {/* E-COMMERCE SPECIFIC SECTIONS */}
        <EcommerceSections />

        {/* INTERACTIVE SIGNATURE VISUAL STUDIO & SYSTEM LAB */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="my-10"
        >
          <AIDeveloperProfile />
        </motion.div>

        {/* HIGH-FIDELITY CORRIDOR GLOW ACCENTED DIVIDER */}
        <SectionGlowDivider 
          label="CREATIVE PORTFOLIO MATRIX" 
          subLabel="02 // DYNAMIC SKILLS & RESEARCH GALLERY" 
        />

        {/* Dynamic Navigation row for different sections - Redesigned as premium floating pill container */}
        <div className="flex bg-neutral-100 dark:bg-neutral-900/60 p-1.5 rounded-2xl gap-1 overflow-x-auto no-scrollbar scroll-smooth my-4 shrink-0 border border-neutral-200 dark:border-white/10 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab("visuals")}
            className={`flex-1 py-3 px-5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap cursor-pointer text-center ${
              activeTab === "visuals" 
                ? "bg-[#121214] text-white dark:bg-white dark:text-[#121214] shadow-sm" 
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-[#c5f547]"
            }`}
          >
            🖼️ Exhibition Gallery
          </button>

          <button
            onClick={() => setActiveTab("studio")}
            className={`flex-1 py-3 px-5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap cursor-pointer text-center ${
              activeTab === "studio" 
                ? "bg-[#121214] text-white dark:bg-white dark:text-[#121214] shadow-sm" 
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-[#c5f547]"
            }`}
          >
            ⚡ Skills & Toolkit
          </button>

          <button
            onClick={() => setActiveTab("guestbook")}
            className={`flex-1 py-3 px-5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap cursor-pointer text-center ${
              activeTab === "guestbook" 
                ? "bg-[#121214] text-white dark:bg-white dark:text-[#121214] shadow-sm" 
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-[#c5f547]"
            }`}
          >
            📝 Sticky Glassboard
          </button>

          <button
            onClick={() => setActiveTab("consult")}
            className={`flex-1 py-3 px-5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap cursor-pointer text-center ${
              activeTab === "consult" 
                ? "bg-[#121214] text-white dark:bg-white dark:text-[#121214] shadow-sm" 
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-[#c5f547]"
            }`}
          >
            🤖 AI Persona Chat
          </button>
        </div>

        {/* MAIN PANEL BASED ON CHOSEN TAB ROUTE */}
        <motion.section 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="min-h-[400px]"
        >
          {activeTab === "visuals" && (
            <motion.div variants={staggerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <motion.div variants={fadeInUp} className="text-left max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
                  ✦ Portfolio Exclusives
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#121214] mt-2">
                  Art Visual Gallery
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Step into the exquisite digital design output of Arslan. Click individual visual frames, toggle filters, or read descriptions of his high-fidelity projects.
                </p>
              </motion.div>

              {/* Gallery Mosaic Grid */}
              <motion.div variants={fadeInUp}>
                <GalleryMosaic />
              </motion.div>
            </motion.div>
          )}

          {activeTab === "studio" && (
            <motion.div variants={staggerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <motion.div variants={fadeInUp} className="text-left max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
                  ✦ Dynamic Stats & History
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#121214] mt-2">
                  Skills & Toolkit Estimators
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Explore Arslan's custom skill indicators, adjust dynamic project estimators, or view automated build & deployment velocity statistics.
                </p>
              </motion.div>

              {/* Skills Sliders and Calculator */}
              <motion.div variants={fadeInUp}>
                <SkillsRadar />
              </motion.div>

              {/* Deployment Velocity Chart */}
              <motion.div variants={fadeInUp}>
                <DeploymentVelocityChart />
              </motion.div>

              {/* Interactive Timeline Experience */}
              <motion.div variants={fadeInUp} className="p-6 sm:p-8 rounded-[28px] border border-[#121214]/10 bg-white text-left shadow-sm mt-8 hover:shadow-[0_0_15px_rgba(197,245,71,0.3)] transition-shadow duration-300">
                <h3 className="font-display text-lg font-extrabold text-[#121214] flex items-center gap-2 mb-6">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Growth Timeline Journey
                </h3>

                <motion.div 
                  variants={staggerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative"
                >
                  {/* Timeline connectors */}
                  <div className="hidden sm:block absolute top-[21px] left-8 right-8 h-px bg-neutral-200 z-0" />
                  
                  {USER_INFO.experience.map((exp) => (
                    <motion.div variants={fadeInUp} key={exp.year} className="relative z-10 space-y-2 group">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-neutral-300 flex items-center justify-center font-mono font-extrabold text-[11px] text-[#121214] group-hover:scale-110 group-hover:bg-[#121214] group-hover:text-[#c5f547] group-hover:border-[#c5f547] transition-all duration-300">
                        {exp.year}
                      </div>
                      <h4 className="font-display font-extrabold text-xs text-[#121214] pt-1 group-hover:text-[#c5f547] transition-colors">{exp.title}</h4>
                      <p className="text-[11px] text-neutral-500 leading-normal">{exp.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "guestbook" && (
            <motion.div variants={staggerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <motion.div variants={fadeInUp} className="text-left max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
                  ✦ Live Whiteboard Interaction
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#121214] mt-2">
                  Collaborative Guestboard
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Pin feedback, business inquiries, or congratulations directly on Arslan's persistent whiteboard. Custom styles, badges, and real-time upvoting indicators included!
                </p>
              </motion.div>

              {/* Guestbook Board */}
              <motion.div variants={fadeInUp}>
                <GuestbookBoard />
              </motion.div>
            </motion.div>
          )}

          {activeTab === "consult" && (
            <motion.div variants={staggerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* AI Chat workspace column */}
              <motion.div variants={fadeInUp} className="lg:col-span-7 rounded-[28px] overflow-hidden border border-[#121214]/10 bg-white h-[500px] shadow-sm hover:shadow-[0_0_15px_rgba(197,245,71,0.3)] hover:border-[#c5f547] transition-all">
                <AIAssistant />
              </motion.div>

              {/* Interactive CRT overlay control - Bento Col 5 */}
              <motion.div variants={fadeInUp} className="lg:col-span-5 hover:scale-[1.02] transition-transform duration-300">
                <VibeVisualizer onOverlayChange={setActiveOverlay} activeOverlay={activeOverlay} />
              </motion.div>

            </motion.div>
          )}
        </motion.section>

        {/* WHATSAPP DIRECT SECURE COMMISSION WORKSPACE FORM - Redesigned as classic ink-card */}
        <motion.section 
          id="quote-consultation" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="p-6 sm:p-10 rounded-[32px] bg-[#121214] text-[#FBFAF7] text-left relative overflow-hidden shadow-xl mt-8"
        >
          {/* Visual glow decorative layer */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#c5f547]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left information */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#c5f547] bg-[#c5f547]/10 px-3.5 py-1.5 rounded-full border border-[#c5f547]/20 inline-block font-bold">
                Secure Commission Workspace
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#FBFAF7] leading-tight">
                Pitch a Custom Visual Brief
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Generate and route an automated commission proposal sheet straight to Arslan's official WhatsApp channel at <strong className="text-[#c5f547] font-mono">+93 748 845221</strong>.
              </p>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-[#c5f547] font-mono text-[10px] font-bold">1</div>
                  <span>Enter brand brief instructions</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-[#c5f547] font-mono text-[10px] font-bold">2</div>
                  <span>Generate instant WhatsApp proposal call</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-7 h-7 rounded-lg bg-[#c5f547]/10 flex items-center justify-center border border-[#c5f547]/20 text-[#c5f547] font-mono text-[10px] font-bold">3</div>
                  <span className="font-semibold text-white">Start active creative production!</span>
                </div>
              </div>
            </div>

            {/* Right form block */}
            <form onSubmit={handleWhatsappSubmit} className="md:col-span-7 bg-neutral-900/60 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Proposal client name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-bold">Name or Brand Contact:</label>
                  <input
                    type="text"
                    required
                    value={proposal.name}
                    onChange={(e) => setProposal({ ...proposal, name: e.target.value })}
                    placeholder="e.g. John Doe or TechChannel"
                    className="w-full bg-neutral-950 border border-white/10 hover:border-white/20 focus:border-[#c5f547] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-all font-medium"
                  />
                </div>

                {/* Scope selection category */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-bold">Scope Type Needed:</label>
                  <select
                    value={proposal.scopetype}
                    onChange={(e) => setProposal({ ...proposal, scopetype: e.target.value })}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white outline-none cursor-pointer focus:border-[#c5f547]"
                  >
                    <option value="Cinematic Video Package">Cinematic Video Package</option>
                    <option value="AI Bot Integration">AI Bot Integration Office</option>
                    <option value="Full Stack Web Portal">Full Stack Web Portal</option>
                    <option value="Logo & Graphic Kit">Logo & Graphic Design Kit</option>
                  </select>
                </div>

              </div>

              {/* Urgency scale selection */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-bold">Required Timeline:</label>
                <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-white/10 text-center">
                  {(["Standard Delivery", "Vibe Priority", "Instant 24Hr Rush"] as const).map((urg) => (
                    <button
                      key={urg}
                      type="button"
                      onClick={() => setProposal({ ...proposal, urgency: urg })}
                      className={`text-[10px] py-2 rounded-lg capitalize font-bold transition-all cursor-pointer ${
                        proposal.urgency === urg
                          ? "bg-[#c5f547] text-[#121214] shadow-sm"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {urg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brief details description text */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-bold">Project Brief Outline:</label>
                <textarea
                  required
                  value={proposal.brief}
                  onChange={(e) => setProposal({ ...proposal, brief: e.target.value })}
                  placeholder="Describe your design parameters, style ideas, and content objectives in detail..."
                  rows={2}
                  className="w-full bg-neutral-950 border border-white/10 hover:border-white/20 focus:border-[#c5f547] rounded-xl p-4 text-xs text-white placeholder-neutral-600 outline-none transition-all resize-none font-medium"
                />
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#c5f547] hover:bg-[#c5f547]/90 text-[#121214] font-extrabold text-xs tracking-widest uppercase font-mono rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                Inquire & Open WhatsApp Call
              </button>
            </form>
          </div>
        </motion.section>

        {/* GROWTH INSIGHTS SUBSCRIPTION SECTION - Sleek and interactive */}
        <motion.section
          id="growth-insights"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="p-6 sm:p-10 rounded-[32px] bg-white dark:bg-[#121214] border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-[#FBFAF7] text-left relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mt-8"
        >
          {/* Decorative neon pulse backdrop */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/5 dark:bg-[#c5f547]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left informational message */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-600 dark:text-[#c5f547] bg-emerald-50 dark:bg-[#c5f547]/10 px-3.5 py-1.5 rounded-full border border-emerald-200/55 dark:border-[#c5f547]/20 inline-flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
                Growth Insights loop
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#121214] dark:text-[#FBFAF7] leading-tight mt-1">
                Unlock Elite Development Secrets
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                Receive weekly coding blueprints, custom full-stack templates, and design tactics engineered by <strong>Arslan Portfolio</strong> to scale high-performance systems and cinematic layouts.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                  <span className="text-emerald-500 dark:text-[#c5f547] font-bold">✔</span>
                  <span>Full-Stack React & Next.js production boilerplates</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                  <span className="text-emerald-500 dark:text-[#c5f547] font-bold">✔</span>
                  <span>Express backends & API proxying security guides</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                  <span className="text-emerald-500 dark:text-[#c5f547] font-bold">✔</span>
                  <span>Cinematic video editing LUTs & presets</span>
                </div>
              </div>
            </div>

            {/* Right Form and Mock database visualizer */}
            <div className="md:col-span-7 space-y-5">
              <div className="bg-neutral-50 dark:bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-white/5 space-y-4 shadow-inner">
                <form onSubmit={handleSubscribe} className="space-y-3.5 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 block font-bold">
                      Your Email Address:
                    </label>
                    <div className="relative flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <input
                          type="email"
                          value={subscribingEmail}
                          onChange={(e) => setSubscribingEmail(e.target.value)}
                          placeholder="you@brandoperator.com"
                          className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-white/10 hover:border-neutral-400 dark:hover:border-[#c5f547]/30 focus:border-emerald-600 dark:focus:border-[#c5f547] rounded-xl pl-4 pr-10 py-3 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 outline-none transition-all font-medium font-mono"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                          <Mail className="w-4 h-4" />
                        </span>
                      </div>
                      <button
                        type="submit"
                        disabled={subscriptionStatus === "loading"}
                        className="sm:px-6 py-3 bg-[#121214] dark:bg-[#c5f547] hover:bg-[#121214]/90 dark:hover:bg-[#c5f547]/90 text-white dark:text-[#121214] font-extrabold text-xs tracking-widest uppercase font-mono rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 min-w-[120px] cursor-pointer"
                      >
                        {subscriptionStatus === "loading" ? "Subscribing..." : "Get Free Tips"}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Response / Success / Error feedback banner */}
                {subscriptionMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                      subscriptionStatus === "success"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                  >
                    <span className="text-sm">
                      {subscriptionStatus === "success" ? "🎉" : "⚠️"}
                    </span>
                    <p className="flex-1 text-left leading-relaxed">{subscriptionMessage}</p>
                  </motion.div>
                )}

                {/* Interactive State Visualizer (Satisfaction index) */}
                <div className="pt-4 border-t border-neutral-200 dark:border-white/5">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase font-bold block mb-2.5">
                    ✦ Loop Subscribers Database (Mock State Loop):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-y-auto no-scrollbar pt-1">
                    {subscribedEmails.map((mail) => (
                      <span
                        key={mail}
                        className="text-[9px] font-mono font-medium px-2.5 py-1 rounded-full text-neutral-600 dark:text-zinc-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/5 animate-fade-in flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {mail}
                      </span>
                    ))}
                  </div>
                  <span className="text-[8px] text-neutral-400 dark:text-neutral-500 font-medium block mt-2">
                    Total: {subscribedEmails.length} active operators synchronized in local mock state.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* FOOTER BLOCK CONTAINER */}
      <footer id="contact" className="bg-[#0b0c0e] py-16 sm:py-24 z-10 relative text-white border-t border-white/5 overflow-hidden">
        
        {/* Neon glow gradient in top right */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c5f547]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left section: Title & CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center gap-4 text-xs font-mono tracking-wider text-neutral-400">
                <span className="font-bold text-white">07</span>
                <div className="w-12 h-px bg-neutral-700" />
                <span className="uppercase tracking-widest text-[10px] text-neutral-400 font-bold">CONTACT</span>
              </div>
              
              {/* Massive Slogan */}
              <h3 className="text-4xl sm:text-6xl font-display font-black leading-tight tracking-tight text-white uppercase">
                Let's build <br className="hidden sm:inline" />
                something <span className="text-[#c5f547] underline decoration-[#c5f547]/30">remarkable.</span>
              </h3>
              
              {/* Description */}
              <p className="text-neutral-400 text-xs sm:text-sm max-w-lg leading-relaxed font-medium">
                Have a project in mind, or just want to say hi? Reach out on WhatsApp — replies are usually within a day.
              </p>

              {/* Instant WhatsApp Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                
                {/* Message on WhatsApp Button */}
                <a 
                  href="https://wa.me/93781524770" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-6 px-6 py-3.5 bg-[#c5f547] hover:bg-[#b0dc3d] text-[#121214] font-extrabold text-xs tracking-wider uppercase font-mono rounded-full transition-all group shadow-[0_0_20px_rgba(197,245,71,0.2)] hover:shadow-[0_0_30px_rgba(197,245,71,0.4)]"
                >
                  Message on WhatsApp
                  <span className="p-1.5 bg-[#121214] rounded-full text-[#c5f547] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>

                {/* Join WhatsApp Channel Button */}
                <a 
                  href="https://whatsapp.com/channel/0029Vb871xM89inbSFzEQP18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-transparent border border-white/20 hover:border-white/40 text-white font-extrabold text-xs tracking-wider uppercase font-mono rounded-full transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#c5f547]" />
                  Join WhatsApp Channel
                </a>

              </div>

              {/* Bottom Quick Row Icons */}
              <div className="flex gap-2.5 pt-8">
                {/* WHATSAPP */}
                <a 
                  href="https://wa.me/93748845221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#c5f547] hover:border-[#c5f547]/50 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  {/* @ts-expect-error react-icons type issue */}
                  <FaWhatsapp className="w-4 h-4" />
                </a>

                {/* WHATSAPP CHANNEL */}
                <a 
                  href="https://whatsapp.com/channel/0029Vb871xM89inbSFzEQP18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#c5f547] hover:border-[#c5f547]/50 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                {/* INSTAGRAM */}
                <a 
                  href="https://www.instagram.com/arslan0299?igsh=ZnNkMGJxOHBta3Zi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#c5f547] hover:border-[#c5f547]/50 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  {/* @ts-expect-error react-icons type issue */}
                  <FaInstagram className="w-4 h-4" />
                </a>

                {/* TIKTOK */}
                <a 
                  href="https://www.tiktok.com/@arslan0299?_r=1&_t=ZS-97IwJRN8S8X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#c5f547] hover:border-[#c5f547]/50 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  {/* @ts-expect-error react-icons type issue */}
                  <FaTiktok className="w-4 h-4" />
                </a>

                {/* FACEBOOK */}
                <a 
                  href="_blank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#c5f547] hover:border-[#c5f547]/50 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  {/* @ts-expect-error react-icons type issue */}
                  <FaFacebookF className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Right section: Contact details Widget card */}
            <div className="lg:col-span-5 w-full">
              
              <div 
                onClick={() => window.open("https://www.google.com/search?q=arslan0299", "_blank")}
                className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 text-left relative overflow-hidden group hover:border-[#c5f547]/50 hover:shadow-[0_0_30px_rgba(197,245,71,0.05)] transition-all duration-300 cursor-pointer"
              >
                {/* subtle border overlay indicator */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-[#c5f547]" />

                {/* WHATSAPP */}
                <div className="flex items-center gap-4 group/item">
                  <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover/item:text-[#c5f547] group-hover/item:border-[#c5f547]/30 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#5c5c64] block">WHATSAPP</span>
                    <span className="text-sm sm:text-base font-display font-extrabold text-white group-hover/item:text-[#c5f547] transition-colors">
                      +92 3296521799
                    </span>
                  </div>
                </div>

                {/* WHATSAPP CHANNEL */}
                <div className="flex items-center gap-4 group/item">
                  <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover/item:text-[#c5f547] group-hover/item:border-[#c5f547]/30 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#5c5c64] block">WHATSAPP CHANNEL</span>
                    <span className="text-sm sm:text-base font-display font-extrabold text-white group-hover/item:text-[#c5f547] transition-colors">
                      Click on join Whatsapp Channel
                    </span>
                  </div>
                </div>

                {/* INSTAGRAM */}
                <div className="flex items-center gap-4 group/item">
                  <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover/item:text-[#c5f547] group-hover/item:border-[#c5f547]/30 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#5c5c64] block">INSTAGRAM</span>
                    <span className="text-sm sm:text-base font-display font-extrabold text-white group-hover/item:text-[#c5f547] transition-colors">
                      @arslan0299
                    </span>
                  </div>
                </div>

                {/* TIKTOK */}
                <div className="flex items-center gap-4 group/item">
                  <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover/item:text-[#c5f547] group-hover/item:border-[#c5f547]/30 transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#5c5c64] block">TIKTOK & FACEBOOK</span>
                    <span className="text-sm sm:text-base font-display font-extrabold text-white group-hover/item:text-[#c5f547] transition-colors">
                      @arslan0299
                    </span>
                  </div>
                </div>

                {/* Redirection Notice indicator */}
                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-neutral-500 font-mono tracking-wider">
                  <span>✦ TAP CARD TO GOOGLE SEARCH ARSLAN242</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#c5f547]" />
                </div>

              </div>

            </div>

          </div>

          {/* Core licensing / copywriter details rows matching original design rules */}
          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-xl overflow-hidden bg-[#121214] border border-white/10">
                <img src="https://i.ibb.co/Y4shkLW4/image.png" alt="Arslan Portfolio" className="w-full h-full object-cover" />
              </span>
              <div>
                <span className="font-display font-extrabold text-xs text-white block uppercase tracking-wider">Arslan Portfolio Studio</span>
                <span className="text-[9px] text-neutral-500 font-mono">© 2026 • Real-time Collaboration Hub Portfolio. All Rights Protected</span>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-3.5">
              <p className="font-mono text-[9px] text-neutral-500 max-w-sm sm:text-right leading-relaxed">
                Designed with direct reference to template assets. Integrated fast routing, live clocks, persistent bento grids, and dynamic custom action redirections.
              </p>

              {/* Amazing custom button badge: Build with Arslan */}
              <div 
                onClick={() => window.open("https://www.google.com/search?q=arslan", "_blank")}
                className="relative group overflow-hidden px-4 py-2 rounded-2xl bg-[#121214] border border-[#c5f547]/30 hover:border-[#c5f547] hover:bg-[#c5f547]/10 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(197,245,71,0.1)] flex items-center gap-2 select-none shrink-0"
                title="Google Search Arslan"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5f547] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5f547]"></span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#9ca3af] group-hover:text-white uppercase font-black transition-colors">
                  Build with <span className="text-red-500 font-sans group-hover:animate-pulse">❤</span> by <strong className="text-white group-hover:text-[#c5f547] underline decoration-wavy font-bold">ARSLAN</strong>
                </span>
              </div>
            </div>
          </div>

        </div>
      </footer>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-[#121214]/60"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#FBFAF7] dark:bg-neutral-900 text-[#121214] dark:text-white rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto relative border border-neutral-200/80 dark:border-white/10 no-scrollbar sm:no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModal(null)} 
                className="absolute top-4 right-4 p-2 bg-neutral-150 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors z-10 cursor-pointer border border-[#121214]/10 dark:border-white/5"
              >
                <X className="w-4 h-4" />
              </button>
              {renderModalContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
