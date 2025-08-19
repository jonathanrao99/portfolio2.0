'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, useMotionValue, animate } from 'motion/react';
import useInitialLoad from '@/contexts/initial-load-context';
import useMeasure from 'react-use-measure';
import useWindowSize from '@/hooks/useWindowSize';

// Animation constants
const ANIMATION_CONFIG = {
  BASE_DURATION: 40,
  HOVER_DURATION: 120,
  SCROLL_THRESHOLD: 100,
  MAX_SCALE: 1.8,
  SCALE_RANGE: 800,
  CLIP_DURATION: 1.2,
  CLIP_DELAY_INITIAL: 2.6,
  CLIP_DELAY_NORMAL: 0.2,
  THROTTLE_MS: 16, // ~60fps
  VIDEO_PLAY_DELAY_INITIAL: 2500,
  VIDEO_PLAY_DELAY_NORMAL: 500,
} as const;

// Responsive video dimensions - optimized for all screen sizes
const getVideoDimensions = () => {
  if (typeof window === 'undefined') return { width: '320px', height: '180px' };
  
  const width = window.innerWidth;
  
  // Extra small screens (phones in portrait)
  if (width < 480) {
    return { width: '280px', height: '157px' };
  }
  // Small screens (large phones, small tablets)
  else if (width < 768) {
    return { width: '320px', height: '180px' };
  }
  // Medium screens (tablets)
  else if (width < 1024) {
    return { width: '360px', height: '202px' };
  }
  // Large screens (small laptops)
  else if (width < 1280) {
    return { width: '400px', height: '225px' };
  }
  // Extra large screens (large laptops, desktops)
  else if (width < 1536) {
    return { width: '440px', height: '247px' };
  }
  // Ultra large screens
  else {
    return { width: '480px', height: '270px' };
  }
};

type VideoSliderProps = {
  videos: string[];
  className?: string;
};

export function VideoSlider({ videos, className }: VideoSliderProps) {
  const [ref, { width }] = useMeasure();
  const translation = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isInitialLoad } = useInitialLoad();
  const animationRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width: windowWidth } = useWindowSize();
  


  // Optimized infinite scroll animation
  const animationConfig = useMemo(() => ({
    contentSize: width,
    from: 0,
    to: -width / 2,
    duration: isHovered ? ANIMATION_CONFIG.HOVER_DURATION : ANIMATION_CONFIG.BASE_DURATION,
  }), [width, isHovered]);

  useEffect(() => {
    if (!width) return;
    
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
  }, [animationConfig, translation]);

  if (!videos || videos.length === 0) {
    return <div className="text-red-500">No videos available</div>;
  }

  return (
    <div ref={containerRef} className={`w-full mx-auto py-8 will-change-transform ${className || ''}`}>
      <motion.div
        className='flex w-max items-center'
        style={{
          x: translation,
          gap: '0px',
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
        {videos.map((video, index) => (
          <VideoCard 
            key={`first-${index}`} 
            video={video} 
            index={index}
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {videos.map((video, index) => (
          <VideoCard 
            key={`second-${index}`} 
            video={video} 
            index={index + videos.length}
          />
        ))}
      </motion.div>
    </div>
  );
}

function VideoCard({ 
  video, 
  index
}: { 
  video: string;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoContainerRef, { once: false });
  const [isMuted, setIsMuted] = useState(true);
  const { isInitialLoad } = useInitialLoad();
  const { width: windowWidth } = useWindowSize();

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

  // Responsive dimensions that update with window size
  const dimensions = useMemo(() => getVideoDimensions(), [windowWidth]);

  return (
    <div 
      className="flex-shrink-0 mr-3 sm:mr-4 md:mr-5 lg:mr-6" 
      style={dimensions}
    >
      <div className="w-full h-full relative">
        <motion.div
          ref={videoContainerRef}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{
            duration: ANIMATION_CONFIG.CLIP_DURATION,
            delay: isInitialLoad ? ANIMATION_CONFIG.CLIP_DELAY_INITIAL : ANIMATION_CONFIG.CLIP_DELAY_NORMAL,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="video-preview relative w-full h-full aspect-video overflow-hidden rounded-lg md:rounded-xl border border-gray-200"
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
      </div>
    </div>
  );
}