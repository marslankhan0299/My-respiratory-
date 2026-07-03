import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowDown, Cpu, Layers } from "lucide-react";

interface SectionGlowDividerProps {
  label?: string;
  subLabel?: string;
}

export function SectionGlowDivider({ 
  label = "SYSTEM PLATFORM ENGAGEMENT", 
  subLabel = "02 // EXTENDED TOOLSET & CREATIVE LAB" 
}: SectionGlowDividerProps) {
  return (
    <div className="relative w-full py-12 sm:py-16 overflow-hidden select-none">
      {/* Absolute Ambient Background Glow Vector Plates */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[60px] sm:h-[100px] bg-gradient-to-r from-blue-500 via-[#c5f547] to-purple-600 rounded-full blur-[40px] sm:blur-[60px] opacity-[0.22] dark:opacity-[0.28] pointer-events-none" />
      
      {/* Fine-Grid Graphic Overlay behind the line */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e1f29_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Structured flex alignment for line and details */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center relative">
        
        {/* Decorative Grid Line Guides */}
        <div className="w-full flex items-center justify-between opacity-30 dark:opacity-25 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#121214] dark:text-zinc-400 mb-2">
          <span className="flex items-center gap-1.5 font-bold uppercase">
            <span>[ SYSTEM_DIVIDER_INIT ]</span>
            <span className="text-[#c5f547]">●</span>
          </span>
          <span className="font-bold">{subLabel}</span>
        </div>

        {/* The Premium High-Fidelity Glowing Line */}
        <div className="relative w-full flex items-center justify-center my-4">
          {/* Fading border background row */}
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 via-neutral-300 dark:via-neutral-800 to-transparent" />
          
          {/* Gradient Glowing line overlay */}
          <motion.div 
            initial={{ width: "0%", opacity: 0 }}
            whileInView={{ width: "80%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-blue-500 via-[#c5f547] to-purple-600" 
          />

          {/* Symmetrical glowing dot trackers */}
          <div className="absolute left-[15%] w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#c5f547] shadow-[0_0_10px_#c5f547]" />
          <div className="absolute right-[15%] w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#c5f547] shadow-[0_0_10px_#c5f547]" />

          {/* Center Floating High-Fi Glass Capsule Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg hover:shadow-[0_0_20px_rgba(197,245,71,0.25)] hover:border-[#c5f547]/40 transition-all duration-300"
          >
            {/* Spinning background light ray */}
            <div className="absolute inset-x-4 inset-y-0.5 rounded-full bg-gradient-to-r from-[#c5f547]/10 via-blue-500/10 to-transparent blur-sm pointer-events-none" />

            <div className="flex items-center justify-center p-1 sm:p-1.5 rounded-full bg-[#121214] dark:bg-[#c5f547] text-[#c5f547] dark:text-[#121214] shrink-0 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col items-start leading-tight">
              <span className="font-mono text-[7px] sm:text-[8px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest leading-none">
                {label}
              </span>
              <span className="font-display text-[10px] sm:text-[11px] font-extrabold text-[#121214] dark:text-white mt-0.5 uppercase tracking-wide flex items-center gap-1.5">
                ENGINE EXPANSION ZONE
                <ArrowDown className="w-3 h-3 text-[#c5f547] animate-bounce" />
              </span>
            </div>

          </motion.div>
        </div>

        {/* Dynamic decorative metric statistics */}
        <div className="w-full flex items-center justify-between opacity-30 dark:opacity-25 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#121214] dark:text-zinc-400 mt-2">
          <span>PORTFOLIO STATE: ONLINE</span>
          <span className="flex items-center gap-2">
            <span>Fidelity: ULTRA</span>
            <span>✦</span>
            <span>GRID ACTIVE</span>
          </span>
        </div>

      </div>
    </div>
  );
}
