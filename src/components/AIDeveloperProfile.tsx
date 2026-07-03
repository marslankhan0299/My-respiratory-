import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, BrainCircuit, Code2, ArrowUpRight, Palette } from "lucide-react";
import { SiOpenai, SiReact, SiNextdotjs } from 'react-icons/si';

export function AIDeveloperProfile() {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="p-6 sm:p-10 rounded-[32px] border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#08090d]/60 shadow-[0_0_40px_rgba(197,245,71,0.05)] text-left text-neutral-800 dark:text-neutral-200 max-w-6xl mx-auto relative overflow-hidden backdrop-blur-xl"
    >
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5f547]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header section with grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e1f29_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* LEFT COLUMN: Avatar & Badges */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-center relative z-10 w-full">
          {/* Main Character / Avatar Container */}
          <div className="relative w-full max-w-[320px] aspect-[4/5] mx-auto group perspective-1000">
            {/* Spinning background glow */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 bg-gradient-to-r from-[#c5f547] via-cyan-400 to-purple-600 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 -z-10"
            />
            
            {/* 3D Model / Avatar Image Slot */}
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full h-full relative z-20 flex items-end justify-center transform-style-3d drop-shadow-2xl"
            >
              <img 
                src="https://i.ibb.co/Y4shkLW4/image.png" 
                alt="Arslan Developer AI Avatar" 
                className="w-full h-full object-cover rounded-[40px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300"
                style={{ 
                  filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))',
                  clipPath: 'inset(0 0 0 0 round 40px)'
                }}
              />
              {/* Optional: if they provide a transparent ping, use object-contain and remove clipPath */}
            </motion.div>

            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-6 md:-right-10 bg-white dark:bg-[#121214] border border-neutral-200 dark:border-white/10 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 z-30"
            >
              <div className="p-2 bg-[#c5f547]/20 rounded-lg text-[#c5f547]">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[10px] font-mono font-bold text-neutral-400">AI ENGINEER</span>
                <span className="text-xs font-bold text-[#121214] dark:text-white">Top Scorer</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 -left-6 md:-left-10 bg-white dark:bg-[#121214] border border-neutral-200 dark:border-white/10 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 z-30"
            >
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-500">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[10px] font-mono font-bold text-neutral-400">FULL-STACK</span>
                <span className="text-xs font-bold text-[#121214] dark:text-white">Pro Level</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Typography & AI Logos */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8 flex flex-col justify-center">
          
          <div className="space-y-4 relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 font-mono text-[11px] text-neutral-600 dark:text-[#c5f547] font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Elite Developer & AI Expert
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#121214] dark:text-white leading-[1.1] tracking-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-[#c5f547] to-[#10a37f]">Intelligent</span> Systems.
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Merging cutting-edge full-stack architecture with advanced AI models. I build scalable, cinematic web applications powered by next-generative technologies.
            </p>
          </div>

          {/* AI Tool & Integration Framework Logos */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">Core Automation & Visual Stack</h3>
            
            <div className="flex flex-wrap gap-4 items-center">
              {/* ChatGPT / OpenAI */}
              <motion.a 
                whileHover={{ scale: 1.1, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border-2 border-transparent hover:border-white/20 bg-[#10a37f] text-white shadow-[0_0_15px_rgba(16,163,127,0.3)] hover:shadow-[0_0_30px_rgba(16,163,127,0.6)]"
              >
                {/* @ts-ignore */}
                <SiOpenai style={{ width: '28px', height: '28px' }} />
              </motion.a>

              {/* Midjourney or AI Visual engine equivalent */}
              <motion.a 
                whileHover={{ scale: 1.1, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border-2 border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1e1e24] text-[#121214] dark:text-white shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <Palette className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.a>

              {/* Custom AI Engine Orange (Hugging Face style) */}
              <motion.a 
                whileHover={{ scale: 1.1, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border-2 border-transparent hover:border-white/20 bg-[#d97757] text-white shadow-[0_0_15px_rgba(217,119,87,0.3)] hover:shadow-[0_0_30px_rgba(217,119,87,0.6)]"
              >
                <span className="text-xl sm:text-2xl font-black font-display tracking-tighter">Hf</span>
              </motion.a>

               {/* React Native / Web */}
               <motion.a 
                whileHover={{ scale: 1.1, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border-2 border-neutral-200 dark:border-white/10 bg-[#000000] text-[#61DAFB] shadow-[0_0_15px_rgba(97,218,251,0.2)] hover:shadow-[0_0_30px_rgba(97,218,251,0.4)]"
              >
                {/* @ts-ignore */}
                <SiReact style={{ width: '32px', height: '32px' }} />
              </motion.a>

               {/* Next.js */}
               <motion.a 
                whileHover={{ scale: 1.1, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border-2 border-neutral-800 bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                {/* @ts-ignore */}
                <SiNextdotjs style={{ width: '28px', height: '28px' }} />
              </motion.a>
              
            </div>
          </div>

          <motion.div variants={itemVariants} className="pt-6 flex items-center gap-4 border-t border-neutral-100 dark:border-white/10">
            <button className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#121214] dark:bg-white text-white dark:text-[#121214] rounded-full font-bold text-xs sm:text-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform duration-300">
              EXPLORE AI AGENTS
            </button>
            <button className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border border-[#121214] dark:border-white/20 text-[#121214] dark:text-white rounded-full font-bold text-xs sm:text-sm hover:bg-[#121214]/5 dark:hover:bg-white/5 transition-colors duration-300">
              <span>VIEW REPOS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
