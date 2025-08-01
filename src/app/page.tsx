import React from "react";
import Hero from "@/components/Hero";
import TopBar from "@/components/TopBar";
import Preloader from "@/components/Preloader";
import ContactModal from "@/components/ContactModal";
import { InitialLoadProvider } from "@/contexts/initial-load-context";

export default function Home() {
  return (
    <InitialLoadProvider>
      <Preloader />
      <TopBar />
      <Hero />
      <ContactModal />
    </InitialLoadProvider>
  );
}
