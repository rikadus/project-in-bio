import Image from "next/image";
import Hero from "./components/landing-page/hero";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {
        <Hero />
        /*<Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />*/
      }
    </div>
  );
}
