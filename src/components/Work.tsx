"use client";

import { motion, useInView } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import Copy from "./Copy";
import { useRef } from "react";

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -55% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center py-20 sm:py-24 lg:py-28 px-3 sm:px-4 lg:px-8"
    >
      <h2 className="flex justify-between w-full mb-6 lg:mb-8">
        <Copy>
          <span className="text-[clamp(2.5rem,10vw,6rem)] sm:text-[clamp(3rem,12vw,8rem)] lg:text-[clamp(4rem,12vw,12rem)] font-bold tracking-tight leading-[0.8] uppercase">
            Work
          </span>
        </Copy>
        <Copy delay={0.2}>
          <span className="text-[clamp(2.5rem,10vw,6rem)] sm:text-[clamp(3rem,12vw,8rem)] lg:text-[clamp(4rem,12vw,12rem)] font-bold tracking-tight leading-[0.8] uppercase">
            &apos;24
          </span>
        </Copy>
      </h2>

      <ul className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-4 w-full mb-6 sm:mb-8 lg:mb-16">
        <motion.li
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          key={projects[0].title}
          className="w-full lg:w-1/2"
        >
          <ProjectCard project={projects[0]} index={0} />
        </motion.li>
        <motion.li
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          key={projects[1].title}
          className="w-full lg:w-1/2"
        >
          <ProjectCard project={projects[1]} index={1} />
        </motion.li>
      </ul>

      {/* Second row of projects */}
      <ul className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-4 w-full mb-6 sm:mb-8 lg:mb-16">
        <motion.li
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 1.5,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          key={projects[2]?.title}
          className="w-full lg:w-1/2"
        >
          {projects[2] && <ProjectCard project={projects[2]} index={2} />}
        </motion.li>
        <motion.li
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 1.5,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          key={projects[3]?.title}
          className="w-full lg:w-1/2"
        >
          {projects[3] && <ProjectCard project={projects[3]} index={3} />}
        </motion.li>
      </ul>

      <div className="flex items-center gap-1 group cursor-pointer">
        <span className="text-[clamp(16px,1.8vw,20px)] sm:text-[clamp(18px,1.6vw,24px)] lg:text-[clamp(20px,1.5vw,32px)] font-medium">
          View Portfolio
        </span>
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  );
}
