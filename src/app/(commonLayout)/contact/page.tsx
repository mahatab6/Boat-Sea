"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 000-0000",
      description: "Mon-Fri from 8am to 5pm.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@boatsea.com",
      description: "We'll respond within 24 hours.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Nautical Way",
      description: "Marina District, SF 94123",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-300 max-w-2xl mx-auto text-lg"
          >
            Have questions about our boat rentals or want to list your own? 
            Our team is here to help you navigate your next adventure.
          </motion.p>
        </div>
      </section>

      <section className="py-20 -mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl">
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" className="bg-background/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" className="bg-background/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[150px] bg-background/50" />
                    </div>
                    <Button size="lg" className="w-full md:w-auto px-8 py-6 text-lg group transition-all duration-300">
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow bg-card/50 backdrop-blur-xl">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className={`p-3 rounded-2xl ${info.bg} ${info.color}`}>
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{info.title}</h3>
                        <p className="text-foreground font-medium mb-1">{info.details}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Extra Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-none shadow-xl bg-primary text-primary-foreground overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <Globe className="w-24 h-24" />
                  </div>
                  <CardContent className="p-8 relative z-10">
                    <Clock className="w-10 h-10 mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                    <p className="opacity-90">
                      Our support team is available around the clock to assist you with any urgent matters or bookings.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl overflow-hidden h-[400px] relative shadow-inner grayscale hover:grayscale-0 transition-all duration-700">
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center">
              <span className="text-muted-foreground font-medium flex items-center">
                <MapPin className="mr-2" /> Interactive Map Loading...
              </span>
            </div>
            {/* Real Map would go here */}
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764020443891!3d37.757814996609724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1714819000000!5m2!1sen!2sus"
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="relative z-10"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
