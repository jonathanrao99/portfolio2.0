"use client";

import { motion } from "motion/react";
import InfiniteGrid from "@/components/InfiniteGrid";
import useInitialLoad from "@/contexts/initial-load-context";
import { InitialLoadProvider } from "@/contexts/initial-load-context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function LabContent() {
  const { isInitialLoad } = useInitialLoad();

  return (
    <>
      {/* Simple Top Navigation for Lab Page */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: isInitialLoad ? 1 : 0.2 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900/80 backdrop-blur-md rounded-full text-white hover:bg-neutral-900 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </motion.div>

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
    </>
  );
}

export default function Lab() {
  return (
    <InitialLoadProvider>
      <LabContent />
    </InitialLoadProvider>
  );
}
