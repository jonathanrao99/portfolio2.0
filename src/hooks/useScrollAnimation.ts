"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useScrollAnimation(
  animation: (element: HTMLElement) => gsap.core.Timeline,
  options: UseScrollAnimationOptions = {}
) {
  const elementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create the animation timeline with the element reference
    const tl = animation(element);
    timelineRef.current = tl;

    // Set up ScrollTrigger
    ScrollTrigger.create({
      trigger: element,
      start: options.start || "top 80%",
      end: options.end || "bottom 20%",
      scrub: options.scrub || false,
      markers: options.markers || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
      animation: tl,
    });

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, options]);

  return elementRef;
}

// Predefined animation functions that accept element references
export const fadeInUp = (element: HTMLElement) => gsap.timeline()
  .fromTo(element, 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  );

export const fadeInLeft = (element: HTMLElement) => gsap.timeline()
  .fromTo(element,
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  );

export const fadeInRight = (element: HTMLElement) => gsap.timeline()
  .fromTo(element,
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  );

export const scaleIn = (element: HTMLElement) => gsap.timeline()
  .fromTo(element,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
  );

export const staggerChildren = (element: HTMLElement, stagger = 0.1) => gsap.timeline()
  .fromTo(element.children,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger, ease: "power2.out" }
  ); 