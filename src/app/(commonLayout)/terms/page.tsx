import React from "react";
import { FileText, Gavel, AlertCircle, CheckCircle, Scale, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  const lastUpdated = "May 4, 2026";

  const terms = [
    {
      icon: Gavel,
      title: "1. Acceptance of Terms",
      content: "By accessing or using the Boat Sea platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services."
    },
    {
      icon: Scale,
      title: "2. User Responsibilities",
      content: "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You must be at least 18 years old to use our services."
    },
    {
      icon: CheckCircle,
      title: "3. Booking and Payments",
      content: "All bookings made through Boat Sea are subject to availability and confirmation. Payments are processed securely through our authorized payment providers. Cancellation policies vary by boat and are clearly stated at the time of booking."
    },
    {
      icon: AlertCircle,
      title: "4. Liability and Insurance",
      content: "Boat Sea is a marketplace connecting boat owners and renters. We do not own or operate any vessels. Owners are responsible for maintaining valid insurance and ensuring their vessels are seaworthy and compliant with local regulations."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our platform. 
            They govern your legal relationship with Boat Sea.
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
            <div className="space-y-12">
              {terms.map((term) => (
                <div key={term.title} className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-primary/5 text-primary rounded-xl">
                      <term.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold m-0">{term.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed m-0">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-primary/5 p-8 rounded-3xl border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                <HelpCircle className="mr-2 w-6 h-6" />
                Need Clarification?
              </h2>
              <p className="text-muted-foreground text-lg mb-0">
                If you have any questions regarding these terms or your use of the platform, please reach out to our legal team. We're here to help you understand your rights and obligations.
              </p>
            </div>

            <Separator className="my-16" />

            <div className="text-center">
              <p className="text-muted-foreground mb-4 italic">
                By clicking "Accept" or by continuing to use our services, you acknowledge that you have read and understood these Terms of Service.
              </p>
              <p className="font-bold text-foreground">
                Boat Sea Inc. &copy; 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
