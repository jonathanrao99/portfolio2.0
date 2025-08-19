"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, ReactElement } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface CopyProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
}: CopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let elements: HTMLElement[] = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        // Simple line-by-line reveal animation
        const lines = element.querySelectorAll('*');
        
        lines.forEach((line) => {
          gsap.set(line, { yPercent: 100, opacity: 0 });
          
          const animationProps = {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            delay: delay,
          };

          if (animateOnScroll) {
            gsap.to(line, {
              ...animationProps,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                once: true,
              },
            });
          } else {
            gsap.to(line, animationProps);
          }
        });
      });
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    }
  );

  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    const child = children as ReactElement<{ ref?: React.Ref<HTMLElement> }>;
    return React.cloneElement(child, { ref: containerRef });
  }

  return (
    <div
      ref={containerRef}
      data-copy-wrapper="true"
    >
      {children}
    </div>
  );
}
