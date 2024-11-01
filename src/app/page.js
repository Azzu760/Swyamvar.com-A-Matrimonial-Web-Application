import React from "react";
import Navbar from "./components/homeSections/NavBar";
import HeroSection from "./components/homeSections/HeroSection";
import AboutUs from "./components/homeSections/AboutUs";
import Feature from "./components/homeSections/Feature";
import Pricing from "./components/homeSections/Pricing";
import Footer from "./components/homeSections/Footer";

export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <Feature />
      <Pricing />
      <Footer />
    </React.Fragment>
  );
}
