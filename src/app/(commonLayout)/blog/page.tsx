"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Yacht Destinations for Summer 2026",
      excerpt: "Explore the most stunning marinas and hidden coves that should be on your bucket list this year.",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070",
      author: "Captain Hook",
      date: "May 1, 2026",
      category: "Travel",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "How to Choose the Right Boat for Your Trip",
      excerpt: "From catamarans to speedboats, we help you decide which vessel fits your adventure style.",
      image: "https://images.unsplash.com/photo-1540946484620-20ef2448433a?q=80&w=2070",
      author: "Sarah Marine",
      date: "April 28, 2026",
      category: "Guides",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Safety First: Essential Boating Tips for Beginners",
      excerpt: "Everything you need to know before you hit the open water for the first time.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
      author: "Mike Anchor",
      date: "April 25, 2026",
      category: "Safety",
      readTime: "12 min read"
    },
    {
      id: 4,
      title: "Sustainable Sailing: Eco-Friendly Boating Habits",
      excerpt: "Learn how to enjoy the ocean while preserving its beauty for future generations.",
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076",
      author: "Eco Explorer",
      date: "April 20, 2026",
      category: "Sustainability",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "The Best Sunset Spots to Anchor Your Boat",
      excerpt: "Discover the most magical locations to witness the sun dipping below the horizon.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2032",
      author: "Ray Light",
      date: "April 15, 2026",
      category: "Lifestyle",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Budget-Friendly Boat Rentals: A Smart Guide",
      excerpt: "Expert advice on how to get the most value for your money on your next rental.",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070",
      author: "Penny Saver",
      date: "April 10, 2026",
      category: "Finance",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden bg-card/50 backdrop-blur-sm flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="flex-none pb-2">
                    <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {blog.date}
                      </span>
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {blog.author}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="flex-none pt-0">
                    <Link href={`/blog/${blog.id}`} className="w-full">
                      <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-primary-foreground transition-all group/btn">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="rounded-full px-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              Load More Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
