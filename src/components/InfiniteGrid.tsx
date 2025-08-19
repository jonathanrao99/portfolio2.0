"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Observer from "gsap/Observer";
import useInitialLoad from "@/contexts/initial-load-context";
import { labs } from "@/data/labs";

gsap.registerPlugin(Observer);

export default function InfiniteGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isInitialLoad } = useInitialLoad();

  useGSAP(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const halfX = container.clientWidth / 2;
    const wrapX = gsap.utils.wrap(-halfX, 0);
    const xTo = gsap.quickTo(container, "x", {
      duration: 1.5, // Will change over 1.5s
      ease: "power4", // Non-linear
      modifiers: {
        x: gsap.utils.unitize(wrapX),
      },
    });

    const halfY = container.clientHeight / 2;
    const wrapY = gsap.utils.wrap(-halfY, 0);
    const yTo = gsap.quickTo(container, "y", {
      duration: 1.5, // Will change over 1.5s
      ease: "power4", // Non-linear
      modifiers: {
        y: gsap.utils.unitize(wrapY),
      },
    });

    let incrX = 0,
      incrY = 0;

    // Observer to handle wheel and drag events
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer", // Handles wheel, touch, and drag
      onChangeX: (self) => {
        if (self.event.type === "wheel") incrX -= self.deltaX;
        else incrX += self.deltaX * 2;

        xTo(incrX); // smoothly animate to the new x position
      },
      onChangeY: (self) => {
        if (self.event.type === "wheel")
          incrY -= self.deltaY; // Update incrY based on the vertical movement
        else incrY += self.deltaY * 2;

        yTo(incrY); // Smoothly animate to the new y position
      },
    });

    // Cleanup function
    return () => {
      observer.kill();
    };
  }, []);

  // Function to render a set of media items
  const renderMediaItems = (ariaHidden?: boolean) => (
    <div
      className="grid w-max grid-cols-[repeat(5,1fr)] gap-[10vw] p-[5vw] pointer-events-none"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {labs.map((path, index) => (
        <motion.div
                     className="w-[60vw] md:w-[25vw] aspect-[4/3] select-none will-change-[scale,clipPath] rounded-xl overflow-hidden z-0 relative"
          key={`${index}-${ariaHidden ? "hidden" : "visible"}`}
          initial={
            ariaHidden
              ? undefined
              : {
                  clipPath: "polygon(15% 50%, 85% 50%, 85% 50%, 15% 50%)",
                  scale: 1.3,
                }
          }
          animate={
            ariaHidden
              ? undefined
              : {
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  scale: 1,
                }
          }
          transition={
            ariaHidden
              ? undefined
              : {
                  duration: 1,
                  delay: isInitialLoad ? 2.8 : 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }
          }
        >
          {path.includes(".png") || path.includes(".jpg") || path.includes(".jpeg") ? (
            <Image
              src={path || "/placeholder.svg"}
              alt=""
              fill
              className="w-full h-full object-cover z-0"
            />
          ) : (
            <video
              src={path}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover z-0"
            />
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="h-screen w-full overflow-hidden pointer-events-none">
      <div
        ref={containerRef}
        className="grid grid-cols-[repeat(2,1fr)] w-max will-change-transform"
      >
        {/* Original content */}
        {renderMediaItems()}

        {/* Duplicates for infinite scrolling effect */}
        {renderMediaItems(true)}
        {renderMediaItems(true)}
        {renderMediaItems(true)}
      </div>
    </section>
  );
}
