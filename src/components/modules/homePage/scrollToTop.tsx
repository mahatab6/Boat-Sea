"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const percentage = Math.round((scrollTop / scrollHeight) * 100);
        setScrollPercentage(percentage);
      } else {
        setScrollPercentage(0);
      }

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Calculate initial values
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-background shadow-xl border border-border transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r={radius}
            className="stroke-muted"
            strokeWidth="3"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            className="stroke-primary transition-all duration-200 ease-out"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Icon & Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary transition-transform duration-300 hover:-translate-y-1">
          <ArrowUp className="h-4 w-4 -mb-0.5" />
          <span className="text-[10px] font-bold leading-none">{scrollPercentage}%</span>
        </div>
      </div>
    </button>
  );
};

export default ScrollToTop;
