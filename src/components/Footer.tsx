"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useContactModalStore } from "@/lib/zustand/contactModalStore";
import { useRouter } from "next/navigation";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleModal = useContactModalStore((state) => state.toggleModal);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <footer className="bg-neutral-100">
      <div
        ref={containerRef}
        className="px-2 sm:px-3 lg:px-4 pt-6 sm:pt-8 lg:pt-16 pb-6 sm:pb-8 lg:pb-4 grid grid-cols-12 gap-2 sm:gap-3 lg:gap-4 relative"
      >
        <motion.h2
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[clamp(3rem,12vw,8rem)] sm:text-[clamp(4rem,14vw,12rem)] lg:text-[clamp(6rem,14vw,15rem)] tracking-tight text-gray-200 pointer-events-none"
        >
          Jonathan
        </motion.h2>

        <div
          onClick={() => router.push("/work")}
          className="col-span-12 lg:col-span-8 flex items-end p-3 sm:p-4 lg:p-6 bg-neutral-300/50 backdrop-blur-sm h-[160px] sm:h-[180px] lg:h-[350px] rounded-lg lg:rounded-xl text-[clamp(14px,1.6vw,18px)] sm:text-[clamp(16px,1.4vw,24px)] font-medium leading-tight cursor-pointer hover:backdrop-blur-md transition-all duration-500"
        >
          Work
        </div>
        
        <div
          onClick={() => router.push("/lab")}
          className="col-span-12 lg:col-span-4 flex items-end p-3 sm:p-4 lg:p-6 bg-neutral-300/50 backdrop-blur-sm h-[160px] sm:h-[180px] lg:h-[350px] rounded-lg lg:rounded-xl text-[clamp(14px,1.6vw,18px)] sm:text-[clamp(16px,1.4vw,24px)] font-medium leading-tight cursor-pointer hover:backdrop-blur-md transition-all duration-500"
        >
          Lab
        </div>

        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-rows-2 gap-2 sm:gap-3 lg:gap-4">
          <a
            href="mailto:jonathanthota@outlook.com"
            className="lg:col-span-12 flex items-end p-3 sm:p-4 lg:p-6 bg-neutral-300/50 backdrop-blur-sm h-[100px] sm:h-[120px] lg:h-full rounded-lg lg:rounded-xl text-[clamp(12px,1.4vw,16px)] sm:text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(16px,1.4vw,24px)] font-medium leading-tight cursor-pointer hover:backdrop-blur-md transition-all duration-500"
          >
            Email
          </a>
          <div
            onClick={toggleModal}
            className="lg:col-span-12 flex items-end p-3 sm:p-4 lg:p-6 bg-neutral-300/50 backdrop-blur-sm h-[100px] sm:h-[120px] lg:h-full rounded-lg lg:rounded-xl text-[clamp(12px,1.4vw,16px)] sm:text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(16px,1.4vw,24px)] font-medium leading-tight cursor-pointer hover:backdrop-blur-md transition-all duration-500"
          >
            Get in Touch
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/jonathan-thota/"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 lg:col-span-4 flex items-end p-3 sm:p-4 lg:p-6 bg-neutral-300/50 backdrop-blur-sm h-[100px] sm:h-[120px] lg:h-[350px] rounded-lg lg:rounded-xl text-[clamp(12px,1.4vw,16px)] sm:text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(16px,1.4vw,24px)] font-medium leading-tight cursor-pointer hover:backdrop-blur-md transition-all duration-500"
        >
          LinkedIn
        </a>

        <a
          href="/JonathanResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 lg:col-span-4 flex items-end p-3 sm:p-4 lg:p-6 bg-neutral-300/50 backdrop-blur-sm h-[100px] sm:h-[120px] lg:h-[350px] rounded-lg lg:rounded-xl text-[clamp(12px,1.4vw,16px)] sm:text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(16px,1.4vw,24px)] font-medium leading-tight cursor-pointer hover:backdrop-blur-md transition-all duration-500"
        >
          Resume
        </a>
      </div>
    </footer>
  );
}
