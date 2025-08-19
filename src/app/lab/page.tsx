"use client";

import { motion } from "motion/react";
import InfiniteGrid from "@/components/InfiniteGrid";
import useInitialLoad from "@/contexts/initial-load-context";
import { InitialLoadProvider } from "@/contexts/initial-load-context";
import TopBar from "@/components/TopBar";
import ContactModal from "@/components/ContactModal";
import PageTransition from "@/components/PageTransition";

function LabContent() {
  const { isInitialLoad } = useInitialLoad();

  return (
    <PageTransition>
      <TopBar />
      <ContactModal />
      
      <main className="bg-neutral-100 h-screen w-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="hidden md:block overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: isInitialLoad ? 2.6 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(100px,14vw,500px)] font-bold uppercase leading-none typeface-respira-black text-center w-full whitespace-nowrap select-none will-change-transform"
          >
            The Lab
          </motion.h1>
        </div>
        <div className="md:hidden flex flex-col items-center">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: isInitialLoad ? 2.6 : 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(100px,14vw,500px)] font-bold uppercase leading-none typeface-respira-black text-center w-full whitespace-nowrap select-none will-change-transform"
            >
              The
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: isInitialLoad ? 2.7 : 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(100px,14vw,500px)] font-bold uppercase leading-none typeface-respira-black text-center w-full whitespace-nowrap select-none will-change-transform"
            >
              Lab
            </motion.h1>
          </div>
        </div>
        </div>
        <InfiniteGrid />
      </main>
    </PageTransition>
  );
}

export default function Lab() {
  return (
    <InitialLoadProvider>
      <LabContent />
    </InitialLoadProvider>
  );
}
