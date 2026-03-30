import React from "react";
import Testimonials from "./testimonials";
import HowItWorks from "./howItWorks";
import PopularRoutes from "./popularRoutes";
import FeaturedBoat from "./featuredBoat";

const HomePage = () => {
  return (
    <main>
      <h2>Home page</h2>
      <FeaturedBoat/>
      <PopularRoutes/>
      <HowItWorks/>
      <Testimonials />
    </main>
  );
};

export default HomePage;
