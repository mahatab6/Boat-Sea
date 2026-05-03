import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Hidden Coves You Must Visit This Summer",
      excerpt: "Discover the most secluded and breathtaking coves that are only accessible by boat. Perfect for your next weekend getaway.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
      date: "May 12, 2026",
      author: "Captain John"
    },
    {
      id: 2,
      title: "A Beginner's Guide to Chartering a Yacht",
      excerpt: "Everything you need to know before booking your first yacht charter. From selecting the right vessel to packing essentials.",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop",
      date: "April 28, 2026",
      author: "Sarah Jenkins"
    },
    {
      id: 3,
      title: "Sailing vs. Motorboating: Which is Right for You?",
      excerpt: "Comparing the serene experience of sailing with the thrilling speed of motorboating to help you choose your perfect adventure.",
      image: "https://images.unsplash.com/photo-1534062013898-33df4f39b1a0?q=80&w=2070&auto=format&fit=crop",
      date: "April 15, 2026",
      author: "Mike Thompson"
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Latest From Our Blog
            </h2>
            <p className="text-muted-foreground text-lg">
              Stay updated with our latest sailing tips, destination guides, and maritime news.
            </p>
          </div>
          <Link href="/blogs" className="hidden md:flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
            View All Articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative h-60 w-full overflow-hidden">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-muted-foreground mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {blog.date}
                  </div>
                  <div className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1" />
                    {blog.author}
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                </h3>
                <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                  {blog.excerpt}
                </p>
                <Link href={`/blogs/${blog.id}`} className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors mt-auto">
                  Read Article <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/blogs" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
            View All Articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
