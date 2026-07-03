import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GitBranch, RefreshCw, Zap, Award, Activity } from 'lucide-react';

interface DeploymentData {
  week: string;
  commits: number;
  deploys: number;
  speed: number; // compilation time in ms (lower is faster/optimistic)
  reliability: number; // build success rate %
}

const VELOCITY_DATA: DeploymentData[] = [
  { week: 'Wk 13', commits: 42, deploys: 8, speed: 1250, reliability: 96.8 },
  { week: 'Wk 14', commits: 68, deploys: 14, speed: 920, reliability: 98.2 },
  { week: 'Wk 15', commits: 95, deploys: 22, speed: 740, reliability: 99.1 },
  { week: 'Wk 16', commits: 135, deploys: 31, speed: 580, reliability: 99.5 },
  { week: 'Wk 17', commits: 182, deploys: 45, speed: 310, reliability: 100.0 }
];

export function DeploymentVelocityChart() {
  const [activeMetric, setActiveMetric] = useState<'commits' | 'deploys' | 'speed'>('commits');

  const getMetricColor = () => {
    switch (activeMetric) {
      case 'commits':
        return '#c5f547'; // Lime brand accent
      case 'deploys':
        return '#3b82f6'; // Tech Blue
      case 'speed':
        return '#ec4899'; // Perf Pink
    }
  };

  const getMetricLabel = () => {
    switch (activeMetric) {
      case 'commits': return 'Total Active Code Commits';
      case 'deploys': return 'Automated CI/CD Deploys';
      case 'speed': return 'HMR & Build Synthesis Latency';
    }
  };

  return (
    <div id="deployment-velocity-chart" className="w-full rounded-[28px] border border-neutral-200/80 bg-white p-5 sm:p-6 text-left shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[#c5f547]/50 dark:hover:shadow-[0_0_20px_rgba(197,245,71,0.05)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[9px] text-neutral-600 font-bold uppercase tracking-wider dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
            ✦ Git Workflows & Deployment Diagnostics
          </span>
          <h3 className="text-xl font-display font-black text-[#121214] dark:text-white mt-2 uppercase tracking-tight flex items-center gap-1.5">
            Deployment Velocity Engine <Activity className="w-4 h-4 text-[#c5f547] animate-pulse" />
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Analyzing compile metrics, automated code merges, and Docker container delivery speeds under Arslan’s system.
          </p>
        </div>

        {/* Metric Switcher Tab controls */}
        <div className="flex flex-wrap gap-1 bg-neutral-100 p-1 rounded-xl dark:bg-white/5">
          <button
            onClick={() => setActiveMetric('commits')}
            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              activeMetric === 'commits'
                ? 'bg-white text-[#121214] shadow-sm dark:bg-neutral-900 dark:text-[#c5f547]'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Commits
          </button>
          <button
            onClick={() => setActiveMetric('deploys')}
            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              activeMetric === 'deploys'
                ? 'bg-white text-[#121214] shadow-sm dark:bg-neutral-900 dark:text-[#c5f547]'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Deploys
          </button>
          <button
            onClick={() => setActiveMetric('speed')}
            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              activeMetric === 'speed'
                ? 'bg-white text-[#121214] shadow-sm dark:bg-neutral-900 dark:text-[#c5f547]'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Build Speeds
          </button>
        </div>
      </div>

      {/* Grid Summary Row metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-3.5 rounded-2xl border border-neutral-150 bg-neutral-50/50 dark:border-white/5 dark:bg-white/5 text-left">
          <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block font-bold">TOTAL COMMITS</span>
          <span className="text-base sm:text-lg font-display font-black text-[#c5f547] block mt-0.5">182 Merges</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-neutral-150 bg-neutral-50/50 dark:border-white/5 dark:bg-white/5 text-left">
          <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block font-bold">PRODUCTION CLOUD</span>
          <span className="text-base sm:text-lg font-display font-black text-[#3b82f6] block mt-0.5">45 Deployed</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-neutral-150 bg-neutral-50/50 dark:border-white/5 dark:bg-white/5 text-left">
          <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block font-bold">COMPILE SPEED</span>
          <span className="text-base sm:text-lg font-display font-black text-[#ec4899] block mt-0.5">310ms (Vite)</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-[#c5f547]/30 bg-[#c5f547]/5 dark:border-[#c5f547]/20 dark:bg-[#c5f547]/5 text-left">
          <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block font-bold">BUILD RELIABILITY</span>
          <span className="text-base sm:text-lg font-display font-black text-[#121214] dark:text-[#c5f547] block mt-0.5">100.0% Success</span>
        </div>
      </div>

      <div className="h-[280px] w-full mt-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={VELOCITY_DATA}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.4} />
                <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.12)" />
            <XAxis 
              dataKey="week" 
              stroke="rgba(128,128,128,0.5)" 
              fontSize={11}
              fontFamily="Space Grotesk"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="rgba(128,128,128,0.5)" 
              fontSize={10}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => {
                if (activeMetric === 'speed') {
                  return `${val}ms`;
                }
                return val.toString();
              }}
              dx={-5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as DeploymentData;
                  return (
                    <div className="bg-neutral-900 border border-white/10 p-3 rounded-xl shadow-xl text-left backdrop-blur-md">
                      <p className="font-display text-xs font-bold text-[#c5f547] uppercase tracking-wider mb-2 font-mono">
                        Sprint Period: {data.week}
                      </p>
                      <div className="space-y-1 font-mono text-[10px] text-white">
                        <div className="flex justify-between gap-6">
                          <span className="text-neutral-400">TOTAL COMMITS:</span>
                          <span className="font-extrabold text-[#c5f547]">{data.commits}</span>
                        </div>
                        <div className="flex justify-between gap-6">
                          <span className="text-neutral-400">PROD DEPLOYS:</span>
                          <span className="font-extrabold text-[#3b82f6]">{data.deploys} Active</span>
                        </div>
                        <div className="flex justify-between gap-6">
                          <span className="text-neutral-400">COMPILE VALUE:</span>
                          <span className="font-extrabold text-[#ec4899]">{data.speed}ms</span>
                        </div>
                        <div className="flex justify-between gap-6">
                          <span className="text-neutral-400">SUCCESS RATE:</span>
                          <span className="font-extrabold text-emerald-400">{data.reliability}%</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={getMetricColor()}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorVelocity)"
              activeDot={{ r: 6, strokeWidth: 0, fill: getMetricColor() }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-neutral-100 dark:border-white/5 pt-4 mt-6 gap-3">
        <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono tracking-wide">
          <Award className="w-3.5 h-3.5 text-[#c5f547]" />
          <span>Showing verified Git actions: Synchronized with Workspace V2</span>
        </div>
        <div className="text-[10px] font-mono tracking-widest text-[#c5f547] bg-[#c5f547]/5 border border-[#c5f547]/20 px-2 py-0.5 rounded uppercase font-bold flex items-center gap-1">
          <span>{getMetricLabel()}</span>
        </div>
      </div>
    </div>
  );
}
