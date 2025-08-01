"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "motion/react";
import useWindowSize from "@/hooks/useWindowSize";
import { Volume2, VolumeX, ArrowDown } from "lucide-react";
import useInitialLoad from "@/contexts/initial-load-context";
import { WordRotate } from "./WordRotate";
import { HyperText } from "./HyperText";
import Image from "next/image";
import StickyFooter from "./StickyFooter";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { isInitialLoad } = useInitialLoad();
  const [showOtherElements, setShowOtherElements] = useState(false);
  const nameAnimationRef = useRef<HTMLDivElement>(null);

  const roles = [
    "Data Scientist",
    "UI/UX Designer", 
    "AI Tinkerer",
    "Full-Stack Developer"
  ];

  // Optimized timing for smoother sequence
  const showOtherElementsCallback = useCallback(() => {
    if (!isInitialLoad) {
      // Wait for Jonathan Thota animation to complete (1.8s duration + 1.6s delay = 3.4s)
      // Plus additional pause for cleaner separation
      const timer = setTimeout(() => {
        setShowOtherElements(true);
      }, 3400); // Reduced to 6.4s total (3s preloader + 3.4s name animation)
      
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
    <section className="pt-4 lg:pb-24 h-screen relative">
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
              delay: isInitialLoad ? 0.8 : 0.8,
            },
            scale: {
              duration: 1.2,
              delay: isInitialLoad ? 0.8 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
            top: {
              duration: 1.6,
              delay: isInitialLoad ? 1.5 : 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
            y: {
              duration: 1.6,
              delay: isInitialLoad ? 1.5 : 1.5,
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
              <h1 className="text-[clamp(200px,15vw,120px)] font-bold font-saans text-gray-900 leading-none">
                Jonathan Thota
              </h1>
            </motion.div>
          </div>
        </motion.div>

        {/* Banner section - only shows after Jonathan Thota animation completes */}
        {showOtherElements && (
          <motion.div 
            className="overflow-hidden absolute left-4 right-4 xs:top-[80vh] sm:top-[70vh] md:top-[12.5vw] top-[72vh] pt-2"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.02, // Further reduced delay
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex flex-col gap-0.5 md:gap-0 md:flex-row justify-between items-center relative">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.08, // Further reduced delay
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
                    duration: 1.2,
                    delay: 0.12, // Further reduced delay
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
                    duration: 1.2,
                    delay: 0.16, // Further reduced delay
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
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.4,
              delay: 0.20, // Further reduced delay
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-[19vh] xs:mt-[23vh] sm:mt-[12vh] md:mt-[14vw] pt-8"
          >
            <DesktopVideo />
          </motion.div>
        )}

        {/* Scroll indicators - positioned below video and close to screen height */}
        {showOtherElements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-[24vh] flex justify-between items-center px-4"
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
              duration: 1.6,
              delay: 0.30, // Further reduced delay
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-[100vh]"
          >
            <div className="flex justify-between items-center mb-[-20px] px-1 sm:px-2 lg:px-4">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.40, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl lg:text-2xl uppercase font-semibold font-saans"
              >
                A
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl lg:text-2xl uppercase font-semibold font-saans"
              >
                Seriously
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.50, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl lg:text-2xl uppercase font-semibold font-saans"
              >
                Good
              </motion.p>
            </div>
            
            <HyperText
              className="text-[clamp(100px,10vw,140px)] font-bold font-saans text-gray-900 leading-none mb-2 text-center w-full"
              duration={800}
              delay={600} // Further reduced delay
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

function DesktopVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isInView = useInView(videoContainerRef, { once: false });
  const [isMuted, setIsMuted] = useState(true);
  const { isInitialLoad } = useInitialLoad();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      const delay = isInitialLoad ? 2500 : 500;
      const timeoutId = setTimeout(() => {
        video.play().catch(() => {
          console.log("Autoplay failed");
        });
      }, delay);

      return () => clearTimeout(timeoutId);
    } else {
      video.pause();
    }
  }, [isInView, isInitialLoad]);

  useGSAP(() => {
    const videoContainer = videoContainerRef.current;

    if (!videoContainer) return;

    if (width >= 768) {
      const breakpoints = [
        { maxWidth: 900, translateY: 95, movMultiplier: 550 },
        { maxWidth: 1200, translateY: 105, movMultiplier: 600 },
        { maxWidth: 1600, translateY: 118, movMultiplier: 600 },
        { maxWidth: 2000, translateY: 110, movMultiplier: 700 },
        { maxWidth: 2500, translateY: 115, movMultiplier: 700 },
      ];

      const getInitialValues = () => {
        for (const br of breakpoints) {
          if (width <= br.maxWidth) {
            return {
              translateY: br.translateY,
              movementMultiplier: br.movMultiplier,
            };
          }
        }

        return {
          translateY: 125,
          movementMultiplier: 700,
        };
      };

      const initialValues = getInitialValues();

      const animationState = {
        scrollProgress: 0,
        initialTranslateY: initialValues.translateY,
        currentTranslateY: initialValues.translateY,
        movementMultiplier: initialValues.movementMultiplier,
        scale: 0.35,
        targetMouseX: 0,
        currentMouseX: 0,
      };

      gsap.timeline({
        scrollTrigger: {
          trigger: ".intro",
          start: "top bottom",
          end: "top 10%",
          scrub: true,
          onUpdate: (self) => {
            animationState.scrollProgress = self.progress;

            animationState.currentTranslateY = gsap.utils.interpolate(
              animationState.initialTranslateY,
              0,
              animationState.scrollProgress
            );

            animationState.scale = gsap.utils.interpolate(
              0.35,
              1,
              animationState.scrollProgress
            );
          },
        },
      });

      document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        animationState.targetMouseX = (mouseX / width - 0.5) * 2;
      });

      const animate = () => {
        if (width < 768) return;

        const { scale, targetMouseX, currentMouseX, currentTranslateY } =
          animationState;

        const margin = 32;
        const videoWidth = videoContainer.offsetWidth * scale;
        const maxTranslate = (width - margin * 2 - videoWidth) / 2;

        let horizontalMovement = targetMouseX * maxTranslate;
        horizontalMovement = Math.max(
          Math.min(horizontalMovement, maxTranslate),
          -maxTranslate
        );

        animationState.currentMouseX = gsap.utils.interpolate(
          currentMouseX,
          horizontalMovement,
          0.15
        );

        videoContainer.style.transform = `translateY(${currentTranslateY}vh) translateX(${animationState.currentMouseX}px) scale(${scale})`;
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, [width]);

  return (
    <motion.div
      ref={videoContainerRef}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0 0)" }}
      transition={{
        duration: 1.2,
        delay: isInitialLoad ? 2.6 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="video-preview relative w-full max-w-lg mx-auto aspect-video overflow-hidden rounded-3xl will-change-transform cursor-pointer"
      onClick={() => setIsMuted(!isMuted)}
    >
      <div className="video-wrapper absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
        <motion.video
          ref={videoRef}
          src="/videos/hero-video-compressed.mp4"
          muted={isMuted}
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none"
        />
      </div>
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: isInitialLoad ? 1 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 z-10 scale-0 group-hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        role="button"
      >
        <div className="bg-neutral-100/50 shadow-2xl backdrop-blur-2xl w-[4vw] h-[4vw] rounded-full flex items-center justify-center">
          {isMuted ? (
            <Volume2
              className="w-[2vw] h-[2vw] text-neutral-900"
              aria-hidden="true"
            />
          ) : (
            <VolumeX
              className="w-[2vw] h-[2vw] text-neutral-900"
              aria-hidden="true"
            />
          )}
        </div>
      </motion.button>
    </motion.div>
  );
} 