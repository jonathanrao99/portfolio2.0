"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Technologies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;

    if (!container || !highlight) return;

    const firstItem = container.querySelector(".grid-item:first-child");

    const moveToElement = (element: HTMLElement) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        highlight.style.transform = `translate(${
          rect.left - containerRect.left
        }px, ${rect.top - containerRect.top}px)`;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;

        // Remove invert class from all images
        container.querySelectorAll("img").forEach((img) => {
          img.classList.remove("invert");
        });

        // Add invert class to the image in the current grid item
        const currentImage = element.querySelector("img");
        if (currentImage) {
          currentImage.classList.add("invert");
        }
      }
    };

    const moveHighlight = (e: MouseEvent) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

      if (hoveredElement && hoveredElement.classList.contains("grid-item")) {
        moveToElement(hoveredElement as HTMLElement);
      } else if (
        hoveredElement &&
        hoveredElement?.parentElement &&
        hoveredElement.parentElement.classList.contains("grid-item")
      ) {
        moveToElement(hoveredElement.parentElement);
      }
    };

    moveToElement(firstItem as HTMLElement);

    container.addEventListener("mousemove", moveHighlight);

    return () => {
      container.removeEventListener("mousemove", moveHighlight);
    };
  }, []);

  return (
    <section className="pb-16 sm:pb-20 lg:pb-24 px-3 sm:px-4 lg:px-8">
      <LetterScroll />

      <h4 className="text-sm sm:text-base font-semibold uppercase mb-3 sm:mb-4">Professional at</h4>
      <div ref={containerRef} className="relative">
        <div className="hidden lg:grid grid-rows-2">
          <div className="grid grid-cols-3 border-b border-neutral-300 h-[clamp(160px,18vw,300px)]">
            <a
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit React website"
            >
              <Image
                src="/images/tech/react.svg"
                alt="React"
                width={90}
                height={90}
                className="z-10 transition-all duration-300 w-16 h-16 lg:w-20 lg:h-20"
              />
            </a>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit Next.js website"
            >
              <Image
                src="/images/tech/nextjs.svg"
                alt="Next.js"
                width={120}
                height={120}
                className="z-10 transition-all duration-300 w-24 h-24 lg:w-28 lg:h-28"
              />
            </a>
            <a
              href="https://www.typescriptlang.org"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center group cursor-pointer"
              aria-label="Visit TypeScript website"
            >
              <Image
                src="/images/tech/typescript.svg"
                alt="TypeScript"
                width={70}
                height={70}
                className="z-10 transition-all duration-300 w-14 h-14 lg:w-16 lg:h-16"
              />
            </a>
          </div>

          <div className="grid grid-cols-5 h-[clamp(160px,15vw,300px)]">
            <a
              href="https://www.python.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit Python website"
            >
              <Image
                src="/images/tech/python.svg"
                alt="Python"
                width={70}
                height={70}
                className="z-10 transition-all duration-300 w-14 h-14 lg:w-16 lg:h-16"
              />
            </a>
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit Node.js website"
            >
              <Image
                src="/images/tech/nodejs.svg"
                alt="Node.js"
                width={70}
                height={70}
                className="z-10 transition-all duration-300 w-14 h-14 lg:w-16 lg:h-16"
              />
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit TailwindCSS website"
            >
              <Image
                src="/images/tech/tailwind.svg"
                alt="TailwindCSS"
                width={70}
                height={70}
                className="z-10 transition-all duration-300 w-14 h-14 lg:w-16 lg:h-16"
              />
            </a>
            <a
              href="https://aws.amazon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit AWS website"
            >
              <Image
                src="/images/tech/aws.svg"
                alt="AWS"
                width={70}
                height={70}
                className="z-10 transition-all duration-300 w-14 h-14 lg:w-16 lg:h-16"
              />
            </a>
            <a
              href="https://www.docker.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center group"
              aria-label="Visit Docker website"
            >
              <Image
                src="/images/tech/docker.svg"
                alt="Docker"
                width={70}
                height={70}
                className="z-10 transition-all duration-300 w-14 h-14 lg:w-16 lg:h-16"
              />
            </a>
          </div>
        </div>

        {/* Grid for mobile and tablet */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-0">
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-r border-b border-neutral-300 group cursor-pointer h-[clamp(120px,15vw,200px)]"
            aria-label="Visit React website"
          >
            <Image
              src="/images/tech/react.svg"
              alt="React"
              width={60}
              height={60}
              className="z-10 transition-all duration-300 w-12 h-12 sm:w-14 sm:h-14"
            />
          </a>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-b border-neutral-300 sm:border-r group cursor-pointer h-[clamp(120px,15vw,200px)]"
            aria-label="Visit Next.js website"
          >
            <Image
              src="/images/tech/nextjs.svg"
              alt="Next.js"
              width={80}
              height={80}
              className="z-10 transition-all duration-300 w-16 h-16 sm:w-18 sm:h-18"
            />
          </a>
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-r border-b border-neutral-300 sm:border-r-0 group cursor-pointer h-[clamp(120px,15vw,200px)]"
            aria-label="Visit TypeScript website"
          >
            <Image
              src="/images/tech/typescript.svg"
              alt="TypeScript"
              width={50}
              height={50}
              className="z-10 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12"
            />
          </a>
          <a
            href="https://www.python.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-b border-neutral-300 sm:border-r group cursor-pointer h-[clamp(120px,15vw,200px)]"
            aria-label="Visit Python website"
          >
            <Image
              src="/images/tech/python.svg"
              alt="Python"
              width={50}
              height={50}
              className="z-10 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12"
            />
          </a>
          <a
            href="https://nodejs.org/"
            target="_blank"
            className="grid-item flex items-center justify-center border-r border-b border-neutral-300 sm:border-r group cursor-pointer h-[clamp(120px,15vw,200px)]"
          >
            <Image
              src="/images/tech/nodejs.svg"
              alt="Node.js"
              width={50}
              height={50}
              className="z-10 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12"
            />
          </a>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-b border-neutral-300 sm:border-r-0 group cursor-pointer h-[clamp(120px,15vw,200px)]"
            aria-label="Visit TailwindCSS website"
          >
            <Image
              src="/images/tech/tailwind.svg"
              alt="TailwindCSS"
              width={50}
              height={50}
              className="z-10 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12"
            />
          </a>
        </div>
        <div
          ref={highlightRef}
          className="highlight hidden lg:block absolute top-0 left-0 bg-neutral-900 pointer-events-none transition-all duration-300"
        />
      </div>
    </section>
  );
}

