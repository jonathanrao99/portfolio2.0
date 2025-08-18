"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface RevealedImage {
  src: string;
  x: number;
  y: number;
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [revealedImages, setRevealedImages] = useState<RevealedImage[]>([]);
  const [lastRevealIndex, setLastRevealIndex] = useState(0);
  const [statusText, setStatusText] = useState("Pretending to load");
  const [lastRevealPosition, setLastRevealPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  
  // Tech stack icons and work samples
  const images = [
    "/images/tech/react.svg",
    "/images/tech/nextjs.svg", 
    "/images/tech/typescript.svg",
    "/images/tech/tailwind.svg",
    "/images/tech/nodejs.svg",
    "/images/tech/python.svg",
    "/images/tech/docker.svg",
    "/images/tech/aws.svg",
  ];

  useGSAP(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 1;
        if (nextProgress === 100) {
          setStatusText("Loading complete");
          clearInterval(interval);
          // Upward opening animation instead of downward
          gsap.to(ref.current, {
            yPercent: -100,
            ease: "expo.in",
            duration: 1,
            delay: 0.5,
          });
        }
        return nextProgress;
      });
    }, 18);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const revealImage = (x: number, y: number) => {
      const distance = Math.sqrt(
        Math.pow(x - lastRevealPosition.x, 2) +
          Math.pow(y - lastRevealPosition.y, 2)
      );
      if (distance > 50) {
        const nextIndex = (lastRevealIndex + 1) % images.length;
        const image = images[nextIndex];
        const newImage = { src: image, x, y };
        setRevealedImages((prevImages) => [...prevImages, newImage]);
        setTimeout(() => {
          setRevealedImages((prevImages) =>
            prevImages.filter((img) => img !== newImage)
          );
        }, 500);
        setLastRevealPosition({ x, y });
        setLastRevealIndex(nextIndex);
      }
    };

    const handleMouseMove = (event: any) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
      revealImage(clientX, clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [images]);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-[100dvh] flex flex-col items-center justify-center bg-black z-50 overflow-hidden"
    >
      {revealedImages.map((image, index) => (
        <Image
          priority
          key={index}
          src={image.src}
          alt={`Tech icon ${index}`}
          className="fixed rounded"
          height={100}
          width={100}
          style={{
            left: image.x,
            top: image.y,
            pointerEvents: "none",
          }}
        />
      ))}
      <div className="absolute bottom-5 left-5 uppercase text-sm tracking-tighter text-white font-mono">
        ({statusText})
      </div>
      <h1 className="absolute bottom-5 right-5 leading-[80%] tracking-tighter font-semibold text-white text-9xl">
        {progress}
      </h1>
    </div>
  );
} 