import React, { useState, useEffect } from "react";
import { Sparkles, Tv, Activity, Music, RefreshCw } from "lucide-react";

interface VibeVisualizerProps {
  onOverlayChange: (overlay: string) => void;
  activeOverlay: string;
}

export function VibeVisualizer({ onOverlayChange, activeOverlay }: VibeVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [bars, setBars] = useState<number[]>(Array.from({ length: 15 }, () => Math.floor(Math.random() * 32) + 5));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBars(Array.from({ length: 15 }, () => Math.floor(Math.random() * 35) + 5));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const overlays = [
    { id: "clean", name: "Modern Glass", desc: "Sleek, transparent, high-contrast look" },
    { id: "scanlines", name: "Retro CRT", desc: "Analogue style 35mm formats CRT noise" },
    { id: "pixel", name: "Matrix Grid", desc: "Mathematical grid showcasing AI tech code" },
    { id: "grain", name: "Filmic Noise", desc: "Warm filmic grains styled around camera work" }
  ];

  return (
    <div className="p-5 rounded-[24px] border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 shadow-sm text-left flex flex-col justify-between h-full text-neutral-800 dark:text-neutral-200">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="font-display text-sm font-extrabold text-[#121214] dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#121214] dark:text-[#121214] bg-[#c5f547] p-0.5 rounded rotate-90" />
            Vibe Visualizer & Overlays
          </h3>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-lg border border-neutral-200 dark:border-white/10 transition-all cursor-pointer text-left block"
          >
            {isPlaying ? "Pause Beat" : "Vibe Beat"}
          </button>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
          Transform the website's digital noise structure dynamically with interactive CRT rendering styles.
        </p>

        {/* Beats Visualizer bar indicators */}
        <div className="h-12 flex items-end gap-[4px] bg-neutral-50 dark:bg-[#121214] p-3 rounded-xl border border-neutral-200 dark:border-white/10 mt-4 justify-around">
          {bars.map((height, i) => (
            <div
              key={i}
              style={{ height: `${height}px` }}
              className="w-2 rounded-full bg-[#121214] dark:bg-[#c5f547] transition-all duration-100"
            />
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold block">Dynamic View Glass Overlays:</span>
        <div className="grid grid-cols-2 gap-2">
          {overlays.map((ov) => (
            <button
              key={ov.id}
              onClick={() => onOverlayChange(ov.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeOverlay === ov.id
                  ? "bg-[#c5f547]/20 border-[#121214] dark:border-[#c5f547] text-[#121214] dark:text-[#c5f547] shadow-sm"
                  : "bg-neutral-50 dark:bg-neutral-850 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-[#121214] dark:hover:text-white"
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1">
                <Tv className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 shrink-0" />
                {ov.name}
              </div>
              <p className="text-[9px] text-[#121214]/60 dark:text-zinc-400 font-medium mt-0.5 line-clamp-1">{ov.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
