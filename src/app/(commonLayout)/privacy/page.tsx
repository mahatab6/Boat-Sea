import React from "react";
import { Shield, Lock, Eye, FileText, Globe, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PrivacyPage = () => {
  const lastUpdated = "May 4, 2026";

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect information you provide directly to us when you create an account, make a booking, or communicate with us. This may include your name, email address, phone number, payment information, and details about your boat if you are an owner."
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process your bookings, send you technical notices, updates, security alerts, and support messages."
    },
    {
      icon: Shield,
      title: "Information Sharing",
      content: "We do not share your personal information with third parties except as described in this policy. We may share information with boat owners to facilitate bookings, or with service providers who perform services on our behalf."
    },
    {
      icon: Bell,
      title: "Your Choices",
      content: "You may update, correct, or delete your account information at any time by logging into your account. You can also opt out of receiving promotional communications from us."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, 
            and safeguard your personal information when you use Boat Sea.
          </p>
          <p className="text-sm text-primary font-medium mt-6">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="grid gap-12">
              {sections.map((section) => (
                <div key={section.title} className="group">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <section.icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold m-0">{section.title}</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                  <Separator className="mt-8" />
                </div>
              ))}
            </div>

            <div className="mt-16 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-dashed border-primary/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Globe className="mr-2 w-6 h-6 text-primary" />
                International Data Transfers
              </h2>
              <p className="text-muted-foreground">
                Boat Sea is based in the United States and the information we collect is governed by U.S. law. By accessing or using our services or otherwise providing information to us, you consent to the processing and transfer of information in and to the U.S. and other countries.
              </p>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <a 
                href="mailto:privacy@boatsea.com" 
                className="inline-flex items-center text-primary font-bold text-lg hover:underline"
              >
                <FileText className="mr-2 w-5 h-5" />
                privacy@boatsea.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
