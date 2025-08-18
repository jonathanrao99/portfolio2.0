'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView, useMotionValue, animate, useScroll, useTransform } from 'motion/react';
import useInitialLoad from '@/contexts/initial-load-context';
import useMeasure from 'react-use-measure';

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
  const [centerVideoIndex, setCenterVideoIndex] = useState(1); // Start with middle video (index 1)
  const [scrollScale, setScrollScale] = useState(1);
  const [isVideoScaling, setIsVideoScaling] = useState(false);
  const { isInitialLoad } = useInitialLoad();
  const animationRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simple center video detection based on scroll and viewport
  const updateCenterVideo = useCallback(() => {
    if (!containerRef.current) return;
    
    const viewportCenter = window.innerWidth / 2;
    const videoElements = containerRef.current.querySelectorAll('[data-video-index]');
    
    let closestIndex = 1; // Default to middle video
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
  }, []);

  // Handle scroll-based scaling
  const handleScrollScale = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    console.log('SCROLL DETECTED! ScrollY:', scrollY, 'WindowHeight:', windowHeight, 'DocumentHeight:', documentHeight);
    
    // Check if page is actually scrollable
    const isScrollable = documentHeight > windowHeight;
    console.log('Page is scrollable:', isScrollable, 'Scroll difference:', documentHeight - windowHeight);
    
    // Smooth scaling based on scroll movement - like itsjay.us
    let progress = 0;
    if (scrollY > 30) { // Start scaling after 30px of scroll
      progress = Math.min((scrollY - 30) / 400, 1); // Scale over 400px of scroll (smooth)
    }
    
    const newScale = 1 + (progress * 2.5); // Scale from 1x to 3.5x for dramatic downward expansion
    
    // Track if video is actively scaling
    const isScaling = newScale > 1.05; // Consider scaling active when > 5% larger than normal
    setIsVideoScaling(isScaling);
    
    console.log('ScrollY:', scrollY, 'Progress:', progress, 'NewScale:', newScale, 'IsScaling:', isScaling, 'CenterVideo:', centerVideoIndex);
    
    setScrollScale(newScale);
    updateCenterVideo();
  }, [updateCenterVideo, centerVideoIndex]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(handleScrollScale);
    };
    
    // Add keyboard testing - Press 'S' to test scaling
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's') {
        console.log('MANUAL SCALE TEST - Pressing S key');
        setScrollScale(prev => prev === 1 ? 2.5 : 1);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateCenterVideo, { passive: true });
    window.addEventListener('keydown', handleKeyPress);
    
    // Initial calculation
    handleScrollScale();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCenterVideo);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleScrollScale, updateCenterVideo]);

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

    // Stop animation when video is scaling
    if (isVideoScaling) {
      console.log('Video is scaling - stopping slider animation');
      return;
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
  }, [animationConfig, translation, isVideoScaling]);

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
          const isCenter = index === centerVideoIndex;
          return (
            <VideoCard 
              key={`first-${index}`} 
              video={video} 
              index={index}
              isCenter={isCenter}
              scrollScale={scrollScale}
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
            isCenter={(index + videos.length) === centerVideoIndex}
            scrollScale={scrollScale}
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
  scrollScale,
  dataIndex 
}: { 
  video: string;
  index: number;
  isCenter: boolean;
  scrollScale: number;
  dataIndex?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoContainerRef, { once: false });
  const [isMuted, setIsMuted] = useState(true);
  const { isInitialLoad } = useInitialLoad();

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

  // Calculate if video should break out of container
  const shouldBreakOut = isCenter && scrollScale > 2.0;
  const finalScale = isCenter ? scrollScale : 1;
  
  // Debug logging for this specific video
  console.log(`Video ${index} - IsCenter: ${isCenter}, ScrollScale: ${scrollScale}, FinalScale: ${finalScale}, ShouldBreakOut: ${shouldBreakOut}`);

  return (
    <div 
      className="flex-shrink-0 mr-4 md:mr-6" 
      style={dimensions}
      data-video-index={dataIndex}
    >
      <motion.div 
        className="w-full h-full"
        style={{ 
          position: 'relative',
          zIndex: isCenter ? 999 : 1,
          transformOrigin: 'center top', // Scale from center-top to expand downward
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))',
          willChange: 'transform',
          overflow: 'visible',
          backgroundColor: isCenter && finalScale > 1 ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
        }}
        animate={{
          scaleX: finalScale,
          scaleY: finalScale * 1.3, // Scale Y more aggressively for downward expansion
          y: isCenter ? (finalScale - 1) * 20 : 0, // Move down slightly as it scales
        }}
        transition={{
          duration: 0.2,
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
            borderRadius: shouldBreakOut ? '0.5rem' : '1rem',
            border: '1px solid #e5e7eb',
            width: shouldBreakOut ? `${dimensions.width}px` : '100%',
            height: shouldBreakOut ? `${dimensions.height}px` : '100%',
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