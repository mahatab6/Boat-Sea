
 
"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button"; // Assuming Shadcn/UI

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">

      {/* Text Content */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          404 - Lost at Sea
        </h1>
        <p className="text-lg text-muted-foreground max-w-[500px]">
          Oops! It looks like the page you are looking for has drifted away. 
          Let’s get you back to familiar waters.
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-10">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}