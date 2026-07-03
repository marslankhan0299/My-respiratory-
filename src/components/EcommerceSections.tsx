import React, { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { Target, TrendingUp, Users, DollarSign, Rocket, ShieldCheck, Zap, BarChart3, ArrowRight, ChevronDown, Heading, ExternalLink, Cpu, Code, Video, Sparkles, GraduationCap } from 'lucide-react';
import { USER_INFO } from '../galleryData';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

export const EcommerceSections: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [arslanImgSrc, setArslanImgSrc] = useState('https://i.ibb.co/GQrYPYXm/image.png');

  return (
    <div className="w-full flex flex-col gap-16 py-12">
      
      {/* SECTION 1: GLOBAL METRICS */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full"
      >
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <span className="inline-block py-1 px-3 bg-[#c5f547]/20 border border-[#121214]/10 dark:border-white/10 text-[#121214] dark:text-[#c5f547] rounded-full text-[10px] font-mono tracking-widest font-bold uppercase mb-3 drop-shadow-sm">Aesthetic Reach</span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#121214] dark:text-white tracking-tight">The Creative <span className="text-gradient-lime">Engine</span></h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm sm:text-base max-w-lg mx-auto">Scaling audience engagement and web infrastructure through pristine code and cinematic visual content.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
          {[
            { label: "Direct Impressions", value: "3.8M+", icon: <TrendingUp className="w-5 h-5 text-emerald-500" /> },
            { label: "Interactive Portals", value: "120+", icon: <Code className="w-5 h-5 text-blue-500" /> },
            { label: "Happy Collectors", value: "350+", icon: <Users className="w-5 h-5 text-purple-500" /> },
            { label: "AI Models Trained", value: "45+", icon: <Cpu className="w-5 h-5 text-rose-500" /> },
          ].map((stat, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="paper-card p-6 flex flex-col items-center justify-center text-center group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {stat.icon}
              </div>
              <h4 className="text-2xl sm:text-4xl font-display font-black text-[#121214] dark:text-white tracking-tighter">{stat.value}</h4>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest font-bold text-neutral-400 dark:text-neutral-500 mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 2: PREMIUM SERVICES */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full relative"
      >
        <div className="absolute inset-0 bg-[#121214] rounded-[40px] transform -skew-y-2 z-0 scale-105" />
        
        <div className="relative z-10 p-8 sm:p-12 text-[#FBFAF7] rounded-[40px] border border-white/10 overflow-hidden glass-dark">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5f547]/10 blur-[100px] rounded-full" />
          
          <motion.div variants={fadeInUp} className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 py-1 px-3 bg-white/5 border border-white/10 text-[#c5f547] rounded-full text-[10px] font-mono tracking-widest font-bold uppercase mb-4 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5" /> High-End Stack
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-tight">Advanced Developer <br/>Aesthetics.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "AI Integrations",
                desc: "We build modular, secure middleware structures that connect Gemini and other leading API architectures to bespoke client hubs.",
                icon: <Cpu className="w-6 h-6 text-[#c5f547]" />
              },
              {
                title: "Cinematic Media",
                desc: "Viral video post-production custom assets, timing, motion banners, and modern typography optimized for highest visual contrast.",
                icon: <Video className="w-6 h-6 text-blue-400" />
              },
              {
                title: "Vite & React Hubs",
                desc: "Ultra-fast frontends deployed using responsive grid layouts with custom micro-animations and pristine light/dark states.",
                icon: <Code className="w-6 h-6 text-purple-400" />
              }
            ].map((service, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors backdrop-blur-sm group flex flex-col items-start cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">{service.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                <div className="mt-auto flex items-center gap-2 text-xs font-mono font-bold text-[#c5f547] uppercase tracking-wider group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Split horizontal divider */}
          <div className="w-full h-px bg-white/10 my-12" />

          {/* Masthead Headline for Team */}
          <motion.div variants={fadeInUp} className="mb-10 text-left">
            <span className="inline-flex items-center gap-2 py-1 px-3 bg-[#c5f547]/10 border border-[#c5f547]/20 text-[#c5f547] rounded-full text-[10px] font-mono tracking-widest font-bold uppercase mb-4 backdrop-blur-sm">
              ✦ Full-Stack Development Services
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tighter">
              Muhammad Arslan | Full-Stack Software Engineering
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              Engineering high-performance client & server architectures using React JS, Next.js, and Node.js, fused with custom cinematic visuals and beautiful UI tokens.
            </p>
          </motion.div>

          {/* Hassan & Arslan Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 text-left">
            
            {/* Server & Node.js Card */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-white/[0.02] border border-white/5 p-6 rounded-[28px] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-303 relative overflow-hidden flex flex-col justify-between group min-h-[380px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5f547]/5 blur-[40px] rounded-full pointer-events-none" />
              
              <div>
                <div className="w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-5 border border-white/10 relative">
                  <img 
                    src="https://i.ibb.co/GQrYPYXm/image.png" 
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" 
                    alt="Arslan backend systems" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#c5f547] text-[#121214] text-[9px] font-mono font-bold uppercase rounded tracking-wider animate-pulse">
                    ★ Server & API Specialist
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold text-[#c5f547] tracking-widest uppercase block mb-1">
                  ARSLAN SYSTEMS | SERVER & INTERACTION ENGINE
                </span>
                <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  Node.js & Express Architecture
                </h4>
                <p className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
                  Architecting robust API structures, secure proxy routers for Gemini models, modular environment safety systems, custom endpoint routing, and fast containerized backend microservices.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#c5f547] uppercase tracking-wider mt-6 cursor-pointer hover:underline">
                Explore Server Code <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* Arslan Card */}
            <motion.div 
              variants={fadeInUp} 
              onClick={() => window.open(USER_INFO.socials.instagram, "_blank")}
              className="bg-white/[0.02] border border-[#c5f547]/20 p-6 rounded-[28px] hover:bg-white/[0.05] hover:border-[#c5f547]/40 shadow-[0_0_20px_rgba(197,245,71,0.03)] hover:shadow-[0_0_25px_rgba(197,245,71,0.08)] transition-all duration-305 relative overflow-hidden flex flex-col justify-between group min-h-[380px] cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5f547]/5 blur-[40px] rounded-full pointer-events-none" />
              
              <div>
                <div className="w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-5 border border-white/10 relative">
                  <img 
                    src={arslanImgSrc} 
                    onError={() => setArslanImgSrc('https://i.ibb.co/GQrYPYXm/image.png')}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105" 
                    alt="React and Next.js frontends" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#c5f547] text-[#121214] text-[9px] font-mono font-bold uppercase rounded tracking-wider animate-pulse">
                    🗲 Client & Layout Specialist
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold text-[#c5f547] tracking-widest uppercase block mb-1">
                  ARSLAN VISUALS | REACT & NEXT.JS ENGINE
                </span>
                <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
                  React & Next.js Aesthetics <Sparkles className="w-5 h-5 text-[#c5f547] inline" />
                </h4>
                <p className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
                  Designing pristine user experiences, custom responsive bento layouts, fluid motion animations, lazy-loaded structures, and interactive client-side state engines.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#c5f547] uppercase tracking-wider mt-6 group-hover:underline">
                Connect on Instagram <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* SECTION 3: THE PROCESS BLUEPRINT */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full pt-8"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="inline-block py-1 px-3 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold font-mono text-[10px] uppercase rounded-full tracking-wider mb-3">Our Work Blueprint</span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#121214] dark:text-white tracking-tight">The Development <span className="text-gradient">Core</span></h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 hidden md:block rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {[
              { step: "01", name: "Visual Wireframe", text: "Prototyping dynamic bento cells, typography systems, and glaze hues." },
              { step: "02", name: "React Engineering", text: "Developing modular tsx files with declarative motion animations." },
              { step: "03", name: "AI Integration", text: "Linking Gemini model routes securely on server layers without API leak risk." },
              { step: "04", name: "Optimize & Launch", text: "Polishing assets and rendering high-speed container loads." }
            ].map((phase, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="relative group">
                <div className="w-16 h-16 rounded-full bg-[#121214] dark:bg-neutral-800 text-[#c5f547] flex items-center justify-center font-display font-black text-xl border-4 border-[#FBFAF7] dark:border-neutral-900 shadow-lg mx-auto md:mx-0 z-10 relative group-hover:scale-110 transition-transform duration-300">
                  {phase.step}
                </div>
                <div className="mt-6 text-center md:text-left paper-card p-6 border-l-4 border-l-[#c5f547]">
                  <h4 className="font-display font-extrabold text-[#121214] dark:text-white text-lg mb-2">{phase.name}</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-medium">{phase.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: DEEP EXPERIMENT / PHOTO GALLERY */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-24 overflow-hidden"
      >
        {/* Abstract dark color partition */}
        <div className="absolute inset-0 z-0 flex flex-col">
          <div className="h-[40%] bg-[#d3d3d3] dark:bg-neutral-950/20 relative">
             <svg className="absolute bottom-[-1px] left-0 w-full h-[150px]" preserveAspectRatio="none" viewBox="0 0 1440 320" fill="#121214">
               <path d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,234.7C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
             </svg>
          </div>
          <div className="h-[60%] bg-[#121214]"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto pt-16 pb-24 px-5 sm:px-8 flex flex-col items-center">
          
          {/* Headline and Portraits */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center w-full max-w-5xl mx-auto relative h-[350px] mb-20 flex flex-col items-center justify-start mt-8">
            <motion.h1 variants={fadeInUp} className="text-[3.5rem] sm:text-[7.5rem] font-display font-black leading-[0.8] text-white absolute top-0 w-full text-center tracking-tighter mix-blend-difference z-20 pointer-events-none">
              ARSLAN VISUALS<br/>
              <span className="text-[1.8rem] sm:text-[3rem] font-sans font-light tracking-[0.4em] ml-4 text-[#c5f547]">PORTFORLIO</span>
            </motion.h1>
            <motion.div variants={{hidden: {opacity: 0, scale: 0.8}, show: {opacity: 1, scale: 1, transition: {duration: 0.8, ease: "easeOut"}}}} className="relative z-10 w-56 h-72 sm:w-[350px] sm:h-[450px] mt-20 sm:mt-32 rounded-b-[40px] rounded-t-[140px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(197,245,71,0.2)] transition-all duration-700 bg-white group flex items-center justify-center p-8 sm:p-16 border-2 border-transparent hover:border-[#c5f547]/30">
              <img src="https://i.ibb.co/Y4shkLW4/image.png" alt="Muhammad Arslan visual arts concept cover" className="w-full h-full object-cover rounded-3xl group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out drop-shadow-2xl" />
              <div 
                onClick={() => window.open(USER_INFO.socials.instagram, "_blank")}
                className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 bg-[#c5f547] text-[#121214] font-mono text-[10px] font-bold px-6 py-2.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(197,245,71,0.5)] transform -rotate-2 group-hover:-translate-y-2 group-hover:rotate-0 transition-transform duration-500 cursor-pointer hover:bg-[#c5f547]/90"
              >
                Inquire Vibe
              </div>
            </motion.div>
          </motion.div>

          {/* Staggered visual cards row */}
          <div className="flex justify-center gap-4 sm:gap-6 mt-[60px] sm:mt-[140px] z-30 mb-24 flex-wrap">
            <motion.div variants={fadeInUp} className="w-[100px] h-[130px] sm:w-[160px] sm:h-[200px] rounded-3xl overflow-hidden border-2 sm:border-4 border-[#121214] shadow-2xl mt-8">
              <img src="https://i.ibb.co/GQrYPYXm/image.png" className="w-full h-full object-cover filter contrast-125 saturate-0 hover:saturate-100 transition-all duration-505" alt="g1" />
            </motion.div>
            <motion.div variants={fadeInUp} className="w-[100px] h-[130px] sm:w-[160px] sm:h-[200px] rounded-3xl overflow-hidden border-2 sm:border-4 border-[#121214] shadow-2xl">
              <img src="https://i.ibb.co/GQrYPYXm/image.png" className="w-full h-full object-cover filter contrast-125 saturate-0 hover:saturate-100 transition-all duration-505" alt="g2" />
            </motion.div>
            <motion.div variants={fadeInUp} className="w-[100px] h-[130px] sm:w-[160px] sm:h-[200px] rounded-3xl overflow-hidden border-2 sm:border-4 border-[#121214] shadow-2xl mt-4">
              <img src="https://i.ibb.co/Y4shkLW4/image.png" className="w-full h-full object-cover filter contrast-125 saturate-0 hover:saturate-100 transition-all duration-505" alt="g3" />
            </motion.div>
          </div>

          {/* Lower layout title card (FSD ORIGIN) */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-full max-w-5xl mx-auto relative flex justify-center items-center mb-32 pt-16">
            <motion.h1 variants={fadeInUp} className="text-[5.5rem] sm:text-[14rem] font-display font-black text-white leading-none tracking-tighter absolute z-0 pointer-events-none mb-12 sm:mb-24 px-4 text-center select-none opacity-10">
              FSD ART
            </motion.h1>
            <div className="z-10 grid grid-cols-2 gap-3 sm:gap-6 mt-16 sm:mt-40 px-4">
               <motion.div variants={fadeInUp} className="bg-white dark:bg-zinc-900 border border-transparent dark:border-white/5 p-2.5 sm:p-4 rounded-[20px] sm:rounded-3xl shadow-2xl w-40 sm:w-64 transform -rotate-2 hover:rotate-0 transition-transform duration-500 group">
                 <div className="w-full h-[180px] sm:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 relative">
                   <img src="https://i.ibb.co/Y4shkLW4/image.png" className="w-full h-full object-cover border border-black/5" />
                   <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-[#c5f547] rounded-full animate-pulse" />
                 </div>
                 <div className="flex justify-between items-end pb-1 px-1">
                   <div>
                     <h4 className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-[#121214] dark:text-zinc-100">Studio Focus</h4>
                     <p className="text-[9px] sm:text-[11px] font-mono font-medium text-neutral-400 block mt-0.5">Asset 12</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[9px] sm:text-[11px] font-mono text-[#121214] dark:text-[#c5f547] font-bold">Grade 9.1</p>
                     <p className="text-[9px] sm:text-[11px] font-mono text-neutral-400 block mt-0.5">Aura Matrix</p>
                   </div>
                 </div>
               </motion.div>
               
               <motion.div variants={fadeInUp} className="bg-white dark:bg-zinc-900 border border-transparent dark:border-white/5 p-2.5 sm:p-4 rounded-[20px] sm:rounded-3xl shadow-2xl w-40 sm:w-64 transform rotate-2 translate-y-6 sm:translate-y-12 hover:rotate-0 transition-transform duration-500 group">
                 <div className="w-full h-[180px] sm:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 relative">
                   <img src="https://i.ibb.co/Y4shkLW4/image.png" className="w-full h-full object-cover border border-black/5" />
                 </div>
                 <div className="flex justify-between items-end pb-1 px-1">
                   <div>
                     <h4 className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-[#121214] dark:text-zinc-100">RGB Offset</h4>
                     <p className="text-[9px] sm:text-[11px] font-mono font-medium text-neutral-400 block mt-0.5">Layer 24</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[9px] sm:text-[11px] font-mono text-[#121214] dark:text-[#c5f547] font-bold">Chroma 14</p>
                     <p className="text-[10px] sm:text-[11px] font-mono text-neutral-400 block mt-0.5">Glaze Cell</p>
                   </div>
                 </div>
               </motion.div>
            </div>
          </motion.div>

          {/* Collections Section */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-full max-w-5xl mx-auto border-t border-white/5 pt-16 sm:pt-24 mt-16 sm:mt-24 px-4 sm:px-0">
            <motion.div variants={fadeInUp} className="flex justify-between items-end mb-10 sm:mb-14 px-2">
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tighter">Collections</h2>
              <span className="bg-[#c5f547] text-[#121214] px-5 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase font-mono tracking-widest shrink-0 shadow-[0_0_15px_rgba(197,245,71,0.3)]">Vitreous</span>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
               {[
                 { src: "https://i.ibb.co/Y4shkLW4/image.png", name: "Glaze UI Sheets", date: "2026 (C)", sub: "Aesthetic modular glass components" },
                 { src: "https://i.ibb.co/Y4shkLW4/image.png", name: "Iridescent AI Nodes", date: "2026 (C)", sub: "AI-generated fluid light vectors" },
                 { src: "https://i.ibb.co/GQrYPYXm/image.png", name: "Liquid Glass Matrix", date: "2026 (C)", sub: "Pristine vitreous interface slabs" },
               ].map((item, idx) => (
                 <motion.div variants={fadeInUp} key={idx} className="group cursor-pointer">
                   <div className="w-full h-[280px] sm:h-[400px] rounded-[32px] overflow-hidden mb-5 relative border border-white/5 shadow-2xl">
                     <img src={item.src} className="w-full h-full object-cover filter contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-700 transform group-hover:scale-105" />
                     {/* Overlay on hover */}
                     <div className="absolute inset-0 bg-[#c5f547]/0 group-hover:bg-[#c5f547]/10 transition-all duration-500 mix-blend-overlay"></div>
                   </div>
                   <div className="flex justify-between items-baseline px-2">
                     <h4 className="font-display font-black text-[#c5f547] uppercase text-sm sm:text-base tracking-widest group-hover:text-white transition-colors duration-300">{item.name}</h4>
                     <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-500 bg-white/5 px-3 py-1 rounded-full">{item.date}</span>
                   </div>
                   <p className="text-[10px] sm:text-xs font-mono text-neutral-400 px-2 mt-2 max-w-[80%]">{item.sub}</p>
                 </motion.div>
               ))}
            </div>

            {/* INTERACTIVE ECOMMERCE FAQS SECTION ACCORDION */}
            <motion.div variants={fadeInUp} className="w-full max-w-5xl mx-auto border-t border-white/5 pt-20 mt-20 px-4 sm:px-0 text-left">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <span className="text-[9px] font-mono tracking-widest bg-[#c5f547]/20 text-[#c5f547] border border-[#c5f547]/30 px-3 py-1.5 rounded-full uppercase font-bold inline-flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Core Knowledge Base
                  </span>
                  <h2 className="text-2xl sm:text-5xl font-display font-black text-white uppercase tracking-tighter mt-3">
                    Developer & Creator FAQs
                  </h2>
                </div>
                <p className="text-xs text-neutral-400 font-mono max-w-sm leading-relaxed">
                  Have questions about custom stacks, system parameters, post-production flow, or booking guidelines? Expand the lines.
                </p>
              </div>

              <div className="space-y-4 max-w-4xl mx-auto">
                {[
                  {
                    val: "01",
                    question: "What frameworks do Arslan and Arslan Visuals specialize in?",
                    answer: "I specialize in the MERN stack—specifically high-performance React frontends styled with Tailwind CSS utility frameworks, integrated server-side with Node/Express backends, and coupled with server-side AI SDKs like the Google @google/genai package."
                  },
                  {
                    val: "02",
                    question: "How is the Gemini API used on the server securely?",
                    answer: "We adhere strictly to server-side secrecy guidelines. The server.ts proxies all chat requests, applying the modern SDK under GoogleGenAI with safe environment variable parameters. We completely safeguard sensitive keys from client browser exposure."
                  },
                  {
                    val: "03",
                    question: "What format does Arslan use for custom video post-production?",
                    answer: "We deliver full cinematic edit packages featuring deep color grades (using custom professional LUTs), kinetic text layouts, sound designs, seamless frame transitions, and render codecs optimized specifically for high contrast on screen displays."
                  },
                  {
                    val: "04",
                    question: "How can I inquire about a commission or book an integration?",
                    answer: "You can click on the WhatsApp indicator inside the socials bar or pin a message live to the collaborative glassboard with the 'Get Quote' category! We can sync via direct messages to details, timelines, and budgets."
                  },
                  {
                    val: "05",
                    question: "How does Arslan handle full-stack performance with React, Next.js, and Node.js?",
                    answer: "By utilizing React hydration, optimized routing pipelines, secure API proxying, and lightweight Express servers, Arslan ensures custom modules execute with blazing fast speed, maintaining instant interactive metrics and high-fidelity transitions."
                  }
                ].map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className={`border rounded-2xl transition-all duration-300 ${
                        isOpen 
                          ? "bg-white/5 border-[#c5f547]/40 shadow-[0_0_20px_rgba(197,245,71,0.1)]" 
                          : "bg-white/[0.02] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4 pr-4">
                          <span className={`text-[11px] font-mono font-bold px-2 py-1 rounded ${
                            isOpen ? "bg-[#c5f547] text-[#121214]" : "bg-white/5 text-neutral-400"
                          }`}>
                            {faq.val}
                          </span>
                          <h4 className={`text-sm sm:text-base font-display font-bold leading-snug transition-colors ${
                            isOpen ? "text-[#c5f547]" : "text-white"
                          }`}>
                            {faq.question}
                          </h4>
                        </div>
                        <div className={`p-1.5 rounded-full border transition-all ${
                          isOpen ? "border-[#c5f547]/40 bg-[#c5f547]/10 text-[#c5f547] rotate-180" : "border-white/10 bg-white/5 text-neutral-400"
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-[300px]" : "max-h-0"
                        }`}
                        style={{ maxHeight: isOpen ? "300px" : "0px" }}
                      >
                        <div className="p-5 text-neutral-300 text-xs sm:text-sm leading-relaxed space-y-2 border-t border-white/5">
                          <p className="font-sans text-neutral-300">
                            {faq.answer}
                          </p>
                          <div className="flex items-center gap-2 pt-2 text-[#c5f547] text-[10px] font-mono font-bold tracking-wider">
                            <span className="w-1.5 h-1.5 bg-[#c5f547] rounded-full animate-pulse" />
                            DEVELOPMENT MATRIX | COLLABORATION STRATEGY BY ARSLAN
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Fake Footer Table inside the dark section */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 sm:grid-cols-4 gap-6 sm:gap-10 mt-20 sm:mt-32 pt-16 border-t border-white/5 px-2">
              {[1,2,3].map((col) => (
                <div key={col} className="space-y-4 text-left">
                  <h5 className="font-display font-black text-white uppercase text-[10px] sm:text-xs tracking-widest mb-6">Collections {col}</h5>
                  <div className="space-y-3">
                    {["Code", "Videos", "Design"].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group cursor-pointer">
                        <span className="text-neutral-500 text-[10px] font-mono group-hover:text-[#c5f547] transition-colors">{`0${i + 1}`}</span>
                        <div className="h-px bg-white/10 flex-1 group-hover:bg-[#c5f547]/30 transition-colors" />
                        <span className="text-neutral-400 text-xs font-medium uppercase tracking-wider group-hover:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="hidden sm:block">
                <div className="w-full h-full rounded-[30px] border border-white/10 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500 min-h-[150px]">
                  <img src="https://i.ibb.co/GQrYPYXm/image.png" alt="Footer Img" className="object-cover w-full h-full" />
                  <div className="absolute top-4 right-4 bg-[#c5f547] text-[#121214] text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase">Look Book</div>
                </div>
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
};
