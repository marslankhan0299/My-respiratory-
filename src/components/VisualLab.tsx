import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Video, Sliders, Cpu, Wand2, Tv, RefreshCcw, Copy, Check, Flame, Zap, Play, Layout, AppWindow } from "lucide-react";

interface ProjectTemplate {
  id: string;
  name: string;
  type: "video" | "cgi" | "web";
  basePrompt: string;
  duration: string;
  gradient: string;
  metrics: {
    complexity: number;
    engagement: number;
  };
}

const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "neon-cyberpunk",
    name: "CGI Neon Cyberpunk Commercial",
    type: "cgi",
    basePrompt: "vray-render, ultra-realistic visual of next-generation cyberpunk smart headset floating on warm studio display desk. [CAMERA: SLOW-TRACK-RIGHT], [LIGHTING: METROPOLITAN-PURPLE-NEON, 8K-RESOLUTION, CINEMATIC-GRAIN]. Depth of field focused on reflective biometric lenses.",
    duration: "15s Spot",
    gradient: "from-indigo-600 via-purple-700 to-pink-500",
    metrics: { complexity: 94, engagement: 98 }
  },
  {
    id: "corp-minimal",
    name: "Corporate Luxury Elegance Mini-Doc",
    type: "video",
    basePrompt: "cinematic-4k documentary style footage, extreme macro shot of watch mechanics clicking perfectly. [CAMERA: STEADICAM-MACRO, ORBIT-360-SLOW], [LIGHTING: NATURAL-WARM-OFFICE, ACCENT-GOLD-BEAMS]. Fluid transitions, smooth tracking focusing on premium metallic finishes.",
    duration: "45s Cut",
    gradient: "from-amber-600 via-orange-500 to-yellow-600",
    metrics: { complexity: 78, engagement: 89 }
  },
  {
    id: "viral-cinematic",
    name: "Viral Social Cinematic Short",
    type: "video",
    basePrompt: "tiktok-style dynamic high-impact transition. Smooth zoom-out from deep storm clouds into a sleek high-performance electric super-car speeding down highway. [CAMERA: DYNAMIC-DOLLY-ZOOM, FAST-PAN-UP], [LIGHTING: GOLDEN-HOUR-SUNRISE]. Hyper-realistic motion blur, extreme contrast.",
    duration: "9s Reel",
    gradient: "from-lime-500 via-emerald-600 to-teal-500",
    metrics: { complexity: 88, engagement: 99 }
  },
  {
    id: "ecommerce-shutter",
    name: "E-Commerce Dynamic Interactive Showcase",
    type: "web",
    basePrompt: "high-contrast multi-perspective responsive interface grid. Dynamic product cards displaying tactile mechanical keyboards. [INTERACTIVITY: PARALLAX-MOUSE-SHIVER, SPARKLE-SPAWN-PATH], [VIBE: Swiss-Modern-Glass, 3D-Bento-Preserve]. Interactive CSS overlays.",
    duration: "Standalone App",
    gradient: "from-cyan-500 via-blue-600 to-indigo-600",
    metrics: { complexity: 85, engagement: 92 }
  }
];

