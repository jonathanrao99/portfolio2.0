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
      {/* Temporary content to make page scrollable for testing video scaling */}
      <div className="h-screen bg-gray-100 p-8">
        <h2 className="text-4xl font-bold mb-4">Scroll Test Content</h2>
        <p className="text-lg mb-4">Scroll up and down to test the video scaling effect.</p>
        <p className="text-lg mb-4">You can also press the 'S' key to manually toggle scaling.</p>
        <div className="space-y-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold">Test Content Block {i + 1}</h3>
              <p>This is test content to make the page scrollable so we can test the video scaling effect.</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-screen bg-gray-200 p-8">
        <h2 className="text-4xl font-bold mb-4">More Test Content</h2>
        <p className="text-lg">Keep scrolling to test the video scaling range.</p>
      </div>
      <ContactModal />
    </InitialLoadProvider>
  );
}
