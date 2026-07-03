import React, { useState, useEffect } from "react";
import { StickyNote } from "../types";
import { MessageSquare, Plus, Trash2, Heart, Award, Check } from "lucide-react";

export function GuestbookBoard() {
  const [notes, setNotes] = useState<StickyNote[]>(() => {
    const saved = localStorage.getItem("arslan-guestbook-notes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {
        return [];
      }
    }
    // Default mock sticky notes of fans to keep the board beautiful and non-empty!
    return [
      {
        id: "default-1",
        author: "Shaban Ali",
        text: "Arslan's custom video designs and web skills are completely next-level. The timing and fluid animations are superb! 💯",
        category: "Collab Request",
        color: "bg-[#FCF8E3] border-[#E9E1C6]/80 text-[#5C3F00] shadow-sm",
        timestamp: "2026-06-16 11:20 PM",
        emoji: "🔥"
      },
      {
        id: "default-2",
        author: "Alia Khan",
        text: "MashaAllah! Your talent is super inspiring Arslan. Best Creative Visual Artist and Tech Mentor in Pakistan! 🌟",
        category: "Fan Message",
        color: "bg-[#EAFDF8] border-[#CCEBE2]/80 text-[#004D3F] shadow-sm",
        timestamp: "2026-06-17 08:15 AM",
        emoji: "👑"
      },
      {
        id: "default-3",
        author: "John Tech Corp",
        text: "Sent you an email regarding the custom AI agent developer integrations. Looking forward to coding with you soon!",
        category: "Hire Arslan",
        color: "bg-[#FFF0F4] border-[#F9D5DF]/80 text-[#5F0720] shadow-sm",
        timestamp: "2026-06-17 10:45 AM",
        emoji: "💼"
      }
    ];
  });

  const [form, setForm] = useState({
    author: "",
    text: "",
    category: "Fan Message" as any,
    color: "bg-[#FCF8E3] border-[#E9E1C6]/80 text-[#5C3F00] shadow-sm",
    emoji: "💖"
  });

  const [voteStats, setVoteStats] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("arslan-guestbook-votes");
    if (saved) {
      try { return JSON.parse(saved); } catch (_) { return {}; }
    }
    return { "default-1": 14, "default-2": 28, "default-3": 9 };
  });

  useEffect(() => {
    localStorage.setItem("arslan-guestbook-notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("arslan-guestbook-votes", JSON.stringify(voteStats));
  }, [voteStats]);

  const colorOptions = [
    { name: "Sunny Sand", value: "bg-[#FCF8E3] border-[#E9E1C6]/80 text-[#5C3F00] shadow-sm" },
    { name: "Mint Fresh", value: "bg-[#EAFDF8] border-[#CCEBE2]/80 text-[#004D3F] shadow-sm" },
    { name: "Petal Pink", value: "bg-[#FFF0F4] border-[#F9D5DF]/80 text-[#5F0720] shadow-sm" },
    { name: "Cosmic Blue", value: "bg-[#F1F3FE] border-[#DBE0FB]/80 text-[#141B4B] shadow-sm" },
    { name: "Paper Ink", value: "bg-[#FDFDFB] border-neutral-300 text-[#121214] shadow-sm" }
  ];

  const emojiOptions = ["💖", "🔥", "🚀", "👑", "🎨", "💻", "💥", "👏"];

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author.trim() || !form.text.trim()) return;

    const newNote: StickyNote = {
      id: `note-${Date.now()}`,
      author: form.author.trim(),
      text: form.text.trim(),
      category: form.category,
      color: form.color,
      emoji: form.emoji,
      timestamp: new Date().toLocaleString([], { dateStyle: "short", timeStyle: "short" })
    };

    setNotes((prev) => [newNote, ...prev]);
    setForm((prev) => ({
      ...prev,
      author: "",
      text: ""
    }));
  };

  const handleVote = (id: string) => {
    setVoteStats((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDelete = (id: string) => {
    // Check if default note to prevent messing up the initial experience or support deleting custom notes
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-[#121214] dark:text-neutral-100">
      {/* Note Creation Form Column */}
      <div className="lg:col-span-4 p-5 rounded-[24px] border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 shadow-sm text-left flex flex-col justify-between">
        <form onSubmit={handleCreateNote} className="space-y-4">
          <div>
            <h3 className="font-display text-base font-extrabold text-[#121214] dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#121214] bg-[#c5f547] p-0.5 rounded-md" />
              Pin Your Message
            </h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
              Leave a custom message or request on Arslan's collaborative glassboard!
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {/* Input author */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 font-bold block">Your Name / Brand:</label>
              <input
                type="text"
                required
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="e.g. Alex Tech or Arslan Fan"
                className="w-full bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-neutral-700 focus:border-[#121214] dark:focus:border-[#c5f547] rounded-xl px-3.5 py-2.5 text-xs text-[#121214] dark:text-white placeholder-neutral-400 outline-none transition-all font-semibold"
              />
            </div>

            {/* Input text */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 font-bold block">Message:</label>
              <textarea
                required
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Write your feedback, request or love here..."
                rows={3}
                className="w-full bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-neutral-700 focus:border-[#121214] dark:focus:border-[#c5f547] rounded-xl p-3.5 text-xs text-[#121214] dark:text-white placeholder-neutral-400 outline-none transition-all resize-none font-semibold"
              />
            </div>

            {/* Note category classifications */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 font-bold block">Category:</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-white/10 rounded-xl py-2 px-3 text-xs text-[#121214] dark:text-white font-bold outline-none cursor-pointer"
                >
                  <option value="Fan Message">Compliment</option>
                  <option value="Collab Request">Collaboration</option>
                  <option value="Hire Arslan">Get Quote</option>
                  <option value="General Direct">Inquiry</option>
                </select>
              </div>

              {/* Emoji badge */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 font-bold block">Badge:</label>
                <div className="flex flex-wrap gap-1 bg-neutral-50 dark:bg-neutral-850 p-2 rounded-xl border border-neutral-200 dark:border-white/10 justify-around">
                  {emojiOptions.slice(0, 4).map((em) => (
                    <button
                      type="button"
                      key={em}
                      onClick={() => setForm({ ...form, emoji: em })}
                      className={`text-xs p-0.5 rounded transition-transform duration-200 cursor-pointer ${
                        form.emoji === em ? "scale-125 bg-neutral-200 dark:bg-neutral-700" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom color selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 font-bold block">Board Style:</label>
              <div className="flex gap-2 p-2 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-white/10 justify-between">
                {colorOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.name}
                    title={opt.name}
                    onClick={() => setForm({ ...form, color: opt.value })}
                    className={`w-6 h-6 rounded-lg ${opt.value.split(" ")[0]} border flex items-center justify-center transition-all ${
                      form.color === opt.value ? "border-[#121214] dark:border-white scale-110 shadow-sm" : "border-neutral-300 dark:border-neutral-700"
                    }`}
                  >
                    {form.color === opt.value && <Check className="w-3 h-3 text-[#121214] font-extrabold" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#121214] dark:bg-white dark:text-[#121214] hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white font-extrabold text-xs tracking-wide uppercase font-mono rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Pin Message Live
          </button>
        </form>
      </div>

      {/* Dynamic Pin board Grid */}
      <div className="lg:col-span-8 p-1.5 rounded-[24px] bg-neutral-100 dark:bg-neutral-950/40 border border-neutral-200 dark:border-white/10 relative min-h-[300px] overflow-y-auto max-h-[480px]">
        <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-white/10 flex justify-between items-center text-xs text-neutral-500 mb-4 mx-2 text-[#121214] dark:text-zinc-200 font-semibold">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
            Total compliments pinned: <strong>{notes.length}</strong>
          </span>
          <span className="text-[10px] uppercase font-mono font-bold">Live Interactive Glassboard</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 px-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-xl border flex flex-col justify-between text-left transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md ${note.color}`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{note.emoji}</span>
                    <span className="font-display font-extrabold text-xs truncate max-w-[120px]">
                      {note.author}
                    </span>
                  </div>
                  <span className="text-[8px] bg-white/70 border border-black/10 px-2 py-0.5 rounded-full text-[#121214] font-mono font-bold">
                    {note.category}
                  </span>
                </div>
                
                <p className="text-xs font-sans font-semibold leading-relaxed mt-3 break-words whitespace-pre-wrap">
                  "{note.text}"
                </p>
              </div>

              {/* Actions footer */}
              <div className="flex items-center justify-between border-t border-black/10 pt-3.5 mt-4 text-[10px]">
                <span className="font-mono text-[9px] opacity-70">{note.timestamp}</span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleVote(note.id)}
                    className="hover:scale-110 active:scale-95 hover:text-emerald-700 transition-transform px-2 py-1 rounded bg-white/50 flex items-center gap-1 cursor-pointer border border-[#121214]/15"
                    title="Upvote message"
                  >
                    <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                    <span className="font-bold">{voteStats[note.id] || 0}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-1 text-neutral-500 hover:text-rose-500 transition-colors rounded cursor-pointer"
                    title="Remove note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
