"use client";

import { motion } from "motion/react";
import useInitialLoad from "@/contexts/initial-load-context";

const projects = [
  { title: "MAKING LASTING IMPACTS IN THE INDUSTRY", color: "bg-blue-100" },
  { title: "I would like to request You can reach me by email at", color: "bg-green-100" },
  { title: "DAVID WEBB: WHEN LIFE MEETS 35MM", color: "bg-purple-100" },
  { title: "CONCRETE Music", color: "bg-orange-100" },
  { title: "Resume", color: "bg-pink-100" },
  { title: "Hello David, my name is I would like to request", color: "bg-yellow-100" },
  { title: "DAVID WEBB: WHEN LIFE MEETS 35MM", color: "bg-indigo-100" },
  { title: "Project Preview", color: "bg-red-100" },
  { title: "Another Project", color: "bg-teal-100" },
];

export default function ProjectGrid() {
  const { isInitialLoad } = useInitialLoad();

  return (
    <section className="pt-32 pb-16 px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: isInitialLoad ? 4 : 2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="grid grid-cols-3 gap-4 max-w-4xl mx-auto"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: isInitialLoad ? 4.2 + index * 0.1 : 2.2 + index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`${project.color} aspect-[4/3] rounded-lg p-4 flex items-center justify-center text-center`}
          >
            <p className="text-xs font-medium text-gray-700 leading-tight">
              {project.title}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 