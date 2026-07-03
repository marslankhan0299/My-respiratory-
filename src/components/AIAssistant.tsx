import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Sparkles, Send, RefreshCw, Cpu, Brain, User } from "lucide-react";
import { ChatMessage } from "../types";

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Salaam! I am Arslan's AI Assistant, tuned with his creative vision and software engineering skills. Try asking me for video idea breakdowns, full-stack project blueprints, or how we can collaborate! 🚀",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starQuestions = [
    "🎥 Pitch a video color grade!",
    "🛠️ What tech stack do you use?",
    "🎨 Design a liquid glaze UI",
    "💼 How do I hire Arslan?"
  ];

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    const userMsgId = `usr-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");
    setIsTyping(true);

    try {
      // Create request payload with prior chat history
      const prevHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: prevHistory
        })
      });

      if (!res.ok) {
        throw new Error("Server responded with status " + res.status);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "model",
          content: data.text || "I was unable to formulate a response. Let me try again later, jani!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          content: "Oops! My backend link is currently offline. Feel free to reach out to Arslan directly at **mrarslan242242@gmail.com** or WhatsApp at **+93 748 845 221** for instant replies! ⚡",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "model",
        content: "Chat cleared successfully! Ask me anything about Arslan's visual projects, tech stack, or creative design. 🌟",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden text-neutral-800 dark:text-neutral-200 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative p-2 bg-[#121214]/5 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl">
             <Cpu className="w-5 h-5 text-[#121214] dark:text-white" />
             <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <div>
            <h4 className="font-display text-sm font-extrabold tracking-tight text-[#121214] dark:text-white flex items-center gap-1.5 animate-pulse text-left">
              Arslan's AI Assistant
              <span className="text-[10px] uppercase tracking-wider bg-[#c5f547] text-[#121214] font-mono px-2 py-0.5 rounded-full border border-neutral-300 dark:border-transparent font-extrabold">
                Live Core
              </span>
            </h4>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold text-left pointer-events-none">Creative & Tech Portfolio Assistant</p>
          </div>
        </div>
        <button
          onClick={handleResetChat}
          title="Clear Conversation"
          className="p-1.5 text-neutral-400 hover:text-[#121214] dark:hover:text-white rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Sandbox */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-0 bg-neutral-50 dark:bg-neutral-950/40 list-none scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                msg.role === "user"
                  ? "bg-[#c5f547]/30 border-[#121214]/15 text-[#121214] dark:text-[#c5f547]"
                  : "bg-[#121214]/5 dark:bg-neutral-850 border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
              }`}
            >
              {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Brain className="w-3.5 h-3.5" />}
            </div>
            
            <div className="flex flex-col">
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed font-sans font-semibold ${
                  msg.role === "user"
                    ? "bg-[#c5f547] border border-[#121214]/15 text-[#121214] rounded-tr-none shadow-sm"
                    : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-zinc-100 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.content.includes("\n") || msg.content.includes("- ") ? (
                  <div className="space-y-1 text-left whitespace-pre-wrap">
                    {msg.content}
                  </div>
                ) : (
                  <p className="text-left">{msg.content}</p>
                )}
              </div>
              <span className={`text-[9px] text-neutral-400 mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border bg-[#121214]/5 dark:bg-neutral-850 border-neutral-200 dark:border-white/10 text-neutral-500">
              <Brain className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-3.5 rounded-2xl text-xs rounded-tl-none shadow-sm">
              <div className="flex items-center gap-1.5 py-1">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Star questions */}
      <div className="px-3 py-2 bg-neutral-100 dark:bg-[#121214]/90 border-t border-neutral-200 dark:border-white/10 flex flex-wrap gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
        {starQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(q.replace(/[🎥🛠️🎨💼]/g, "").trim())}
            className="text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-300 hover:text-[#121214] dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-[#c5f547]/20 dark:hover:bg-[#c5f547]/20 border border-neutral-200 dark:border-white/10 hover:border-[#121214]/30 px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer hover:scale-101 flex items-center gap-1 shadow-xs"
          >
            <Sparkles className="w-2.5 h-2.5 text-neutral-500" />
            {q}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputMsg);
        }}
        className="p-3.5 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-white/10 shrink-0 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Type a creative request or question..."
          className="flex-1 bg-neutral-50 dark:bg-neutral-850 hover:bg-neutral-105 dark:hover:bg-neutral-800 focus:bg-white dark:focus:bg-neutral-900 border border-neutral-200 dark:border-white/10 focus:border-[#121214] dark:focus:border-[#c5f547] rounded-xl px-4 py-3 text-xs text-[#121214] dark:text-white placeholder-neutral-400 outline-none font-bold transition-all"
        />
        <button
          type="submit"
          disabled={!inputMsg.trim() || isTyping}
          className="p-3 bg-[#121214] dark:bg-white text-white dark:text-[#121214] hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:text-neutral-400 dark:disabled:text-neutral-600 rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
