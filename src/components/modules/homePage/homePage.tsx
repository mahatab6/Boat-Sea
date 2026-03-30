import React from "react";
import Testimonials from "./testimonials";
import HowItWorks from "./howItWorks";
import PopularRoutes from "./popularRoutes";

const HomePage = () => {
  return (
    <main>
      <h2>Home page</h2>
      <PopularRoutes/>
      <HowItWorks/>
      <Testimonials />
    </main>
  );
};

export default HomePage;
