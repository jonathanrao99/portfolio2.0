"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Menu, X, Send } from "lucide-react";
import useInitialLoad from "@/contexts/initial-load-context";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useContactModalStore } from "@/lib/zustand/contactModalStore";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    title: "Work",
    href: "#work",
    imageUrl: "/images/pages/work-icon.png",
  },
  {
    title: "Lab",
    href: "#lab",
    imageUrl: "/images/pages/lab-icon.png",
  },
  {
    title: "Get in Touch",
    href: "#contact",
    imageUrl: "/images/pages/contact-icon.png",
  },
  {
    title: "Resume",
    href: "#resume",
    imageUrl: "/images/pages/resume-icon.png",
  },
];

export default function TopBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isInitialLoad } = useInitialLoad();
  const isModalOpen = useContactModalStore((state) => state.isModalOpen);
  const toggleModal = useContactModalStore((state) => state.toggleModal);
  const pathname = usePathname();
  const router = useRouter();

  useOnClickOutside(isOpen, ref as React.RefObject<HTMLElement>, () =>
    setIsOpen(false)
  );

  useEffect(() => {
    // Always show TopBar on work and lab pages
    if (pathname === '/work' || pathname === '/lab') {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Show the bar when user scrolls below the hero section
      // This will be triggered when scrolling past the banner text and star
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // 80% of viewport height
      
      if (scrollPosition > heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <motion.div 
      className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center"
      initial={{ opacity: 0, y: -100, scale: 0.95 }}
      animate={{ 
        opacity: (isVisible || isModalOpen) ? 1 : 0, 
        y: (isVisible || isModalOpen) ? 0 : -100, 
        scale: (isVisible || isModalOpen) ? 1 : 0.95 
      }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        ref={ref}
        className="py-2 pl-2 pr-4 md:pr-8 rounded-2xl md:rounded-[20px] bg-neutral-900 border border-neutral-800 z-50 overflow-hidden"
        animate={isModalOpen ? { width: "40vw", maxWidth: "300px" } : { width: "80vw", maxWidth: "600px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="h-[60px] w-[60px] md:h-[80px] md:w-[80px] rounded-lg md:rounded-xl bg-neutral-100 overflow-hidden relative">
              <img
                src="/images/me/me.jpg"
                alt="Jonathan Thota"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:gap-2 w-[200px] sm:w-[400px] relative">
              <motion.div 
                className="md:text-lg font-semibold text-neutral-100 uppercase"
                animate={isModalOpen ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isModalOpen ? "Submit" : "Jonathan Thota"}
              </motion.div>
              {!isModalOpen && <Slider />}
            </div>
          </div>

          {isModalOpen ? (
            <motion.button
              onClick={toggleModal}
              className="flex items-center gap-3 px-6 py-3 bg-purple-600 rounded-full text-white font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm lg:text-base">Submit</span>
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          ) : isOpen ? (
            <X
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-7 h-7 text-neutral-100 hover:text-neutral-400 transition-all duration-300 cursor-pointer"
              aria-label="Close menu"
              role="button"
              aria-expanded={isOpen}
              aria-controls="navigation-menu"
            />
          ) : (
            <Menu
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-7 h-7 text-neutral-100 hover:text-neutral-400 transition-all duration-300 cursor-pointer"
              aria-label="Open menu"
              role="button"
              aria-expanded={isOpen}
              aria-controls="navigation-menu"
            />
          )}
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="overflow-hidden"
        >
          <div className="pt-4">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: isOpen ? "100%" : "0%" }}
              transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
              className="h-px rounded bg-neutral-800"
            ></motion.div>
          </div>

          <nav className="flex flex-col gap-4 mb-4 mt-4">
            {navItems.map((item, index) => {
              return (
                <NavItem
                  key={item.title}
                  {...item}
                  index={index}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              );
            })}
          </nav>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Slider() {
  return (
    <div className="flex justify-center items-center h-4 md:h-4.5 overflow-hidden relative w-full">
      <div className="absolute left-0 h-full w-10 bg-gradient-to-r from-neutral-900/95 to-neutral-900/0 z-10" />
      <div className="absolute right-0 h-full w-10 bg-gradient-to-l from-neutral-900/95 to-neutral-900/0 z-10" />

      <div className="flex overflow-hidden">
        <motion.p
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          className="text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5"
        >
          Data Scientist, UI/UX Designer, AI Tinkerer, Full-Stack Dev,
        </motion.p>
        <motion.p
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          className="text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5"
        >
          Data Scientist, UI/UX Designer, AI Tinkerer, Full-Stack Dev,
        </motion.p>
      </div>
    </div>
  );
}

function NavItem({
  title,
  href,
  imageUrl,
  index,
  isOpen,
  setIsOpen,
}: {
  title: string;
  href: string;
  imageUrl: string;
  index: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const openModal = useContactModalStore((state) => state.openModal);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (title === "Get in Touch") {
      openModal();
    } else if (title === "Lab") {
      router.push("/lab");
    } else if (title === "Work") {
      router.push("/work");
    } else if (title === "Resume") {
      window.open("/JonathanResume.pdf", "_blank");
    } else {
      // Handle other navigation items
      router.push(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="flex items-center gap-5 group cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.9,
          y: isOpen ? 0 : 24,
        }}
        transition={{
          duration: 0.5,
          delay: 0.4 + -index * 0.075,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-lg md:rounded-xl overflow-hidden relative"
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
          <span className="text-white text-lg font-bold">{title.charAt(0)}</span>
        </div>
      </motion.div>
      <div className="overflow-hidden h-8">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isOpen ? "0%" : "100%" }}
          transition={{
            duration: 0.5,
            delay: 0.2 + -index * 0.075,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2"
        >
          <span className="text-lg md:text-xl font-semibold text-neutral-100 mb-1.5">
            {title}
          </span>
          <span className="text-lg md:text-xl font-semibold text-neutral-100 mb-1.5">
            {title}
          </span>
        </motion.div>
      </div>
    </a>
  );
} 