export function VisualLab() {
  const [activeProj, setActiveProj] = useState<ProjectTemplate>(PROJECT_TEMPLATES[0]);
  const [promptWeight, setPromptWeight] = useState(85);
  const [frameRate, setFrameRate] = useState(60);
  const [colorGrade, setColorGrade] = useState(75);
  const [aspectRatio, setAspectRatio] = useState<"cinema" | "mobile" | "square">("cinema");
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(100);
  const [copied, setCopied] = useState(false);
  const [crtOverlay, setCrtOverlay] = useState(true);

  // Trigger brief rendering effect on parameter change to simulate the high premium "re-calculating visual engine"
  useEffect(() => {
    setIsRendering(true);
    setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          return 100;
        }
        return prev + 10;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [activeProj, promptWeight, frameRate, colorGrade]);

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(activeProj.basePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamically calculate responsive visual metrics
  const calculatedStats = {
    renderTime: ((promptWeight * 0.05) + (frameRate * 0.03) + (colorGrade * 0.02) + (activeProj.metrics.complexity * 0.04)).toFixed(1),
    coherence: Math.min(100, Math.floor(activeProj.metrics.complexity * 0.8 + (100 - promptWeight) * 0.2 + 10)).toFixed(0),
    engagementMultiplier: Math.min(100, Math.floor(activeProj.metrics.engagement * 0.9 + (frameRate * 0.1) + (colorGrade * 0.05))).toFixed(0),
    tier: "A-Tier"
  };

  // Determine Quality Tier Badge based on stats
  let qualityTier = "A-Tier";
  const numScore = parseFloat(calculatedStats.engagementMultiplier);
  if (numScore >= 98) qualityTier = "S-Tier Ultra💎";
  else if (numScore >= 94) qualityTier = "A-Tier Premium⚡";
  else qualityTier = "B-Tier High🔥";

  return (
    <div className="p-6 sm:p-8 rounded-[32px] border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#08090d]/60 shadow-lg text-left text-neutral-800 dark:text-neutral-200 max-w-6xl mx-auto space-y-8 relative overflow-hidden backdrop-blur-xl">
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5f547]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-white/5 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 px-3 py-1 font-mono text-[10px] text-neutral-600 dark:text-neutral-300 font-bold uppercase tracking-wider mb-2">
            ✦ Interactive Prototype Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#121214] dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#c5f547]" />
            Signature visual studio & labs
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl">
            Fine-tune variables, tweak prompts, and observe real-time simulated AI rendering analytics & CGI post-production parameters.
          </p>
        </div>

        {/* Action Toggle controls */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={() => setCrtOverlay(!crtOverlay)}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
              crtOverlay 
                ? "bg-neutral-800 text-[#c5f547] border-[#121214] dark:bg-white dark:text-[#121214] dark:border-white" 
                : "bg-neutral-50 dark:bg-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-white/5 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            Scanlines: {crtOverlay ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Two-Column split interactive studio workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: PARAMETER CONFIGURATIONS (col-span-12 on Mobile, col-span-5/6 on Desktop) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Step 1: Template Project Selector */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-mono tracking-widest font-bold text-neutral-500 dark:text-neutral-400">
                1. Select Creative Engine Output Preset
              </label>
              <div className="grid grid-cols-1 gap-2">
                {PROJECT_TEMPLATES.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProj(proj)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group/item ${
                      activeProj.id === proj.id
                        ? "bg-[#121214] text-white border-[#121214] dark:bg-white dark:text-[#121214] dark:border-white shadow-md shadow-black/5"
                        : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-white/5 hover:border-neutral-300 dark:hover:border-[#c5f547]/30 text-neutral-800 dark:text-neutral-300"
                    }`}
                  >
                    <div className="flex items-center justify-between pointer-events-none relative z-10">
                      <div>
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          {proj.type === "video" && <Video className={`w-3.5 h-3.5 ${activeProj.id === proj.id ? "text-[#c5f547] dark:text-[#121214]" : "text-neutral-400"}`} />}
                          {proj.type === "cgi" && <Cpu className={`w-3.5 h-3.5 ${activeProj.id === proj.id ? "text-[#c5f547] dark:text-[#121214]" : "text-neutral-400"}`} />}
                          {proj.type === "web" && <Layout className={`w-3.5 h-3.5 ${activeProj.id === proj.id ? "text-[#c5f547] dark:text-[#121214]" : "text-neutral-400"}`} />}
                          {proj.name}
                        </div>
                        <p className={`text-[10px] font-medium mt-0.5 ${activeProj.id === proj.id ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-500"}`}>
                          Duration: {proj.duration}
                        </p>
                      </div>
                      <span className={`text-[10px] font-mono p-1 rounded-md font-bold ${activeProj.id === proj.id ? "bg-[#c5f547]/20 dark:bg-neutral-200" : "bg-neutral-200/50 dark:bg-neutral-800"}`}>
                        {proj.metrics.engagement}% Viral
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: System Dynamic Sliders */}
            <div className="space-y-4 bg-neutral-50/50 dark:bg-neutral-900/30 p-5 rounded-3xl border border-neutral-250/20 dark:border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-neutral-500 dark:text-neutral-400 block mb-2">
                2. Calibrate Generation Variables
              </span>
              
              {/* Slider 1: Prompt Precision Weight */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1 text-neutral-700 dark:text-zinc-300">
                    <Wand2 className="w-3.5 h-3.5 text-indigo-500" />
                    Prompt Precision Weight
                  </span>
                  <span className="font-mono text-[#121214] dark:text-[#c5f547]">{promptWeight}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={promptWeight}
                  onChange={(e) => setPromptWeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-[#121214] dark:accent-[#c5f547]"
                />
              </div>

              {/* Slider 2: Action Framerate (FPS) */}
              <div className="space-y-1.5 mt-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1 text-neutral-700 dark:text-zinc-300">
                    <Sliders className="w-3.5 h-3.5 text-lime-500" />
                    Detail Fidelity (CGI density)
                  </span>
                  <span className="font-mono text-[#121214] dark:text-[#c5f547]">{frameRate} fps</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="120"
                  value={frameRate}
                  onChange={(e) => setFrameRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-[#121214] dark:accent-[#c5f547]"
                />
              </div>

              {/* Slider 3: Dynamic Color Grading */}
              <div className="space-y-1.5 mt-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1 text-neutral-700 dark:text-zinc-300">
                    <Tv className="w-3.5 h-3.5 text-amber-500" />
                    Color Saturation & Grade
                  </span>
                  <span className="font-mono text-[#121214] dark:text-[#c5f547]">{colorGrade}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={colorGrade}
                  onChange={(e) => setColorGrade(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-[#121214] dark:accent-[#c5f547]"
                />
              </div>
            </div>

            {/* Step 3: Prompt Text Codebox Viewer with copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase font-mono tracking-widest font-bold text-neutral-500 dark:text-neutral-400">
                  3. Generated Prompt Script Output
                </label>
                <button
                  onClick={copyPromptToClipboard}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-[#c5f547] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy Script
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/5 rounded-2xl relative overflow-hidden text-left font-mono text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed max-h-[110px] overflow-y-auto no-scrollbar sm:no-scrollbar">
                <div className="absolute top-0 right-0 p-1.5 bg-neutral-200/40 dark:bg-neutral-800/40 border-l border-b border-neutral-200 dark:border-white/5 text-[9px] font-bold text-neutral-400 tracking-wider">
                  SYSTEM PROMPT
                </div>
                {activeProj.basePrompt}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: SIMULATED VIDEO/CGI OUTPUT VIEW (col-span-12 on Mobile, col-span-7 on Desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Main Visualizer Window Screen with CSS Frame */}
          <div className="relative w-full rounded-3xl border border-neutral-250/60 dark:border-white/10 overflow-hidden bg-neutral-900 flex flex-col justify-between p-4 sm:p-5 shadow-inner grow min-h-[300px] md:min-h-[350px]">
            
            {/* Visual Screen background rendered using custom Tailwind Gradients mimicking high cgi render frames */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${activeProj.gradient} transition-all duration-700 opacity-80`} />
            
            {/* Overlay Grid Pixels & Retro scanlines noise depending on toggle & choices */}
            {crtOverlay && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_100%)] pointer-events-none z-10" />
            )}
            {crtOverlay && (
              <div 
                className="absolute inset-0 opacity-[0.22] pointer-events-none z-10"
                style={{
                  backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
                  backgroundSize: "100% 4px"
                }}
              />
            )}

            {/* Beautiful visual layout on screen card */}
            <div className="flex items-center justify-between w-full relative z-20">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/10 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${isRendering ? "bg-amber-400 animate-ping" : "bg-green-400"}`} />
                {isRendering ? "RENDERING CORE..." : "STABLE PREVIEW"}
              </div>

              {/* Aspect Ratio Controllers inside Screen */}
              <div className="flex items-center gap-1 backdrop-blur-md bg-black/40 p-1 rounded-xl border border-white/10 text-white">
                <button
                  onClick={() => setAspectRatio("cinema")}
                  className={`px-3 py-1 text-[9px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                    aspectRatio === "cinema" ? "bg-white text-neutral-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  16:9 Cinema
                </button>
                <button
                  onClick={() => setAspectRatio("mobile")}
                  className={`px-3 py-1 text-[9px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                    aspectRatio === "mobile" ? "bg-white text-neutral-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  9:16 Short
                </button>
                <button
                  onClick={() => setAspectRatio("square")}
                  className={`px-3 py-1 text-[9px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                    aspectRatio === "square" ? "bg-white text-neutral-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  1:1 Square
                </button>
              </div>
            </div>

            {/* Aspect responsive mock player viewport frame */}
            <div className="grow flex items-center justify-center my-6 relative z-10">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${aspectRatio}-${activeProj.id}`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    filter: `saturate(${colorGrade / 50}) contrast(1.15)`,
                  }}
                  className={`rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center p-6 ${
                    aspectRatio === "cinema" ? "w-full max-w-sm aspect-[16/9]" : ""
                  } ${
                    aspectRatio === "mobile" ? "w-36 sm:w-40 aspect-[9/16]" : ""
                  } ${
                    aspectRatio === "square" ? "w-48 sm:w-56 aspect-square" : ""
                  }`}
                >
                  {/* Glowing background inside aspect layer */}
                  <div className="absolute inset-0 bg-black/35 backdrop-blur-[6px]" />
                  
                  {/* Vector design accents represent render details */}
                  <div className="absolute inset-2 border border-white/5 rounded-xl pointer-events-none" />
                  
                  {/* Simulation visuals */}
                  <div className="relative z-10 space-y-2">
                    <Video className="w-8 h-8 text-[#c5f547] mx-auto animate-pulse" />
                    <p className="text-white font-display text-[11px] sm:text-xs font-extrabold tracking-wide uppercase px-2">
                      {activeProj.name}
                    </p>
                    <span className="text-[9px] font-mono bg-[#c5f547] text-[#121214] font-extrabold rounded-full px-2 py-0.5 inline-block">
                      {frameRate} FPS PREVIEW
                    </span>
                  </div>

                  {/* Progressive rendering bar within frame */}
                  {isRendering && (
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-neutral-800">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${renderProgress}%` }}
                        className="h-full bg-[#c5f547]" 
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Bottom stats within visual viewport */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 w-full relative z-20 text-white">
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <span className="text-[8px] font-mono uppercase text-white/50 block">SIMULATION OUTPUT</span>
                  <span className="text-xs font-display font-extrabold text-[#c5f547]">{calculatedStats.renderTime}s render</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="text-left">
                  <span className="text-[8px] font-mono uppercase text-white/50 block">COHERENCE RATIO</span>
                  <span className="text-xs font-display font-extrabold text-white">{calculatedStats.coherence}% solid</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-white/70">VIRAL MULTIPLIER:</span>
                <span className="text-[10px] sm:text-xs font-mono font-extrabold text-[#121214] bg-[#c5f547] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Flame className="w-3 h-3 theme-yellow fill-[#121214]" />
                  <span>{calculatedStats.engagementMultiplier}% Boost</span>
                </span>
              </div>
            </div>

          </div>

          {/* Real-time analytical ranking feedback panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Box 1: Dynamic Tier Indicator */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-white/5 rounded-2xl text-left flex items-center gap-3.5">
              <div className="h-10 w-10 bg-indigo-500/10 text-indigo-500 flex items-center justify-center rounded-xl shrink-0">
                <AppWindow className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[8px] font-mono font-bold tracking-wider text-neutral-400 block uppercase">
                  Viral Tier Assessment
                </span>
                <span className="font-display text-xs font-extrabold text-[#121214] dark:text-white mt-0.5 block">
                  {qualityTier}
                </span>
              </div>
            </div>

            {/* Box 2: Engagement Multipliers */}
            <div className="p-4 bg-[#c5f547]/10 dark:bg-[#c5f547]/5 border border-[#121214]/10 dark:border-[#c5f547]/10 rounded-2xl text-left flex items-center gap-3.5">
              <div className="h-10 w-10 bg-[#c5f547]/20 text-[#121214] dark:text-[#c5f547] flex items-center justify-center rounded-xl shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-[8px] font-mono font-bold tracking-wider text-neutral-500 dark:text-neutral-400 block uppercase">
                  Growth Scale Coefficient
                </span>
                <span className="font-display text-xs font-extrabold text-[#121214] dark:text-[#c5f547] mt-0.5 block">
                  x{(Math.max(1, (1.2 + colorGrade / 150 + promptWeight / 200))).toFixed(2)} Velocity
                </span>
              </div>
            </div>

            {/* Box 3: Quick Restart Trigger */}
            <button
              onClick={() => {
                setPromptWeight(85);
                setFrameRate(60);
                setColorGrade(75);
              }}
              className="p-4 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-850 border border-neutral-250/50 dark:border-white/5 rounded-2xl text-left flex items-center gap-3.5 cursor-pointer group transition-colors"
            >
              <div className="h-10 w-10 bg-neutral-200/65 dark:bg-neutral-800 text-neutral-500 dark:text-zinc-400 group-hover:rotate-180 transition-transform duration-500 flex items-center justify-center rounded-xl shrink-0">
                <RefreshCcw className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[8.5px] font-mono font-bold tracking-wider text-neutral-400 block uppercase">
                  Reset Generator
                </span>
                <span className="font-display text-xs font-extrabold text-neutral-700 dark:text-neutral-200 mt-0.5 block group-hover:underline">
                  Default Parameters
                </span>
              </div>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
