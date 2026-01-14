import { useState, useEffect } from "react";
import { CatCard } from "./components/CatCard";
import { ResultsView } from "./components/ResultsView";
import { LoadingScreen } from "./components/LoadingScreen";
import { Header } from "./components/Header";
import { HelpDialog } from "./components/HelpDialog";
import "./index.css";

interface CatImage {
  id: string;
  url: string;
}

interface SwipeHistory {
  catIndex: number;
  wasLiked: boolean;
}

function App() {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [swipeHistory, setSwipeHistory] = useState<SwipeHistory[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchCats();

    const timer = setTimeout(() => {
      setShowHelp(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const fetchCats = async () => {
    setIsLoading(true);
    try {
      const TOTAL_CATS = 2000;
      const LIMIT = 10;
      const SKIP = Math.floor(Math.random() * (TOTAL_CATS - LIMIT));

      const res = await fetch(
        `https://cataas.com/api/cats?limit=${LIMIT}&skip=${SKIP}`
      ); // use skip to randomize results
      const data: {
        id: string;
        tags: string[];
        mimetype: string;
        createdAt: string;
      }[] = await res.json();

      const catImages: CatImage[] = data.map((cat) => ({
        id: cat.id,
        url: `https://cataas.com/cat/${cat.id}`
      }));

      setCats(catImages);
    } catch (error) {
      console.error("Failed to fetch cats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeHistory((prev) => [
      ...prev,
      {
        catIndex: currentIndex,
        wasLiked: direction === "right"
      }
    ]);

    if (direction === "right") {
      setLikedCats((prev) => [...prev, cats[currentIndex]]);
    }

    if (currentIndex >= cats.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleUndo = () => {
    if (swipeHistory.length === 0) return;

    const lastSwipe = swipeHistory[swipeHistory.length - 1];

    // If we completed, go back to swiping
    if (isComplete) {
      setIsComplete(false);
    }

    // Remove the cat from liked if it was liked
    if (lastSwipe.wasLiked) {
      setLikedCats((prev) => prev.slice(0, -1));
    }

    // Go back to the previous card
    setCurrentIndex(lastSwipe.catIndex);

    // Remove the last entry from history
    setSwipeHistory((prev) => prev.slice(0, -1));
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setIsComplete(false);
    setSwipeHistory([]); // Clear history on restart
    fetchCats();
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isComplete) {
    return (
      <ResultsView
        likedCats={likedCats}
        totalCats={cats.length}
        onRestart={handleRestart}
        onUndo={swipeHistory.length > 0 ? handleUndo : undefined}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  const progress = ((currentIndex + 1) / cats.length) * 100;

  return (
    <main className="min-h-dvh flex flex-col bg-background">
      {/* Help Dialog */}
      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />

      {/* Header */}
      <Header
        likedCount={likedCats.length}
        onHelpClick={() => setShowHelp(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        canUndo={swipeHistory.length > 0}
        onUndo={handleUndo}
      />

      {/* Progress */}
      <div className="px-4 sm:px-6 md:px-8 mb-4 sm:mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-2">
          <span>
            Cat {currentIndex + 1} of {cats.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Swipe Area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm aspect-[3/4]">
          {cats
            .slice(currentIndex, currentIndex + 3)
            .reverse()
            .map((cat, index) => (
              <CatCard
                key={cat.id}
                cat={cat}
                isTop={
                  index ===
                  cats.slice(currentIndex, currentIndex + 3).length - 1
                }
                onSwipe={handleSwipe}
                stackIndex={
                  cats.slice(currentIndex, currentIndex + 3).length - 1 - index
                }
              />
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
