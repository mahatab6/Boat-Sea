import React from 'react';
import { MoveRight, Anchor, Award, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const YateBoat = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 px-5 py-2 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Anchor className="w-4 h-4 text-[#2d8a56]" />
              <span className="text-xs font-semibold uppercase tracking-[2px] text-slate-600 dark:text-slate-400">
                Premium Yacht Experience
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-none text-slate-900 dark:text-white tracking-tighter">
              EXPERIENCE THE<br />
              <span className="bg-gradient-to-r from-[#2d8a56] via-[#4db8d3] to-[#2d8a56] bg-clip-text text-transparent">
                ULTIMATE
              </span><br />
              WATER ADVENTURE
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              Discover luxury yachting like never before. From serene sunset cruises to thrilling deep-sea adventures, 
              our premium fleet offers unforgettable moments on the water.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#2d8a56]" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">5-Star Rated</p>
                  <p className="text-xs text-slate-500">By 1200+ travelers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#4db8d3]" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Safe & Secure</p>
                  <p className="text-xs text-slate-500">Fully insured fleet</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link href="/about">
                <button className="group flex items-center gap-4 bg-[#2d8a56] hover:bg-[#246e45] text-white px-10 py-5 rounded-3xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-[#2d8a56]/30 hover:shadow-xl hover:-translate-y-0.5">
                  Discover Our Fleet
                  <div className="bg-white/20 rounded-full p-2 group-hover:rotate-45 transition-transform">
                    <MoveRight className="w-6 h-6" />
                  </div>
                </button>
              </Link>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 pt-4">
              Starting from <span className="font-semibold text-slate-700 dark:text-slate-300">$299</span> per trip
            </p>
          </div>

          {/* Right Image Section - Modern Overlap Design */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              {/* Large Main Image */}
              <div className="relative z-20 rounded-[3.5rem] overflow-hidden border-[14px] border-white dark:border-slate-800 shadow-2xl">
                <Image
                  src="https://i.ibb.co.com/Jwnt27Zh/22ded1fd4c.jpg"
                  alt="Luxury wooden yacht on calm water"
                  width={600}
                  height={520}
                  className="w-full h-auto object-cover aspect-[4/3.3]"
                  priority
                />
              </div>

              {/* Floating Smaller Image */}
              <div className="absolute -bottom-8 -right-6 lg:-right-12 z-30 w-72 md:w-80 rounded-[2.75rem] overflow-hidden border-[12px] border-white dark:border-slate-800 shadow-2xl rotate-[8deg] hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://i.ibb.co.com/RpLJrhd0/27630f4e33.jpg"
                  alt="Modern luxury motor yacht"
                  width={420}
                  height={380}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-28 h-28 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="text-4xl font-serif font-bold text-[#2d8a56]">10+</div>
                  <div className="text-xs tracking-widest uppercase text-slate-500">Yachts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YateBoat;