function LetterScroll() {
  const containerRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.to(".letter", {
      yPercent: 100,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "40% 95%",
        end: "100% 80%",
        scrub: 1,
      },
      stagger: {
        each: 0.05,
        from: "random",
      },
    });
  }, []);

  return (
    <ul
      ref={containerRef}
      className="letter-scroll flex flex-col justify-center items-center h-[300px] sm:h-[400px] lg:h-[600px] py-16 sm:py-20 lg:py-24"
    >
      <li className="text-[clamp(2.5rem,12vw,6rem)] sm:text-[clamp(3rem,14vw,8rem)] lg:text-[clamp(4rem,14vw,15rem)] font-bold tracking-tight leading-[0.85] overflow-hidden flex">
        <span className="letter relative inline-block">
          <span>M</span>
          <span className="absolute bottom-full left-0">M</span>
        </span>
        <span className="letter relative inline-block">
          <span>O</span>
          <span className="absolute bottom-full left-0">O</span>
        </span>
        <span className="letter relative inline-block">
          <span>D</span>
          <span className="absolute bottom-full left-0">D</span>
        </span>
        <span className="letter relative inline-block">
          <span>E</span>
          <span className="absolute bottom-full left-0">E</span>
        </span>
        <span className="letter relative inline-block">
          <span>R</span>
          <span className="absolute bottom-full left-0">R</span>
        </span>
        <span className="letter relative inline-block">
          <span>N</span>
          <span className="absolute bottom-full left-0">N</span>
        </span>
      </li>
      <li className="text-[clamp(2.5rem,12vw,6rem)] sm:text-[clamp(3rem,14vw,8rem)] lg:text-[clamp(4rem,14vw,15rem)] font-bold tracking-tight leading-[0.9] lg:leading-[0.85] overflow-hidden flex">
        <span className="letter relative inline-block">
          <span>T</span>
          <span className="absolute bottom-full left-0">T</span>
        </span>
        <span className="letter relative inline-block">
          <span>E</span>
          <span className="absolute bottom-full left-0">E</span>
        </span>
        <span className="letter relative inline-block">
          <span>C</span>
          <span className="absolute bottom-full left-0">C</span>
        </span>
        <span className="letter relative inline-block mr-[clamp(12px,3vw,48px)]">
          <span>H</span>
          <span className="absolute bottom-full left-0">H</span>
        </span>

        <span className="letter relative inline-block">
          <span>S</span>
          <span className="absolute bottom-full left-0">S</span>
        </span>
        <span className="letter relative inline-block">
          <span>T</span>
          <span className="absolute bottom-full left-0">T</span>
        </span>
        <span className="letter relative inline-block">
          <span>A</span>
          <span className="absolute bottom-full left-0">A</span>
        </span>
        <span className="letter relative inline-block">
          <span>C</span>
          <span className="absolute bottom-full left-0">C</span>
        </span>
        <span className="letter relative inline-block">
          <span>K</span>
          <span className="absolute bottom-full left-0">K</span>
        </span>
      </li>
    </ul>
  );
}
