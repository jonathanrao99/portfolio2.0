"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import useInitialLoad from "@/contexts/initial-load-context";
import { WordRotate } from "./WordRotate";
import { HyperText } from "./HyperText";
import Image from "next/image";
import StickyFooter from "./StickyFooter";
import { VideoSlider } from "./VideoSlider";

// Animation constants for better maintainability
const HERO_ANIMATION_CONFIG = {
  SHOW_ELEMENTS_DELAY: 3400,
  JONATHAN_SCALE_DURATION: 1.2,
  JONATHAN_POSITION_DURATION: 1.6,
  JONATHAN_OPACITY_DELAY: 0.8,
  JONATHAN_SCALE_DELAY: 0.8,
  JONATHAN_POSITION_DELAY: 1.5,
  BANNER_DURATION: 1.2,
  VIDEO_DURATION: 1.4,
  TEXT_DURATION: 1.6,
} as const;

// Video URLs - extracted for better organization
const PROJECT_VIDEOS: string[] = [
  "/videos/SkySentiment.mp4",
  "/videos/McdonaldsDashboard.mp4",
  "/videos/NYCCollisions.mp4",
  "/videos/ChilledCoco.mp4"
];

export default function Hero() {
  const { isInitialLoad } = useInitialLoad();
  const [showOtherElements, setShowOtherElements] = useState(false);
  const nameAnimationRef = useRef<HTMLDivElement>(null);

  const roles = useMemo(() => [
    "Data Scientist",
    "UI/UX Designer", 
    "AI Tinkerer",
    "Full-Stack Dev"
  ], []);

  // Optimized timing for smoother sequence
  const showOtherElementsCallback = useCallback(() => {
    if (!isInitialLoad) {
      const timer = setTimeout(() => {
        setShowOtherElements(true);
      }, HERO_ANIMATION_CONFIG.SHOW_ELEMENTS_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    showOtherElementsCallback();
  }, [showOtherElementsCallback]);

  // Don't render anything until preloader is done
  if (isInitialLoad) {
    return null;
  }

  return (
    <section className="pt-4 lg:pb-24 min-h-screen relative">
      <div className="px-4">
        <h1 className="hidden">Jonathan Thota</h1>

        {/* Jonathan Thota - appears first when preloader finishes */}
        <motion.div
          ref={nameAnimationRef}
          initial={{
            scale: 0.25,
            top: "50%",
            y: "-50%",
            opacity: 0,
          }}
          animate={{
            scale: 1,
            top: "0px",
            y: "0px",
            opacity: 1,
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            opacity: {
              duration: 0.1,
              delay: HERO_ANIMATION_CONFIG.JONATHAN_OPACITY_DELAY,
            },
            scale: {
              duration: HERO_ANIMATION_CONFIG.JONATHAN_SCALE_DURATION,
              delay: HERO_ANIMATION_CONFIG.JONATHAN_SCALE_DELAY,
              ease: [0.22, 1, 0.36, 1],
            },
            top: {
              duration: HERO_ANIMATION_CONFIG.JONATHAN_POSITION_DURATION,
              delay: HERO_ANIMATION_CONFIG.JONATHAN_POSITION_DELAY,
              ease: [0.22, 1, 0.36, 1],
            },
            y: {
              duration: HERO_ANIMATION_CONFIG.JONATHAN_POSITION_DURATION,
              delay: HERO_ANIMATION_CONFIG.JONATHAN_POSITION_DELAY,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="absolute flex flex-col items-center justify-center left-4 right-4 origin-center will-change-transform"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: isInitialLoad ? 0.2 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full pointer-events-none mb-6"
            >
              <h1 className="text-[clamp(200px,15vw,120px)] font-semibold font-playfair text-gray-900 leading-none">
                Jonathan Thota
              </h1>
            </motion.div>
          </div>
        </motion.div>

        {/* Banner section - only shows after Jonathan Thota animation completes */}
        {showOtherElements && (
          <motion.div 
            className="overflow-hidden absolute left-4 right-4 xs:top-[80vh] sm:top-[70vh] md:top-[12.5vw] top-[72vh] pt-7"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2.0,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex flex-col gap-0.5 md:gap-0 md:flex-row justify-between items-center relative">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[clamp(20px,1.6vw,32px)] font-semibold leading-[1.2] text-center md:text-left text-gray-900"
                >
                  Turning Data into Stories
                </motion.p>
              </div>

              <div className="hidden md:block overflow-hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <motion.div
                  initial={{ y: 80, scale: 0.8 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{
                    duration: 1.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-[clamp(28px,2vw,48px)] h-[clamp(28px,2vw,48px)] relative group"
                >
                  <Image
                    src="/images/icons/star.svg"
                    alt="star"
                    fill
                    sizes="(max-width: 768px) 28px, 48px"
                    className="group-hover:rotate-[360deg] transition-transform duration-500 ease-in-out"
                  />
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[clamp(20px,1.6vw,32px)] font-semibold leading-[1.2] text-center md:text-left text-gray-900"
                >
                  Building brands that scale
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Section - only shows after Jonathan Thota animation completes */}
        {showOtherElements && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 2.2,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-[15vh] xs:mt-[19vh] sm:mt-[12vh] md:mt-[14vw] pt-6 md:pt-8 pb-4 md:pb-6 -mx-2 md:-mx-4"
            >
              <VideoSlider 
                videos={PROJECT_VIDEOS}
                className="w-full"
              />
            </motion.div>
            
            {/* Removed empty spacer div for cleaner code */}
          </>
        )}

        {/* Scroll indicators - positioned below video and close to screen height */}
        {showOtherElements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-[18vh] md:mt-[22vh] flex justify-between items-center px-4"
          >
            {/* Left side */}
            <div className="flex items-center gap-2">
              <ArrowDown className="w-4 h-4 text-gray-900" />
              <p className="text-sm font-medium font-saans">Scroll for</p>
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium font-saans">cool sh*t</p>
              <ArrowDown className="w-4 h-4 text-gray-900" />
            </div>
          </motion.div>
        )}

        {/* A Really Good text and HyperText - only shows after Jonathan Thota animation completes */}
        {showOtherElements && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-[-24vh] md:mt-[-28vh]"
          >
            <div className="flex justify-between items-center mb-[-20px] px-1 sm:px-2 lg:px-4">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl lg:text-2xl uppercase font-semibold font-saans"
              >
                A
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl lg:text-2xl uppercase font-semibold font-saans"
              >
                Seriously
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl lg:text-2xl uppercase font-semibold font-saans"
              >
                Good
              </motion.p>
            </div>
            
            <HyperText
              className="text-[clamp(100px,10vw,140px)] font-bold font-saans text-gray-900 leading-none mb-2 text-center w-full"
              duration={1200}
              delay={200}
              startOnView={false}
              animateOnHover={false}
              cycleWords={true}
              cycleDuration={3000}
            >
              {roles}
            </HyperText>
          </motion.div>
        )}

        {/* StickyHeader - only shows after Jonathan Thota animation completes */}
        <StickyFooter showOtherElements={showOtherElements} />
      </div>
    </section>
  );
}

 