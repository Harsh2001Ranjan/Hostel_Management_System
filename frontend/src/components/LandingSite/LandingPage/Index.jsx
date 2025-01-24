import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
// import TechnicalAchievements from "../../components/landingPage/TechnicalAchievements";
// import CallToActionSection from "../../components/landingPage/CallToActionSection";
import TeamSection from "./TeamSection";
import Footer from "./Footer";
// import NotesSection from "../../components/landingPage/NotesSection";

const LandingPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <NotesSection /> */}
      <FeaturesSection />
      <TeamSection />
      {/* <CallToActionSection /> */}
      <Footer />
    </>
  );
};

export default LandingPage;
