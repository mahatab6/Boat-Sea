"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-border py-4">
      <button 
        className="flex w-full justify-between items-center text-left focus:outline-none hover:text-primary transition-colors"
        onClick={onClick}
      >
        <h3 className="font-medium text-lg pr-8">{question}</h3>
        <ChevronDown 
          className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0", isOpen && "transform rotate-180 text-primary")} 
        />
      </button>
      <div 
        className={cn(
          "grid transition-all duration-300 ease-in-out text-muted-foreground overflow-hidden",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <p className="leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need a boating license to rent a boat?",
      answer: "It depends on the boat and your location. For smaller boats, a license may not be required. However, for larger vessels or specific areas, a valid boating license is necessary. If you don't have one, you can always hire one of our experienced captains!"
    },
    {
      question: "What is included in the rental price?",
      answer: "The base rental price typically includes the boat, standard safety equipment (like life jackets), and insurance. Fuel, captain fees, and extra amenities like water toys or catering are usually billed separately unless stated otherwise."
    },
    {
      question: "What happens if the weather is bad on the day of my booking?",
      answer: "Your safety is our top priority. If severe weather conditions make it unsafe to sail, we offer a full refund or the option to reschedule your trip for a later date at no additional cost."
    },
    {
      question: "Can I bring my own food and drinks on board?",
      answer: "Yes, you are welcome to bring your own food and drinks on most of our rental boats. We just ask that you avoid bringing red wine or glass bottles on certain premium yachts to prevent staining and accidents."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-4 weeks in advance, especially during the peak summer season, to ensure you get your preferred boat and dates."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to the most common questions about renting a boat with us.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-10 border border-border shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
