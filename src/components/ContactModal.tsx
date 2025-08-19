"use client";

import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { useContactModalStore } from "@/lib/zustand/contactModalStore";
import ContactForm, { ContactFormRef } from "./ContactForm";
import { cubicBezier } from "motion";
import { X } from "lucide-react";

export default function ContactModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<ContactFormRef>(null);
  const isModalOpen = useContactModalStore((state) => state.isModalOpen);
  const toggleModal = useContactModalStore((state) => state.toggleModal);
  const easeInOutQuart = cubicBezier(0.76, 0, 0.24, 1);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isModalOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
                    className={`fixed top-0 left-0 inset-0 bg-purple-900/60 h-[100dvh] w-screen ${
              isModalOpen ? "" : "pointer-events-none"
            }`}
      ></motion.div>

      <motion.div
        initial={{ y: "110%" }}
        animate={isModalOpen ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1, ease: easeInOutQuart }}
        ref={modalRef as React.RefObject<HTMLDivElement>}
                    className="fixed top-32 bottom-4 left-4 right-4 px-6 py-8 pb-20 lg:p-10 bg-stone-100 rounded-2xl lg:rounded-3xl z-[9999] will-change-transform overflow-y-auto scrollbar-hide"
      >
                  <motion.button
            onClick={toggleModal}
            className="fixed top-10 right-6 lg:top-8 lg:right-8 2xl:top-12 2xl:right-12 w-10 lg:w-12 2xl:w-16 h-10 lg:h-12 2xl:h-16 rounded-full flex items-center justify-center bg-purple-600 z-[9999] cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white text-3xl lg:text-4xl 2xl:text-5xl font-bold" style={{ lineHeight: '1', marginTop: '-s2px' }}>×</span>
          </motion.button>

                    <div className="h-full overflow-y-auto pb-16 scrollbar-hide">
          <ContactForm ref={formRef} />
        </div>
      </motion.div>
    </>
  );
} 