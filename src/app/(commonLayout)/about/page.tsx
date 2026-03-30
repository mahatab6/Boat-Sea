import { Card, CardContent } from "@/components/ui/card";
import { Anchor, Award, Globe, Users } from "lucide-react";
import React from "react";

const AboutPage = () => {
  const values = [
    {
      icon: Anchor,
      title: "Maritime excellence",
      description:
        "We curate only the finest vessels and maintain the highest safety standards",
    },
    {
      icon: Award,
      title: "Premium service",
      description:
        "Every booking is backed by our commitment to exceptional customer experience",
    },
    {
      icon: Users,
      title: "Community first",
      description:
        "Building lasting relationships between boat owners and adventurers",
    },
    {
      icon: Globe,
      title: "Global reach",
      description:
        "Connecting maritime enthusiasts across coastal destinations worldwide",
    },
  ];
  return (
    <main className="min-h-screen bg-background">
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Making maritime adventures accessible
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Boat Sea connects boat owners with adventurers seeking
            unforgettable experiences on the water. Founded in 2021, we have
            facilitated over 12,000 bookings across 47 coastal destinations.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Our values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Our story
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Boat Sea was born from a simple observation: premium boat
              rentals were either prohibitively expensive or difficult to find.
              We set out to change that.
            </p>
            <p>
              By creating a trusted marketplace that connects boat owners
              directly with renters, we have made it possible for more people to
              experience the freedom and adventure of life on the water.
            </p>
            <p>
              Today, our platform serves thousands of customers and boat owners
              across coastal regions worldwide. Every booking represents not
              just a transaction, but the beginning of a memorable maritime
              journey.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
