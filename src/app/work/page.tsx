"use client";

import { motion } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import useInitialLoad from "@/contexts/initial-load-context";
import { InitialLoadProvider } from "@/contexts/initial-load-context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function WorkContent() {
  const { isInitialLoad } = useInitialLoad();

  return (
    <>
      {/* Simple Top Navigation for Work Page */}
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

      <main className="bg-neutral-100">
        <div className="px-4 lg:px-8 pt-[200px] md:pt-[clamp(128px,12vw,500px)]">
          <div className="overflow-hidden mb-3 lg:mb-5">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: isInitialLoad ? 2.8 : 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(14px,1.2vw,24px)] font-medium"
            >
              [2022-2025]
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: isInitialLoad ? 2.9 : 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(48px,7.5vw,200px)] font-bold uppercase leading-[0.8] tracking-tight"
            >
              Selected Work
            </motion.h1>
          </div>
        </div>

        <ProjectList />
      </main>
    </>
  );
}

function ProjectList() {
  const { isInitialLoad } = useInitialLoad();

  return (
    <div className="px-2 lg:px-4 py-4 lg:py-6">
      <motion.div
        initial={{ y: "24px", opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: isInitialLoad ? 2.8 : 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full bg-neutral-200 rounded-2xl lg:rounded-[20px] p-3 lg:p-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Work() {
  return (
    <InitialLoadProvider>
      <WorkContent />
    </InitialLoadProvider>
  );
}
