import React, { useState, useEffect } from "react";
import { Clock, Navigation, CloudLightning, Sun, Compass, MapPin } from "lucide-react";

export function LocalZone() {
  const [pkTime, setPkTime] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [weatherCondition] = useState(() => {
    const hours = new Date().getHours();
    if (hours > 6 && hours < 18) {
      return { text: "Sunny & Bright", temp: "38°C", icon: <Sun className="w-5 h-5 text-amber-500 rotate-12 transition-transform duration-[4s]" /> };
    }
    return { text: "Warm Starry Night", temp: "29°C", icon: <CloudLightning className="w-5 h-5 text-indigo-500 animate-pulse" /> };
  });

  // Pakistan HQ coordinates
  const FSD_LAT = 31.5204;
  const FSD_LNG = 74.3587;

  useEffect(() => {
    const updateTime = () => {
      // Calculate PKT (UTC +5) manually or using toLocaleString
      const pktString = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      setPkTime(pktString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6400; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return Math.round(d);
  };

  const getUserCoordinates = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const dst = calculateDistance(latitude, longitude, FSD_LAT, FSD_LNG);
        setDistance(dst);
        setLocating(false);
      },
      (error) => {
        console.warn("Geolocation permission error:", error);
        setLocating(false);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-neutral-800 dark:text-neutral-100 text-left">
      {/* Clock tile */}
      <div className="p-5 rounded-[24px] border border-[#121214]/10 dark:border-white/10 bg-white dark:bg-neutral-900/40 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono text-neutral-500 dark:text-neutral-400 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
            Pakistan Local Time (PKT)
          </span>
          <h4 className="font-display font-extrabold text-2xl text-[#121214] dark:text-white tracking-wider mt-1.5">
            {pkTime || "Asia/Karachi"}
          </h4>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Live coordinates: 73.1350° E, 31.4504° N</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/25 flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" />
        </div>
      </div>

      {/* Geolocation Pakistan Distance Finder */}
      <div className="p-5 rounded-[24px] border border-[#121214]/10 dark:border-white/10 bg-white dark:bg-neutral-900/40 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono text-neutral-500 dark:text-neutral-400 font-bold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            Arslan Visuals Studio
          </span>
          <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-300 bg-[#c5f547]/10 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-white/10">{weatherCondition.temp} • {weatherCondition.text}</span>
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-4">
          <button
            onClick={getUserCoordinates}
            disabled={locating}
            className="px-4 py-2 text-[10px] font-mono font-bold uppercase bg-[#121214] dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-850 text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Navigation className="w-3 h-3 text-white spin-slow" />
            {locating ? "Locating..." : "Locate Me"}
          </button>

          <div className="min-w-0 text-right">
            {distance !== null ? (
              <p className="text-xs text-[#121214] dark:text-white truncate font-bold">
                We are <span className="font-mono bg-[#c5f547] text-[#121214] px-1 rounded">{distance} km</span> apart!
              </p>
            ) : (
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 italic">Click locate to calculate range</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
