"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { wrapWordsInSpan } from "@/utils/string";
import useWindowSize from "@/hooks/useWindowSize";
import Copy from "./Copy";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { width } = useWindowSize();

  const isVideoInView = useInView(videoRef, {
    once: false,
    margin: "0px 0px -30% 0px",
  });

  useGSAP(() => {
    if (width < 1024) return;

    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    wrapWordsInSpan(paragraph);

    const words = paragraph.querySelectorAll("span");

    words.forEach((word) => {
      word.classList.add("word" + Math.floor(Math.random() * 4));
    });

    // Animate words based on their random class
    document.querySelectorAll("#about .word1").forEach((el) => {
      gsap.to(el, {
        x: "-0.8em",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.2,
        },
      });
    });

    document.querySelectorAll("#about .word2").forEach((el) => {
      gsap.to(el, {
        x: "1.6em",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.2,
        },
      });
    });

    document.querySelectorAll("#about .word3").forEach((el) => {
      gsap.to(el, {
        x: "-2.4em",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.2,
        },
      });
    });
  }, [width]);

  return (
    <section
      id="about"
      className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-16 sm:pb-20 md:pb-24 lg:pb-28 p-3 sm:p-4 md:p-6 lg:px-8"
    >
      <div className="flex flex-col col-span-12 lg:col-span-7">
        <Copy>
          <h4 className="text-sm sm:text-base md:text-lg font-semibold uppercase mb-3 sm:mb-4">About Me</h4>
        </Copy>

        {/* Mobile video */}
        <div className="lg:hidden col-span-12 aspect-video rounded-lg overflow-hidden mb-3 sm:mb-4">
          <motion.video
            ref={videoRef}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={isVideoInView ? { clipPath: "inset(0 0 0 0)" } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src="/videos/hero-video-compressed.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none w-full h-full object-cover"
          />
        </div>

        <p
          ref={paragraphRef}
          className="hidden lg:block text-[clamp(1.5rem,4vw,3rem)] sm:text-[clamp(2rem,4.5vw,4rem)] md:text-[clamp(2.5rem,5vw,5rem)] lg:text-[clamp(3rem,3.5vw,6rem)] font-semibold tracking-tight leading-none"
        >
          Passionate about merging data science and design, I craft meaningful insights and interactive experiences. With a focus on user experience, performance, and detail, I help bring data-driven products to life for forward-thinking organizations around the world.
        </p>

        <Copy>
          <p
            className="lg:hidden text-[clamp(1.5rem,6vw,2.5rem)] sm:text-[clamp(2rem,5vw,3rem)] font-semibold tracking-tight leading-none"
          >
            Passionate about merging data science and design, I craft meaningful insights and interactive experiences. With a focus on user experience, performance, and detail, I help bring data-driven products to life for forward-thinking organizations around the world.
          </p>
        </Copy>
      </div>

      {/* Desktop video */}
      <div className="hidden lg:block h-full col-span-5">
        <div className="sticky top-[calc(100vh-20vw-172px)] w-full aspect-video rounded-lg lg:rounded-xl overflow-hidden">
          <video
            src="/videos/hero-video-compressed.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
