import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import { Heart, X } from "lucide-react"

interface CatImage {
  id: string
  url: string
}

interface SwipeCardProps {
  cat: CatImage
  isTop: boolean
  onSwipe: (direction: "left" | "right") => void
  stackIndex: number
}

export function SwipeCard({ cat, isTop, onSwipe, stackIndex }: SwipeCardProps) {
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      setExitDirection("right")
      onSwipe("right")
    } else if (info.offset.x < -threshold) {
      setExitDirection("left")
      onSwipe("left")
    }
  }

  const handleButtonSwipe = (direction: "left" | "right") => {
    setExitDirection(direction)
    onSwipe(direction)
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale: 1 - stackIndex * 0.05,
        y: stackIndex * 8,
        zIndex: 10 - stackIndex,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      animate={
        exitDirection
          ? {
              x: exitDirection === "right" ? 500 : -500,
              opacity: 0,
              transition: { duration: 0.3 },
            }
          : {}
      }
    >
      <div className="w-full h-full bg-card rounded-3xl shadow-xl overflow-hidden border border-border">
        {/* Image */}
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          )}
          <img
            src={cat.url || "/placeholder.svg"}
            alt="A cute cat"
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            crossOrigin="anonymous"
            draggable={false}
          />

          {/* Like/Nope Overlays */}
          {isTop && (
            <>
              <motion.div
                className="absolute top-8 right-8 px-4 py-2 border-4 border-secondary bg-secondary/20 rounded-lg rotate-[15deg]"
                style={{ opacity: likeOpacity }}
              >
                <span className="text-3xl font-bold text-secondary">LIKE</span>
              </motion.div>
              <motion.div
                className="absolute top-8 left-8 px-4 py-2 border-4 border-primary bg-primary/20 rounded-lg rotate-[-15deg]"
                style={{ opacity: nopeOpacity }}
              >
                <span className="text-3xl font-bold text-primary">NOPE</span>
              </motion.div>
            </>
          )}

          {/* Action Buttons */}
          {isTop && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
              <button
                onClick={() => handleButtonSwipe("left")}
                className="w-16 h-16 rounded-full bg-card shadow-lg flex items-center justify-center border-2 border-primary hover:scale-110 transition-transform active:scale-95"
              >
                <X className="w-8 h-8 text-primary" />
              </button>
              <button
                onClick={() => handleButtonSwipe("right")}
                className="w-16 h-16 rounded-full bg-card shadow-lg flex items-center justify-center border-2 border-secondary hover:scale-110 transition-transform active:scale-95"
              >
                <Heart className="w-8 h-8 text-secondary" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
