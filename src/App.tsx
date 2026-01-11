import { useState, useEffect } from "react"
import { SwipeCard } from "./components/CatCard"
import { ResultsView } from "./components/ResultsView"
import { LoadingScreen } from "./components/LoadingScreen"
import { Cat, Heart } from "lucide-react"
import "./index.css"

interface CatImage {
  id: string
  url: string
}

function App() {
  const [cats, setCats] = useState<CatImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedCats, setLikedCats] = useState<CatImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    fetchCats()
  }, [])

  const fetchCats = async () => {
    setIsLoading(true)
    try {
      const catImages: CatImage[] = []
      for (let i = 0; i < 10; i++) {
        const id = `cat-${Date.now()}-${i}`
        catImages.push({
          id,
          url: `https://cataas.com/cat?timestamp=${id}`,
        })
      }
      setCats(catImages)
    } catch (error) {
      console.error("Failed to fetch cats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setLikedCats((prev) => [...prev, cats[currentIndex]])
    }

    if (currentIndex >= cats.length - 1) {
      setIsComplete(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setLikedCats([])
    setIsComplete(false)
    fetchCats()
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (isComplete) {
    return <ResultsView likedCats={likedCats} totalCats={cats.length} onRestart={handleRestart} />
  }

  return (
    <main className="min-h-dvh flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Cat className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">Paws</span>
        </div>
        <div className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-full shadow-sm border border-border">
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-medium text-foreground">{likedCats.length}</span>
        </div>
      </header>

      {/* Progress */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>
            Cat {currentIndex + 1} of {cats.length}
          </span>
          <span>{Math.round(((currentIndex + 1) / cats.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / cats.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Swipe Area */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="relative w-full max-w-sm aspect-[3/4]">
          {cats
            .slice(currentIndex, currentIndex + 3)
            .reverse()
            .map((cat, index) => (
              <SwipeCard
                key={cat.id}
                cat={cat}
                isTop={index === cats.slice(currentIndex, currentIndex + 3).length - 1}
                onSwipe={handleSwipe}
                stackIndex={cats.slice(currentIndex, currentIndex + 3).length - 1 - index}
              />
            ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center pb-8 px-4">
        <p className="text-sm text-muted-foreground">
          Swipe <span className="text-primary font-semibold">left</span> to pass or{" "}
          <span className="text-secondary font-semibold">right</span> to like
        </p>
      </div>
    </main>
  )
}

export default App
