"use client";

import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Copy from "./Copy";

type Service = {
  title: string;
  description: string;
  keywords: string[];
  image: string;
};

const services = [
  {
    title: "Data Science",
    description:
      "Transforming raw data into actionable insights through advanced analytics, machine learning, and statistical modeling to drive informed business decisions.",
    keywords: [
      "Machine Learning",
      "Statistical Analysis",
      "Data Visualization",
      "Predictive Modeling",
      "Python & R",
      "SQL Optimization",
    ],
    image: "/images/other/design.png",
  },
  {
    title: "AI Solutions",
    description:
      "Building intelligent systems and AI-powered applications that automate processes, enhance user experiences, and unlock new possibilities.",
    keywords: [
      "Neural Networks",
      "Deep Learning",
      "NLP Processing",
      "Computer Vision",
      "AI Integration",
      "Model Deployment",
    ],
    image: "/images/other/engineer.png",
  },
  {
    title: "Full-Stack Development",
    description:
      "Creating robust, scalable web applications with modern technologies, focusing on performance, user experience, and maintainable code.",
    keywords: [
      "React & Next.js",
      "TypeScript",
      "Node.js APIs",
      "Database Design",
      "Cloud Deployment",
      "UI/UX Design",
    ],
    image: "/images/other/me.png",
  },
];

export default function Services() {
  return (
    <section className="px-2 sm:px-3 lg:px-4 py-12 sm:py-16 lg:py-24">
      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24 bg-neutral-900 px-3 sm:px-4 pt-12 sm:pt-16 lg:pt-24 pb-4 rounded-xl sm:rounded-2xl lg:rounded-[20px]">
        <div className="lg:grid lg:grid-cols-12 gap-24">
          <div className="flex flex-col col-span-12 lg:col-span-10 lg:col-start-3">
            <Copy>
              <h2 className="text-xs sm:text-sm lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider mb-2">
                Services
              </h2>
            </Copy>
            <Copy>
              <p className="text-neutral-100 text-[clamp(20px,4vw,28px)] sm:text-[clamp(24px,3.8vw,36px)] lg:text-[clamp(24px,3.3vw,56px)] font-medium leading-[1.1] lg:leading-[1.05]">
                Combining data science expertise with full-stack development to create intelligent solutions that transform businesses and enhance user experiences.
              </p>
            </Copy>
          </div>
        </div>

        <div className="flex flex-col bg-neutral-800 rounded-lg sm:rounded-xl lg:rounded-2xl px-3 sm:px-4 lg:px-5">
          <ServicesList />
        </div>
      </div>
    </section>
  );
}

function ServicesList() {
  return (
    <ul className="flex flex-col">
      {services.map((service, index) => (
        <ServiceCard key={service.title} service={service} index={index} />
      ))}
    </ul>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const keywordsRef = useRef(null);
  const imageContainerRef = useRef(null);

  const isKeywordsInView = useInView(keywordsRef, {
    once: true,
    margin: "0px 0px -15% 0px",
  });
  const isImageInView = useInView(imageContainerRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-3vh", "3vh"]);

  return (
    <li className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8 pt-8 sm:pt-10 last:pb-4 not-last:pb-8 sm:not-last:pb-10 lg:last:pb-10 not-last:border-b not-last:border-neutral-700">
      <Copy>
        <p className="text-xs sm:text-sm lg:text-[clamp(14px,0.8vw,18px)] text-neutral-300 uppercase font-medium tracking-wider mb-1 lg:col-span-2">
          0{index + 1}
        </p>
      </Copy>

      <Copy>
        <h3 className="text-[clamp(20px,4vw,28px)] sm:text-[clamp(24px,3.8vw,36px)] lg:text-[clamp(24px,3.3vw,56px)] text-neutral-100 font-medium lg:col-span-4 mb-4 sm:mb-6 lg:mb-0 lg:-mt-4">
          {service.title}
        </h3>
      </Copy>

      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 lg:col-span-3 mb-6 sm:mb-8 lg:mb-0">
        <Copy>
          <p className="text-[clamp(14px,1.5vw,16px)] sm:text-[clamp(16px,1.3vw,18px)] lg:text-[clamp(16px,1.2vw,20px)] text-neutral-100 font-medium leading-[1.3]">
            {service.description}
          </p>
        </Copy>

        <ul ref={keywordsRef} className="flex gap-1.5 flex-wrap">
          {service.keywords.map((keyword, keywordIndex) => (
            <motion.li
              key={keyword}
              initial={{ y: 24, opacity: 0, scale: 0.9 }}
              animate={
                isKeywordsInView
                  ? { y: 0, opacity: 1, scale: 1 }
                  : { y: 24, opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 1,
                delay: keywordIndex * 0.025,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[9px] sm:text-[10px] text-neutral-100 uppercase tracking-[1.1] bg-neutral-100/10 px-2 sm:px-2.5 lg:px-3 pt-1.5 sm:pt-2 pb-1 sm:pb-1.5 rounded-md whitespace-nowrap font-mono"
            >
              {keyword}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div className="lg:col-span-3">
        <div
          ref={imageContainerRef}
          className="h-[180px] xs:h-[220px] sm:h-[300px] md:h-[350px] lg:h-[clamp(220px,15vw,360px)] rounded-lg overflow-hidden relative"
        >
          <motion.div
            className="absolute inset-0 w-full h-[120%] lg:-top-[10%]"
            style={{ y }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={
              isImageInView
                ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
                : {}
            }
            transition={{
              duration: 1.6,
              ease: [0.87, 0, 0.13, 1],
            }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </li>
  );
}