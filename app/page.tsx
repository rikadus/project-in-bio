import Image from "next/image";
import FAQ from "./components/landing-page/faq";
import Header from "./components/landing-page/header";
import Hero from "./components/landing-page/hero";
import VideoExplanation from "./components/landing-page/video-explanation";
import Pricing from "./components/landing-page/pricing";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />

      {/* <VideoExplanation />
      <Pricing />
      <FAQ /> 
      */}
    </div>
  );
}
