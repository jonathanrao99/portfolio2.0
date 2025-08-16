'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView, useMotionValue, animate } from 'motion/react';
import useInitialLoad from '@/contexts/initial-load-context';
import useMeasure from 'react-use-measure';

// Animation constants
const ANIMATION_CONFIG = {
  BASE_DURATION: 40,
  HOVER_DURATION: 120,
  SCROLL_THRESHOLD: 100,
  MAX_SCALE: 2.5,
  SCALE_RANGE: 500,
  SCALE_MULTIPLIER: 50,
  CLIP_DURATION: 1.2,
  CLIP_DELAY_INITIAL: 2.6,
  CLIP_DELAY_NORMAL: 0.2,
  THROTTLE_MS: 16, // ~60fps
  VIDEO_PLAY_DELAY_INITIAL: 2500,
  VIDEO_PLAY_DELAY_NORMAL: 500,
} as const;

// Responsive video dimensions
const getVideoDimensions = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return {
    width: isMobile ? '320px' : '400px',
    height: isMobile ? '180px' : '225px',
  };
};

type VideoSliderProps = {
  videos: string[];
  className?: string;
};

export function VideoSlider({ videos, className }: VideoSliderProps) {
  const [ref, { width }] = useMeasure();
  const translation = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [centerVideoIndex, setCenterVideoIndex] = useState(0);
  const [key, setKey] = useState(0);
  const { isInitialLoad } = useInitialLoad();
  const animationRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Optimized scroll detection with throttling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const isUserScrolling = scrollPosition > ANIMATION_CONFIG.SCROLL_THRESHOLD;
    
    setIsScrolling(isUserScrolling);
    
    if (isUserScrolling && containerRef.current) {
      const viewportCenter = window.innerWidth / 2;
      const videoElements = containerRef.current.querySelectorAll('[data-video-index]');
      
      let closestIndex = 0;
      let smallestDistance = Infinity;
      
      videoElements.forEach((element) => {
        const dataIndex = element.getAttribute('data-video-index');
        if (dataIndex !== null) {
          const index = parseInt(dataIndex, 10);
          const rect = element.getBoundingClientRect();
          const videoCenter = rect.left + rect.width / 2;
          const distance = Math.abs(videoCenter - viewportCenter);
          
          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = index;
          }
        }
      });
      
      setCenterVideoIndex(closestIndex);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, ANIMATION_CONFIG.THROTTLE_MS);
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Optimized infinite scroll animation
  const animationConfig = useMemo(() => ({
    contentSize: width,
    from: 0,
    to: -width / 2,
    duration: isHovered ? ANIMATION_CONFIG.HOVER_DURATION : ANIMATION_CONFIG.BASE_DURATION,
  }), [width, isHovered]);

  useEffect(() => {
    if (!width || isScrolling) return;
    
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const { from, to, duration } = animationConfig;
    const currentPosition = translation.get();
    const progress = Math.abs(currentPosition / (to - from));
    const adjustedDuration = duration * (1 - progress);
    
    animationRef.current = animate(translation, [currentPosition, to], {
      ease: 'linear',
      duration: adjustedDuration,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
      onRepeat: () => translation.set(from),
    });

    return () => animationRef.current?.stop();
  }, [animationConfig, translation, isScrolling]);

  if (!videos || videos.length === 0) {
    return <div className="text-red-500">No videos available</div>;
  }

  return (
    <div ref={containerRef} className={`w-full mx-auto py-8 ${className || ''}`}>
      <motion.div
        className='flex w-max items-center'
        style={{
          x: translation,
          gap: '0px', // Remove gap, using margin on cards instead
        }}
        ref={ref}
        onHoverStart={() => {
          setIsHovered(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
        }}
      >
        {/* First set of videos */}
        {videos.map((video, index) => {
          const isCenter = index === centerVideoIndex && isScrolling;
          return (
            <VideoCard 
              key={`first-${index}`} 
              video={video} 
              index={index}
              isCenter={isCenter}
              isScrolling={isScrolling}
              dataIndex={index}
            />
          );
        })}
        {/* Duplicate set for seamless loop */}
        {videos.map((video, index) => (
          <VideoCard 
            key={`second-${index}`} 
            video={video} 
            index={index + videos.length}
            isCenter={(index + videos.length) === centerVideoIndex && isScrolling}
            isScrolling={isScrolling}
          />
        ))}
      </motion.div>
    </div>
  );
}

