"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Project } from "@/data/projects";
import useInitialLoad from "@/contexts/initial-load-context";
// import { lcddot } from "@/fonts";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isInitialLoad } = useInitialLoad();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <motion.div
      initial={{ y: 24, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: (isInitialLoad ? 3 : 1) + index * 0.075,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4 pt-3 lg:pt-4 pb-5 lg:pb-6 rounded-xl lg:rounded-2xl bg-neutral-900 cursor-pointer group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          // Simple navigation without transitions for now
          window.location.href = `/work/${project.slug}`;
        }}
      >
        <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
          <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />

          <video
            ref={(el) => {
              if (el) {
                if (isHovered) {
                  el.play();
                } else {
                  setTimeout(() => {
                    el.pause();
                    el.currentTime = 0;
                  }, 1000);
                }
              }
            }}
            src={project.videoUrl}
            className="absolute top-1/2 -translate-y-1/12 left-1/2 -translate-x-1/2 w-[clamp(300px,65%,600px)] h-auto rounded-lg object-cover z-20 [clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)] group-hover:[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)] group-hover:-translate-y-6/12 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
            muted
            loop
            playsInline
          ></video>

          <div ref={containerRef} className="w-full h-full">
            <motion.div
              className="absolute inset-0 w-full h-[120%] -top-[10%] lg:-top-[15%]"
              style={{ y }}
            >
              <Image
                src={project.backgroundImageUrl}
                alt={project.title}
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-500 ease-in-out"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4">
          <div className="flex justify-between items-center w-full relative">
            <div className="flex items-center gap-2 lg:gap-3">
              <Image
                src={project.icon}
                alt={project.title}
                width={32}
                height={32}
                className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
              ></Image>
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-100 tracking-wide">
                {project.title}
              </p>
            </div>

            <div className="flex gap-3 lg:gap-5">
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
                {project.category}
              </p>
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
                {project.year}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center h-4 md:h-4.5 overflow-hidden relative w-full">
            <div className="absolute left-0 h-full w-8 lg:w-10 bg-gradient-to-r from-neutral-900/95 to-neutral-200/0 z-10" />
            <div className="absolute right-0 h-full w-8 lg:w-10 bg-gradient-to-l from-neutral-900/95 to-neutral-200/0 z-10" />

            <div className="flex overflow-hidden">
              <motion.p
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 32, ease: "linear", repeat: Infinity }}
                className={`font-mono text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5`}
              >
                {project.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}, </span>
                ))}
              </motion.p>
              <motion.p
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 32, ease: "linear", repeat: Infinity }}
                className={`font-mono text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5`}
              >
                {project.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}, </span>
                ))}
              </motion.p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}