"use client";

import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Hero } from "@/components/Landing/Hero";
import { HowItWorks } from "@/components/Landing/HowItWorks";
import { LGMShowcase } from "@/components/Landing/LGMShowcase";
import { FeaturedCards } from "@/components/Landing/FeaturedCards";
import { RarityTable } from "@/components/Landing/RarityTable";
import { Roadmap } from "@/components/Landing/Roadmap";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <LGMShowcase />
        <FeaturedCards />
        <RarityTable />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
