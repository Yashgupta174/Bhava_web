import React from "react";
import HomeMain from "../components/HomeMain";
import SacredCollection from "../components/SacredCollection";
import ProductSpecification from "../components/ProductSpecification";
import OurMission from "../components/OurMission";
import FundRaiser from "../components/FundRaiser";
import Community from "../components/Community";
import AppSection from "../components/AppSection";
import FAQ from "../components/FAQ";
import SacredJourney from "../components/SacredJourney";
import GitaSlider from "../knowledge/GitaSlider";

function Home() {
  return (
    <>
      <HomeMain />
      <SacredCollection />
      <GitaSlider />
      <ProductSpecification />
      <OurMission />
      <FundRaiser />
      <Community />
      {/* <AppSection /> */}
      {/* <FAQ /> */}
      <SacredJourney />
    </>
  );
}

export default Home;