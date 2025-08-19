import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Technologies from "@/components/Technologies";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Preloader from "@/components/Preloader";
import ContactModal from "@/components/ContactModal";
import { InitialLoadProvider } from "@/contexts/initial-load-context";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <InitialLoadProvider>
      <Preloader />
      <PageTransition>
        <TopBar />
        <Hero />
        <About />
        <Services />
        <Work />
        <Technologies />
        <Footer />
        <ContactModal />
      </PageTransition>
    </InitialLoadProvider>
  );
}
