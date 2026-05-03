import React from "react";
import Testimonials from "./testimonials";
import HowItWorks from "./howItWorks";
import PopularRoutes from "./popularRoutes";
import FeaturedBoat from "./featuredBoat";
import Hero from "./hero";
import YateBoat from "./yateBoat";
import WhyChooseUs from "./whyChooseUs";
import Services from "./services";
import Statistics from "./statistics";
import LatestBlogs from "./latestBlogs";
import FAQ from "./faq";
import Newsletter from "./newsletter";

const HomePage = () => {
  return (
    <main>
      <Hero/>
      <WhyChooseUs/>
      <Services/>
      <FeaturedBoat/>
      <YateBoat/>
      <Statistics/>
      <PopularRoutes/>
      <HowItWorks/>
      <Testimonials />
      <LatestBlogs/>
      <FAQ/>
      <Newsletter/>
    </main>
  );
};

export default HomePage;
