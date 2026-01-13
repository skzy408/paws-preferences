"use client";

import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo
} from "framer-motion";
import { Heart, X, HeartCrack } from "lucide-react";

interface CatImage {
  id: string;
  url: string;
}

interface CatCardProps {
  cat: CatImage;
  isTop: boolean;
  onSwipe: (direction: "left" | "right") => void;
  stackIndex: number;
}

export function CatCard({ cat, isTop, onSwipe, stackIndex }: CatCardProps) {
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSwipeAnimation, setShowSwipeAnimation] = useState<
    "like" | "dislike" | null
  >(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);

  const triggerSwipe = (direction: "left" | "right") => {
    setShowSwipeAnimation(direction === "right" ? "like" : "dislike");

    setTimeout(() => {
      setExitDirection(direction);
      onSwipe(direction);
    }, 400);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x > threshold) {
      triggerSwipe("right");
    } else if (info.offset.x < -threshold) {
      triggerSwipe("left");
    }
  };

  const handleButtonSwipe = (direction: "left" | "right") => {
    triggerSwipe(direction);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none select-none"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale: 1 - stackIndex * 0.05,
        y: stackIndex * 8,
        zIndex: 10 - stackIndex
      }}
      drag={isTop && !showSwipeAnimation ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      animate={
        exitDirection
          ? {
              x: exitDirection === "right" ? 500 : -500,
              opacity: 0,
              transition: { duration: 0.3 }
            }
          : {}
      }
    >
      <div className="w-full h-full bg-card rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border-2 border-border">
        {/* Image */}
        <div className="relative w-full h-full">
          {/* Loading Spinner */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          )}
          <img
            src={cat.url || "/placeholder.svg"}
            alt="A cute cat"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            crossOrigin="anonymous"
            draggable={false}
          />

          {/* Heart/Broken Heart Animations */}
          <AnimatePresence>
            {showSwipeAnimation && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{
                    scale: [0, 1.4, 1.2],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className={`p-4 rounded-full ${
                    showSwipeAnimation === "like"
                      ? "bg-secondary/90"
                      : "bg-primary/90"
                  } shadow-2xl`}
                >
                  {showSwipeAnimation === "like" ? (
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white" />
                  ) : (
                    <HeartCrack className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {isTop && (
            <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-6 sm:gap-8">
              <button
                onClick={() => handleButtonSwipe("left")}
                disabled={!!showSwipeAnimation}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card shadow-lg flex items-center justify-center border-2 border-primary hover:scale-110 active:scale-95 transition-transform disabled:opacity-50"
                aria-label="Dislike"
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </button>
              <button
                onClick={() => handleButtonSwipe("right")}
                disabled={!!showSwipeAnimation}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card shadow-lg flex items-center justify-center border-2 border-secondary hover:scale-110 active:scale-95 transition-transform disabled:opacity-50"
                aria-label="Like"
              >
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
