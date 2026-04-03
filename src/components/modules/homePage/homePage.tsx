import React from "react";
import Testimonials from "./testimonials";
import HowItWorks from "./howItWorks";
import PopularRoutes from "./popularRoutes";
import FeaturedBoat from "./featuredBoat";
import Hero from "./hero";
import YateBoat from "./yateBoat";

const HomePage = () => {
  return (
    <main>
      <Hero/>
      <FeaturedBoat/>
      <YateBoat/>
      <PopularRoutes/>
      <HowItWorks/>
      <Testimonials />
    </main>
  );
};

export default HomePage;
