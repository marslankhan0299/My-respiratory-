import React, { useState, useEffect } from "react";
import { GALLERY_ITEMS, GalleryItem } from "../galleryData";
import { Search, Image as ImageIcon, Sliders, X, Heart, Eye, ArrowDown, Sparkles, Filter, Smile, Edit3, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function GalleryMosaic() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [filter, setFilter] = useState({
    category: "All",
    search: "",
    activeTag: "",
    imagePreset: "normal" as "normal" | "grayscale" | "retro" | "liquid" | "cyber" | "sunset"
  });

  // Local persistence of heart count and personal notes edit per image id
  const [stats, setStats] = useState<Record<string, { likes: number; description: string; liked: boolean }>>(() => {
    const saved = localStorage.getItem("arslan-gallery-stats-v2");
    if (saved) {
      try { return JSON.parse(saved); } catch (_) { return {}; }
    }
    return {};
  });

  // Selected image for the premium lightbox
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [fullScreenItem, setFullScreenItem] = useState<GalleryItem | null>(null);
  const [isEditingCap, setIsEditingCap] = useState(false);
  const [tempCap, setTempCap] = useState("");

  const categories = ["All", ...Array.from(new Set(GALLERY_ITEMS.map((item) => item.category)))];
  const allTags = Array.from(new Set(GALLERY_ITEMS.flatMap((item) => item.tags)));

  const [isGalleryLoading, setIsGalleryLoading] = useState(true);

  useEffect(() => {
    setIsGalleryLoading(true);
    const timer = setTimeout(() => {
      setIsGalleryLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [filter.category, filter.activeTag]);

  useEffect(() => {
    localStorage.setItem("arslan-gallery-stats-v2", JSON.stringify(stats));
  }, [stats]);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setStats((prev) => {
      const current = prev[id] || { likes: Math.floor(Math.random() * 50) + 12, description: "", liked: false };
      return {
        ...prev,
        [id]: {
          ...current,
          liked: !current.liked,
          likes: current.liked ? current.likes - 1 : current.likes + 1,
        }
      };
    });
  };

  const handleUpdateDescription = (id: string, text: string) => {
    setStats((prev) => {
      const current = prev[id] || { likes: 15, description: "", liked: false };
      return {
        ...prev,
        [id]: { ...current, description: text }
      };
    });
    setIsEditingCap(false);
  };

  // Filter logic
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCategory = filter.category === "All" || item.category === filter.category;
    const matchesTag = !filter.activeTag || item.tags.includes(filter.activeTag);
    const matchesSearch = !filter.search || 
      item.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.description.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(filter.search.toLowerCase()));

    return matchesCategory && matchesTag && matchesSearch;
  });

  // Class selection based on chosen liquid preset values
  const getPresetClass = (preset: typeof filter.imagePreset) => {
    switch (preset) {
      case "grayscale":
        return "grayscale contrast-110 saturate-0";
      case "retro":
        return "sepia saturate-150 contrast-85 brightness-95 filter hue-rotate-15";
      case "liquid":
        return "contrast-125 saturate-125 brightness-105 filter hue-rotate-[-10deg] blur-[0.3px]";
      case "cyber":
        return "saturate-200 contrast-110 filter hue-rotate-[180deg] invert-[3%] brightness-105";
      case "sunset":
        return "saturate-150 contrast-95 brightness-100 sepia-[20%] accent-rose-500 filter hue-rotate-[-30deg]";
      default:
        return "normal-case";
    }
  };

  return (
    <div className="space-y-6">
      {/* Visual Controls Panel */}
      <div className="p-5 rounded-[24px] border border-[#121214]/10 dark:border-white/10 bg-white dark:bg-[#151518]/60 shadow-sm text-neutral-800 dark:text-neutral-100">
        <h3 className="font-display text-sm font-extrabold text-[#121214] dark:text-white flex items-center gap-2 mb-4">
          <Sliders className="w-4 h-4 text-[#c5f547] bg-[#121214] dark:bg-neutral-800 p-0.5 rounded" />
          Interactive Exhibition Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-4 relative">
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              placeholder="Search art gallery..."
              className="w-full bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-neutral-700 focus:border-[#121214] dark:focus:border-[#c5f547] rounded-xl py-2.5 pl-9 pr-4 text-xs text-[#121214] dark:text-white placeholder-neutral-400 outline-none transition-all font-medium"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3.5" />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono text-neutral-500 dark:text-neutral-400 font-bold">Class:</span>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="flex-1 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 focus:border-[#121214] dark:focus:border-[#c5f547] rounded-xl py-2.5 px-3 text-xs text-[#121214] dark:text-white outline-none cursor-pointer font-semibold"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 font-semibold">
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Aesthetic Render Presets */}
          <div className="md:col-span-5 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            <span className="text-[10px] uppercase font-mono text-neutral-500 dark:text-neutral-400 font-bold shrink-0">Preset Filter:</span>
            <div className="flex gap-1">
              {(["normal", "grayscale", "retro", "liquid", "cyber", "sunset"] as const).map((pr) => (
                <button
                  key={pr}
                  onClick={() => setFilter({ ...filter, imagePreset: pr })}
                  className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border transition-all capitalize cursor-pointer shrink-0 ${
                    filter.imagePreset === pr
                      ? "bg-[#121214] dark:bg-[#c5f547] border-[#121214] dark:border-transparent text-white dark:text-[#121214] shadow-sm"
                      : "bg-neutral-50 dark:bg-neutral-850 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {pr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tags Row */}
        {filter.activeTag && (
          <div className="mt-3 flex items-center gap-1.5 bg-[#c5f547]/20 border border-[#121214]/10 dark:border-white/10 px-3 py-1.5 rounded-xl w-fit">
            <span className="text-[10.5px] text-[#121214] dark:text-[#c5f547] font-medium animate-pulse">Filtering tag: <strong className="font-mono bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded">#{filter.activeTag}</strong></span>
            <button
              onClick={() => setFilter({ ...filter, activeTag: "" })}
              className="p-0.5 text-[#121214] dark:text-[#c5f547] hover:text-red-500 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Grid Portfolio */}
      {isGalleryLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 select-none">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="relative rounded-[20px] overflow-hidden border border-neutral-200/50 dark:border-white/5 bg-white dark:bg-[#151518]/60 flex flex-col min-h-[200px] sm:min-h-[260px] animate-pulse"
            >
              <div className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-850/60 w-full relative overflow-hidden">
                <div className="absolute inset-0 shimmer-bg opacity-70" />
                
                {/* Badge loader placeholder */}
                <div className="absolute top-3 left-3">
                  <div className="h-4 bg-neutral-200/80 dark:bg-neutral-800 rounded-full w-14" />
                </div>
                
                {/* Buttons loader placeholder */}
                <div className="absolute top-3 right-3 flex gap-1">
                  <div className="h-7 w-7 bg-neutral-200/80 dark:bg-neutral-800 rounded-full" />
                  <div className="h-7 w-7 bg-neutral-200/80 dark:bg-neutral-800 rounded-full" />
                </div>
                
                {/* Title & subtitle loader placeholder */}
                <div className="absolute bottom-3 inset-x-3 space-y-1.5 z-10 text-left">
                  <div className="h-3.5 bg-neutral-200/90 dark:bg-neutral-800 rounded w-2/3" />
                  <div className="h-2.5 bg-neutral-200/90 dark:bg-neutral-800 rounded w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item) => {
            const itemStat = stats[item.id] || { likes: Math.floor(Math.random() * 40) + 12, description: "", liked: false };
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setTempCap(itemStat.description || item.description);
                }}
                className="group relative rounded-[20px] overflow-hidden border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#151518]/60 flex flex-col cursor-zoom-in group transition-all duration-300 hover:scale-[1.015] hover:border-[#121214] dark:hover:border-[#c5f547] hover:shadow-md"
              >
                {/* Image box */}
                <div className="aspect-[4/5] overflow-hidden relative bg-neutral-100 w-full">
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 ${getPresetClass(
                      filter.imagePreset
                    )}`}
                  />
                  
                  {/* Visual Glaze overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-100 transition-opacity duration-300" />
  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md text-[#121214] dark:text-zinc-200 border border-[#121214]/10 dark:border-white/10 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
  
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                      onClick={(e) => toggleLike(item.id, e)}
                      className={`p-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                        itemStat.liked
                          ? "bg-[#ff2e4c] border-[#ff2e4c] text-white scale-110 shadow-sm"
                          : "bg-black/50 border-white/10 text-white/90 hover:bg-black/70 hover:text-white"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${itemStat.liked ? "fill-white text-white" : ""}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullScreenItem(item);
                      }}
                      className="p-1.5 rounded-full backdrop-blur-md border bg-black/50 border-white/10 text-white/90 hover:bg-black/70 hover:text-[#c5f547] hover:border-[#c5f547]/20 transition-all cursor-pointer hover:scale-110"
                      title="Immersive Full-Screen Lightbox"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
  
                  {/* Details layout at bottom of thumb */}
                  <div className="absolute bottom-3 inset-x-3 text-left">
                    <h4 className="font-display text-xs font-extrabold text-white truncate shadow-sm">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-zinc-300 line-clamp-1 mt-0.5 font-medium">
                      {itemStat.description || item.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.tags.map(t => (
                        <button
                          key={t}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilter({ ...filter, activeTag: t });
                          }}
                          className="text-[8px] font-mono font-bold bg-[#c5f547] hover:bg-[#c5f547]/90 text-[#121214] px-1.5 py-0.5 rounded"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
  
          {filteredItems.length === 0 && (
            <div className="py-20 text-center col-span-full border border-dashed border-neutral-300 dark:border-neutral-700 rounded-[24px] bg-white dark:bg-neutral-900/40">
              <ImageIcon className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <p className="text-sm font-display font-bold text-neutral-600">No artwork match your filtration presets.</p>
              <button
                onClick={() => setFilter({ category: "All", search: "", activeTag: "", imagePreset: "normal" })}
                className="mt-3 text-xs text-[#121214] font-mono font-bold hover:underline inline-flex items-center gap-1 bg-[#c5f547] px-3 py-1.5 rounded-xl border border-[#121214]/15"
              >
                <Filter className="w-3.5 h-3.5" />
                Reset filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Lightbox / Art Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121214]/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#FBFAF7] dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row text-neutral-800 dark:text-neutral-150">
            
            {/* Close button */}
            <button
              onClick={() => { setSelectedItem(null); setIsEditingCap(false); }}
              className="absolute top-4 right-4 z-10 p-2.5 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-white/10 text-[#121214] dark:text-white rounded-full transition-all cursor-pointer shadow-sm animate-pulse"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Zone */}
            <div 
              onClick={() => setFullScreenItem(selectedItem)}
              className="flex-1 max-h-[50vh] md:max-h-full bg-neutral-100 dark:bg-neutral-950 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-neutral-200 dark:border-white/10 cursor-zoom-in group/img"
              title="Click to expand to full screen"
            >
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className={`max-h-full max-w-full object-contain transition-transform duration-500 group-hover/img:scale-[1.03] ${getPresetClass(filter.imagePreset)}`}
              />
              {/* Expand to Full Screen hover tag */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-[#121214] text-white border border-white/20 font-mono font-bold text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 transform translate-y-3 group-hover/img:translate-y-0 transition-all duration-300">
                  <Maximize2 className="w-3.5 h-3.5 text-[#c5f547]" />
                  Full Screen Preview
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="text-[10px] font-mono bg-black text-white px-3 py-1 rounded-full">
                  Render: {filter.imagePreset}
                </span>
              </div>
            </div>

            {/* Right Information & Custom Comments column */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-white dark:bg-[#151518]/90 text-left overflow-y-auto max-h-[40vh] md:max-h-full scrollbar-thin">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-[#121214] dark:text-white tracking-tight mt-1 flex items-center gap-1.5">
                    {selectedItem.title}
                    <Sparkles className="w-4.5 h-4.5 text-yellow-500" />
                  </h3>
                </div>

                {/* Editable Personalised Caption or Note */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono text-neutral-500 dark:text-neutral-400 font-bold flex items-center gap-1">
                      <Edit3 className="w-3 h-3" /> Note Board:
                    </span>
                    <button
                      onClick={() => setIsEditingCap(!isEditingCap)}
                      className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline transition-colors cursor-pointer inline-flex items-center"
                    >
                      {isEditingCap ? "Cancel" : "Edit Note"}
                    </button>
                  </div>

                  {isEditingCap ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempCap}
                        onChange={(e) => setTempCap(e.target.value)}
                        className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-white/10 rounded-xl p-3 text-xs text-[#121214] dark:text-white placeholder-neutral-400 focus:border-[#121214] dark:focus:border-[#c5f547] outline-none"
                        rows={3}
                      />
                      <button
                        onClick={() => handleUpdateDescription(selectedItem.id, tempCap)}
                        className="w-full py-2 bg-[#121214] dark:bg-[#c5f547] hover:bg-neutral-800 dark:hover:bg-[#c5f547]/90 text-white dark:text-[#121214] rounded-xl text-[10px] uppercase font-mono tracking-wide font-extrabold transition-all"
                      >
                        Save Note
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {stats[selectedItem.id]?.description || selectedItem.description}
                    </p>
                  )}
                </div>

                {/* Artist Tags box */}
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold block mb-1.5">Artwork Metadata:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedItem.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200 px-2 py-0.5 rounded-lg"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => toggleLike(selectedItem.id)}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 border transition-all text-xs font-bold cursor-pointer ${
                      stats[selectedItem.id]?.liked
                        ? "bg-rose-50 border-rose-500 text-rose-600"
                        : "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${stats[selectedItem.id]?.liked ? "fill-current" : ""}`} />
                    {stats[selectedItem.id]?.liked ? "Liked!" : "Heart Art"}
                    <span className="text-[10px] opacity-70">
                      ({stats[selectedItem.id]?.likes || 24})
                    </span>
                  </button>

                  <a
                    href={selectedItem.url}
                    target="_blank"
                    download={`arslan_visuals_${selectedItem.id}.jpg`}
                    referrerPolicy="no-referrer"
                    className="p-3 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-800 rounded-xl transition-all inline-flex items-center justify-center shrink-0"
                    title="Download High Res Assets"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Action direct message button */}
              <div className="mt-8 pt-4 border-t border-neutral-200 space-y-2">
                <span className="text-[10.5px] text-neutral-500 text-left block">
                  Inspired by this visual project? Commission Arslan for a custom setup.
                </span>
                <a
                  href={`https://wa.me/93748845221?text=Assalam-o-Alaikum%20Arslan!%20I%2520saw%2520your%2520awesome%2520artwork%2520%2522${encodeURIComponent(
                    selectedItem.title
                  )}%2522%2520on%2520your%2520digital%2520exhibit%252520portfolio%2520and%2520want%2520to%252520collaborate%2520on%2520a%2520similar%2520project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#121214] hover:bg-neutral-800 border border-[#121214] text-white rounded-xl font-bold tracking-tight text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Smile className="w-4 h-4 text-[#c5f547]" />
                  Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Immersive Full-Screen Light-box Preview */}
      <AnimatePresence>
        {fullScreenItem && (() => {
          const currentIndex = filteredItems.findIndex(x => x.id === fullScreenItem.id);
          const itemStat = stats[fullScreenItem.id] || { likes: 0, description: "", liked: false };
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 select-none"
            >
              {/* Top Bar controls */}
              <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between text-white/95">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5f547] font-bold">
                    {fullScreenItem.category}
                  </span>
                  <h4 className="text-sm font-sans font-extrabold tracking-tight">
                    {fullScreenItem.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(fullScreenItem.id)}
                    className={`p-2.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                      itemStat.liked
                        ? "bg-[#ff2e4c] border-[#ff2e4c] text-white scale-105"
                        : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${itemStat.liked ? "fill-white" : ""}`} />
                    <span className="text-[10px] font-mono font-bold">({itemStat.likes})</span>
                  </button>
                  <a
                    href={fullScreenItem.url}
                    target="_blank"
                    download={`fullscreen_${fullScreenItem.id}.jpg`}
                    referrerPolicy="no-referrer"
                    className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full transition-all flex items-center justify-center cursor-pointer"
                    title="Download Full Resolution Asset"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setFullScreenItem(null)}
                    className="p-2.5 bg-[#ff2e4c] hover:bg-[#ff1536] border border-[#ff2e4c]/20 text-white rounded-full transition-all flex items-center justify-center cursor-pointer ml-2 shadow-[0_0_15px_rgba(255,46,76,0.3)]"
                    title="Close Full Screen"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Prev icon indicator */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                  setFullScreenItem(filteredItems[prevIdx]);
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white rounded-full transition-all flex items-center justify-center cursor-pointer z-50 group hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 group-hover:text-[#c5f547] transition-colors" />
              </button>

              {/* Image box container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="relative max-w-full max-h-[80vh] flex items-center justify-center overflow-hidden"
              >
                <img
                  src={fullScreenItem.url}
                  alt={fullScreenItem.title}
                  referrerPolicy="no-referrer"
                  className={`max-w-[95vw] max-h-[75vh] md:max-h-[82vh] object-contain rounded-2xl shadow-2xl transition-all duration-700 ${getPresetClass(filter.imagePreset)}`}
                />
              </motion.div>

              {/* Next icon indicator */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const nextIdx = (currentIndex + 1) % filteredItems.length;
                  setFullScreenItem(filteredItems[nextIdx]);
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white rounded-full transition-all flex items-center justify-center cursor-pointer z-50 group hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 group-hover:text-[#c5f547] transition-colors" />
              </button>

              {/* Bottom detail status overlay */}
              <div className="absolute bottom-6 text-center text-white/50 font-mono text-[10px] space-y-1.5 z-40">
                <p className="text-neutral-400 font-sans font-medium text-xs px-6 max-w-xl mx-auto">
                  {itemStat.description || fullScreenItem.description}
                </p>
                <p className="tracking-widest font-bold">
                  IMAGE {currentIndex + 1} OF {filteredItems.length} | USE ARROW CONTROLS OR CLICK X TO GO BACK
                </p>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
