"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import useInitialLoad from "@/contexts/initial-load-context";
import { useContactModalStore } from "@/lib/zustand/contactModalStore";

interface StickyFooterProps {
  showOtherElements: boolean;
}

export default function StickyFooter({ showOtherElements }: StickyFooterProps) {
  const { isInitialLoad } = useInitialLoad();
  const isModalOpen = useContactModalStore((state) => state.isModalOpen);

  // Don't render anything until other elements should show or if modal is open
  if (!showOtherElements || isModalOpen) {
    return null;
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay: 0.02, // Reduced to match other elements timing
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed bottom-0 left-0 right-0 z-50"
      >
      

      <div className="overflow-hidden fixed left-1/2 right-auto -translate-x-1/2 bottom-0 w-[90vw] max-w-[700px] flex justify-between items-start z-50 pb-2">
        {/* Left - US Based */}
        <div className="hidden lg:block">
          <span className="block overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="block font-medium text-[clamp(16px,1.2vw,20px)]"
            >
              India Based
            </motion.div>
          </span>
          <span className="block overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="block font-medium text-neutral-400 text-[clamp(16px,1.2vw,20px)]"
            >
              Working globally
            </motion.div>
          </span>
        </div>

        {/* Center - Building at */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="block overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="block font-medium text-[clamp(16px,1.2vw,20px)] text-center"
            >
              Building at
            </motion.div>
          </span>
          <span className="block overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="block font-medium text-[clamp(16px,1.2vw,20px)] text-center"
            >
              <a
                href="https://swiftguard.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="overflow-hidden h-6">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                    <span className="text-[clamp(16px,1.2vw,20px)] text-neutral-400 font-medium mb-1.5">
                      SwiftGuard
                    </span>
                    <span className="text-[clamp(16px,1.2vw,20px)] text-neutral-400 font-medium mb-1.5">
                      SwiftGuard
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          </span>
        </div>

        {/* Right - Freelance availability */}
        <div className="hidden lg:block">
          <span className="block overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="block font-medium text-[clamp(16px,1.2vw,20px)] text-right"
            >
              Freelance availability
            </motion.div>
          </span>
          <span className="block overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="block font-medium text-neutral-400 text-[clamp(16px,1.2vw,20px)] text-right"
            >
              Available now
            </motion.div>
          </span>
        </div>
      </div>
    </motion.footer>
  );
} 