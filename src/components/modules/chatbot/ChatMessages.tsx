"use client";

import React, { useRef, useEffect } from "react";
import { Bot, User, Anchor, Loader2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-1">
    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
  </div>
);

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1.5 rounded-md bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
      aria-label="Copy message"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
    </button>
  );
};

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 w-full animate-in slide-in-from-bottom-2 duration-300",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center shadow-sm",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
            : "bg-gradient-to-br from-secondary/20 to-primary/10 text-primary border border-border/50"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Anchor className="h-4 w-4" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "group relative max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border border-border/50 text-card-foreground rounded-tl-sm"
        )}
      >
        {message.isLoading ? (
          <TypingIndicator />
        ) : (
          <>
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
            {!isUser && <CopyButton text={message.content} />}
          </>
        )}

        {/* Timestamp */}
        <div
          className={cn(
            "mt-1.5 text-[10px] tabular-nums",
            isUser ? "text-primary-foreground/50 text-right" : "text-muted-foreground/60"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
        <div className="relative mb-5">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
          <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 border border-border/50 flex items-center justify-center">
            <Anchor className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1.5">
          Boat Sea Assistant
        </h3>
        <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
          Ask me about boats, routes, schedules, pricing, and more!
        </p>

        {/* Quick suggestion chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2 max-w-[280px]">
          {[
            "🚤 Show popular boats",
            "🗺️ Best routes?",
            "💰 Pricing info",
            "⭐ Top rated boats",
          ].map((suggestion) => (
            <span
              key={suggestion}
              className="px-3 py-1.5 text-[11px] rounded-full bg-muted/60 text-muted-foreground border border-border/30 cursor-default select-none"
            >
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;
