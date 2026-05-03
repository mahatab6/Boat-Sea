"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  MessageCircle, X, Send, Minimize2, Maximize2,
  RotateCcw, Anchor, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ChatMessages, { type ChatMessage } from "./ChatMessages";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const genId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { id: genId(), role: "user", content: trimmed, timestamp: new Date() };
    const loadId = genId();
    const loadMsg: ChatMessage = { id: loadId, role: "assistant", content: "", timestamp: new Date(), isLoading: true };

    setMessages((p) => [...p, userMsg, loadMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/rag/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      const data = await res.json();
      let text = "Sorry, I couldn't process your request.";
      if (data?.success && data?.data) {
        if (typeof data.data === "string") text = data.data;
        else if (data.data?.answer) text = data.data.answer;
        else if (data.data?.response) text = data.data.response;
        else text = JSON.stringify(data.data, null, 2);
      } else if (data?.message) text = data.message;

      setMessages((p) => p.map((m) => (m.id === loadId ? { ...m, content: text, isLoading: false } : m)));
    } catch {
      setMessages((p) => p.map((m) => (m.id === loadId ? { ...m, content: "⚠️ Unable to connect. Please try again.", isLoading: false } : m)));
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <>
      {/* FAB */}
      <button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed z-[60] bottom-8 right-8 h-14 w-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 cursor-pointer group",
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-primary/25 hover:scale-105 active:scale-95",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6 transition-transform group-hover:rotate-12" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-secondary-foreground" />
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-[60] flex flex-col overflow-hidden transition-all duration-500 ease-out bg-background border border-border/60 shadow-2xl",
          isExpanded
            ? "bottom-0 right-0 w-full h-full sm:bottom-6 sm:right-6 sm:w-[480px] sm:h-[680px] sm:rounded-3xl"
            : "bottom-6 right-6 w-[380px] h-[560px] rounded-3xl",
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary to-primary/85">
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 30" fill="none" preserveAspectRatio="none">
              <path d="M0 30 Q50 0 100 15 T200 15 T300 15 T400 15 V30 Z" fill="currentColor" className="text-white" />
            </svg>
          </div>
          <div className="relative flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Anchor className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-primary-foreground tracking-wide">Boat Sea AI</h2>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-primary-foreground/70">Online — Ask anything</span>
              </div>
            </div>
          </div>
          <div className="relative flex items-center gap-1">
            <button onClick={() => { setMessages([]); setIsLoading(false); }} className="p-2 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors cursor-pointer" aria-label="Clear chat" title="Clear chat">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors cursor-pointer hidden sm:flex" aria-label={isExpanded ? "Minimize" : "Maximize"}>
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors cursor-pointer" aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <ChatMessages messages={messages} />

        {/* Input */}
        <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm px-4 py-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask about boats, routes, pricing..."
              rows={1}
              className="flex-1 resize-none rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 max-h-[120px]"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer",
                inputValue.trim() && !isLoading
                  ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground/50">Powered by Boat Sea RAG • AI-assisted answers</p>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;
