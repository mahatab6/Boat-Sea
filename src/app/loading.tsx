"use client";

import Lottie from "lottie-react";
import boatAnimation from '../../public/Sailing boat.json'

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <div className="w-64 h-64"> 
        <Lottie 
          animationData={boatAnimation} 
          loop={true} 
        />
      </div>
      <p className="text-muted-foreground animate-pulse">Loading adventure...</p>
    </div>
  );
}