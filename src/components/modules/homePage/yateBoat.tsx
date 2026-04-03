import React from 'react';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

const YateBoat = () => {
  return (
    <section className="py-24 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
              About <span className="ml-1 text-white bg-[#2d8a56] px-1 rounded">Yate Boat</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1a1a1a] leading-tight">
              EXPERIENCE THE <br />
              <span className="text-[#4db8d3]">ULTIMATE</span> ADVENTURE
            </h1>
            
            <p className="text-gray-700 leading-relaxed max-w-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquam veritatis 
              nostrum explicabo consequatur totam officiis dolores expedita amet doloribus! 
              Ipsum ut soluta obcaecati alias maiores magnam qui beatae ab!
            </p>
            
            <button className="flex items-center gap-2 bg-[#2d8a56] hover:bg-[#246e45] text-white px-8 py-4 rounded-full font-medium transition-all group hover:cursor-pointer">
              <Link href={"/about"}>More Details</Link>
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Image Side */}
          <div className="w-full lg:w-1/2 flex items-center gap-4 md:gap-8">
            {/* Larger Left Image */}
            <div className="flex-1">
              <img 
                src="https://i.ibb.co.com/Jwnt27Zh/22ded1fd4c.jpg" 
                alt="Large wooden ship" 
                className="w-full h-[400px] md:h-[500px] object-cover rounded-[100px] border-[12px] border-white shadow-sm"
              />
            </div>
            
            {/* Smaller Right Image (Offset upwards) */}
            <div className="flex-1 mt-12">
              <img 
                src="https://i.ibb.co.com/RpLJrhd0/27630f4e33.jpg" 
                alt="Modern motorboat" 
                className="w-full h-[350px] md:h-[450px] object-cover rounded-[100px] border-[12px] border-white shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default YateBoat;