function VideoCard({ 
  video, 
  index, 
  isCenter, 
  isScrolling,
  dataIndex 
}: { 
  video: string;
  index: number;
  isCenter: boolean;
  isScrolling: boolean;
  dataIndex?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoContainerRef, { once: false });
  const [isMuted, setIsMuted] = useState(true);
  const { isInitialLoad } = useInitialLoad();
  
  // Optimized scale calculation
  const [scrollScale, setScrollScale] = useState(1);
  
  const handleVideoScroll = useCallback(() => {
    if (!isCenter) {
      setScrollScale(1);
      return;
    }
    
    const scrollPosition = window.scrollY || window.pageYOffset;
    const progress = Math.min(Math.max((scrollPosition - ANIMATION_CONFIG.SCROLL_THRESHOLD) / ANIMATION_CONFIG.SCALE_RANGE, 0), 1);
    const scale = 1 + (progress * (ANIMATION_CONFIG.MAX_SCALE - 1));
    
    setScrollScale(scale);
  }, [isCenter]);
  
  useEffect(() => {
    let rafId: number;
    const throttledVideoScroll = () => {
      rafId = requestAnimationFrame(handleVideoScroll);
    };
    
    window.addEventListener('scroll', throttledVideoScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledVideoScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleVideoScroll]);

  // Optimized video playback management
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isInView) {
      const delay = isInitialLoad ? ANIMATION_CONFIG.VIDEO_PLAY_DELAY_INITIAL : ANIMATION_CONFIG.VIDEO_PLAY_DELAY_NORMAL;
      const timeoutId = setTimeout(() => {
        videoElement.play().catch(() => {
          // Silently handle autoplay failure in restricted environments
        });
      }, delay);

      return () => clearTimeout(timeoutId);
    } else {
      videoElement.pause();
    }
  }, [isInView, isInitialLoad]);

  // Responsive dimensions
  const dimensions = useMemo(() => getVideoDimensions(), []);

  return (
    <div 
      className="flex-shrink-0 mr-4 md:mr-6" 
      style={dimensions}
      data-video-index={dataIndex}
    >
      <motion.div 
        className="w-full h-full"
        style={{ 
          zIndex: isCenter ? 999 : 1,
          position: isCenter && scrollScale > 1.8 ? 'fixed' : 'relative',
          top: isCenter && scrollScale > 1.8 ? '50%' : 'auto',
          left: isCenter && scrollScale > 1.8 ? '50%' : 'auto',
          transform: isCenter && scrollScale > 1.8 ? 'translate(-50%, -50%)' : 'none',
          transformOrigin: 'center top',
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))',
          backgroundColor: 'transparent',
          overflow: 'visible',
          willChange: isCenter ? 'transform' : 'auto',
        }}
        animate={{
          scale: isCenter ? scrollScale : 1,
          y: isCenter ? (scrollScale - 1) * ANIMATION_CONFIG.SCALE_MULTIPLIER : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          ref={videoContainerRef}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{
            duration: ANIMATION_CONFIG.CLIP_DURATION,
            delay: isInitialLoad ? ANIMATION_CONFIG.CLIP_DELAY_INITIAL : ANIMATION_CONFIG.CLIP_DELAY_NORMAL,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="video-preview relative w-full h-full aspect-video overflow-hidden rounded-lg md:rounded-xl"
          style={{ 
            borderRadius: '1rem',
            border: '1px solid #e5e7eb',
          }}
        >
          <div className="video-wrapper absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
            <motion.video
              ref={videoRef}
              src={video}
              muted={isMuted}
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full rounded-2xl object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}