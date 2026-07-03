import React, { useState } from "react";
import { USER_INFO } from "../galleryData";
import { Cpu, Terminal, Video, Palette, Code, Sparkles, Sliders, Briefcase, Calculator, Clock, HelpCircle, ChevronDown, ChevronUp, Megaphone, Lightbulb } from "lucide-react";

export function SkillsRadar() {
  const [isToolsExpanded, setIsToolsExpanded] = useState(false);
  const [attributes, setAttributes] = useState({
    reactNext: 96,
    nodeServer: 92,
    apiAI: 88,
    uiPolish: 94
  });

  const [estimator, setEstimator] = useState({
    projectType: "Full Stack Web App (React + Express)" as "Next.js Cinematic Landing Page" | "Node.js AI Bot Integration" | "Full Stack Web App (React + Express)" | "High-Interaction CSS Canvas Layout",
    complexity: "High-Tier" as "Basic" | "Medium" | "High-Tier"
  });

  const handleSliderChange = (attr: keyof typeof attributes, value: number) => {
    setAttributes((prev) => ({
      ...prev,
      [attr]: value
    }));
  };

  const getEstimatedCostAndTimeline = () => {
    let baseDays = 4;
    let baseCost = 150;

    switch (estimator.projectType) {
      case "Next.js Cinematic Landing Page":
        baseDays = 3;
        baseCost = 160;
        break;
      case "Node.js AI Bot Integration":
        baseDays = 5;
        baseCost = 240;
        break;
      case "Full Stack Web App (React + Express)":
        baseDays = 7;
        baseCost = 380;
        break;
      case "High-Interaction CSS Canvas Layout":
        baseDays = 3;
        baseCost = 130;
        break;
    }

    // Complexity multiplier
    let mult = 1;
    if (estimator.complexity === "Medium") mult = 1.35;
    if (estimator.complexity === "High-Tier") mult = 1.8;

    // Adjust based on slider attributes
    const totalSlidersPerformance = (attributes.reactNext + attributes.nodeServer + attributes.apiAI + attributes.uiPolish) / 400;
    
    const finalCost = Math.round(baseCost * mult * (0.8 + totalSlidersPerformance * 0.4));
    const finalDays = Math.max(1, Math.round(baseDays * mult * (0.9 - (attributes.reactNext / 1000))));

    return { cost: finalCost, days: finalDays };
  };

  const { cost, days } = getEstimatedCostAndTimeline();

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
      case "Code":
        return <Code className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
      case "Video":
        return <Video className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
      case "Terminal":
        return <Terminal className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
      case "Palette":
        return <Palette className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
      case "Megaphone":
        return <Megaphone className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
      case "Lightbulb":
        return <Lightbulb className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
      default:
        return <Sparkles className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#121214] dark:text-neutral-200 text-left">
      {/* Interactive Sliders list & Skills Gauge */}
      <div className="p-5 rounded-[24px] border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-display text-sm font-extrabold flex items-center gap-2 mb-1.5 text-[#121214] dark:text-white">
            <Sliders className="w-4 h-4 text-[#121214] dark:text-neutral-200" />
            Dynamic Skill Metrics & Tuner
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            Tune Arslan's development parameter bars to dynamically simulate launch stats & project estimates below!
          </p>

          <div className="space-y-4.5 mt-5">
            {/* Slider 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <span>React & Next.js Performance</span>
                <span className="font-mono text-black dark:text-white font-extrabold">{attributes.reactNext}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={attributes.reactNext}
                onChange={(e) => handleSliderChange("reactNext", parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#121214] dark:accent-[#c5f547]"
              />
            </div>

            {/* Slider 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <span>Node.js & Server Scale</span>
                <span className="font-mono text-black dark:text-white font-extrabold">{attributes.nodeServer}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={attributes.nodeServer}
                onChange={(e) => handleSliderChange("nodeServer", parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#121214] dark:accent-[#c5f547]"
              />
            </div>

            {/* Slider 3 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <span>API & AI Agent Pipeline</span>
                <span className="font-mono text-black dark:text-white font-extrabold">{attributes.apiAI}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={attributes.apiAI}
                onChange={(e) => handleSliderChange("apiAI", parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#121214] dark:accent-[#c5f547]"
              />
            </div>

            {/* Slider 4 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <span>UI/UX Animation & CSS Polish</span>
                <span className="font-mono text-black dark:text-white font-extrabold">{attributes.uiPolish}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={attributes.uiPolish}
                onChange={(e) => handleSliderChange("uiPolish", parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#121214] dark:accent-[#c5f547]"
              />
            </div>
          </div>
        </div>

        {/* Skill Pills preview */}
        <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/10">
          <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold block mb-2">Original Skill Toolkit:</span>
          <div className="grid grid-cols-2 gap-2">
            {USER_INFO.skills.slice(0, 4).map((sk) => (
              <div key={sk.name} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 flex items-center gap-2">
                <div className="p-1 bg-[#c5f547]/20 border border-[#121214]/10 dark:border-white/10 rounded-lg">
                  {getSkillIcon(sk.icon)}
                </div>
                <div>
                  <div className="text-[11px] font-extrabold text-black dark:text-white truncate max-w-[100px]">{sk.name}</div>
                  <div className="text-[9px] text-neutral-500 dark:text-neutral-400 font-mono font-semibold">Level: {sk.level}%</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
              isToolsExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-2 gap-2 pt-2">
                {USER_INFO.skills.slice(4).map((sk) => (
                  <div key={sk.name} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 flex items-center gap-2">
                    <div className="p-1 bg-[#c5f547]/20 border border-[#121214]/10 dark:border-white/10 rounded-lg">
                      {getSkillIcon(sk.icon)}
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-black dark:text-white truncate max-w-[100px]">{sk.name}</div>
                      <div className="text-[9px] text-neutral-500 dark:text-neutral-400 font-mono font-semibold">Level: {sk.level}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsToolsExpanded(!isToolsExpanded)}
            className="w-full mt-3 py-2 bg-neutral-50 dark:bg-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-white/10 rounded-xl text-[10px] font-extrabold font-mono uppercase tracking-widest text-[#121214] dark:text-white transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            {isToolsExpanded ? (
              <>
                Show Less <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                View All Tools <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Project Estimator Tool */}
      <div className="p-5 rounded-[24px] border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-display text-sm font-extrabold flex items-center gap-2 mb-1.5 text-[#121214] dark:text-white">
            <Calculator className="w-4 h-4 text-[#121214] dark:text-neutral-200" />
            Vibe Project Quote Estimator
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            Select a project archetype to estimate high-quality delivery parameters by Arslan!
          </p>

          <div className="space-y-3.5 mt-5">
            {/* Option 1: project archetype */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 font-bold block">Work Class Idea:</label>
              <select
                value={estimator.projectType}
                onChange={(e) => setEstimator({ ...estimator, projectType: e.target.value as any })}
                className="w-full bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121214] dark:text-white font-bold outline-none cursor-pointer"
              >
                <option value="Next.js Cinematic Landing Page">Next.js Cinematic Landing Page</option>
                <option value="Node.js AI Bot Integration">Node.js AI Bot Integration</option>
                <option value="Full Stack Web App (React + Express)">Full Stack Web App (React + Express)</option>
                <option value="High-Interaction CSS Canvas Layout">High-Interaction CSS Canvas Layout</option>
              </select>
            </div>

            {/* Option 2: scale complexity */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 font-bold block">Art Complexity Level:</label>
              <div className="grid grid-cols-3 gap-1 bg-neutral-50 dark:bg-neutral-850 p-1.5 rounded-xl border border-neutral-200 dark:border-white/10">
                {(["Basic", "Medium", "High-Tier"] as const).map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setEstimator({ ...estimator, complexity: lv })}
                    className={`text-[10px] py-2 rounded-lg capitalize font-mono font-extrabold transition-all cursor-pointer ${
                      estimator.complexity === lv
                        ? "bg-[#121214] dark:bg-[#c5f547] text-white dark:text-[#121214] shadow-sm"
                        : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                    }`}
                  >
                    {lv}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic quote output cards */}
        <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-xl border border-neutral-200 dark:border-white/10 space-y-3 mt-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-500 dark:text-neutral-400 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" /> Expected Delivery:
            </span>
            <span className="font-mono text-[#121214] dark:text-[#c5f547] font-extrabold text-xs bg-[#c5f547]/30 border border-[#121214]/10 dark:border-white/10 px-2.5 py-1 rounded-md">
              ~ {days} Business Days
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-500 dark:text-neutral-400 font-bold flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" /> Cost Benchmark:
            </span>
            <span className="font-mono text-[#121214] dark:text-zinc-100 font-extrabold text-xs bg-[#121214]/5 dark:bg-white/5 border border-[#121214]/15 dark:border-white/10 px-2.5 py-1 rounded-md">
              PKR {cost * 280} (~${cost})
            </span>
          </div>

          <p className="text-[9px] text-neutral-400 dark:text-neutral-500 font-semibold text-center leading-normal">
            *This is an automated simulation estimate based on Arslan's typical workflow values. Click "Message on WhatsApp" inside socials to finalize custom project briefs!
          </p>
        </div>
      </div>
    </div>
  );
}
