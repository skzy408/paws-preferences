import { useState, useEffect } from "react";
import { SwipeCard } from "./components/CatCard";
import { ResultsView } from "./components/ResultsView";
import { LoadingScreen } from "./components/LoadingScreen";
import "./index.css";
import { Header } from "./components/Header";
import { Progress } from "./components/ui/progress";
import { HelpDialog } from "./components/HelpDialog";

interface CatImage {
  id: string;
  url: string;
}

function App() {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const [showHelp, setShowHelp] = useState(true);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    setIsLoading(true);
    try {
      const catImages: CatImage[] = [];
      for (let i = 0; i < 20; i++) {
        const id = `cat-${Date.now()}-${i}`;
        catImages.push({
          id,
          url: `https://cataas.com/cat?timestamp=${id}`
        });
      }
      setCats(catImages);
    } catch (error) {
      console.error("Failed to fetch cats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setLikedCats((prev) => [...prev, cats[currentIndex]]);
    }

    if (currentIndex >= cats.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setIsComplete(false);
    fetchCats();
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
      />
    );
  }

  return (
    <main className="min-h-dvh flex flex-col bg-background">
      {/* Help Dialog */}
      <HelpDialog open={showHelp} onOpenChange={setShowHelp}/>

      {/* Header */}
      <Header likedCount={likedCats.length} onHelpClick={() => setShowHelp(true)}/>

      {/* Progress */}
      <div className="px-8 mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>
            Cat {currentIndex + 1} of {cats.length}
          </span>
          <span>{Math.round(((currentIndex) / cats.length) * 100)}%</span>
        </div>
        <Progress
          value={((currentIndex + 1) / cats.length) * 100}
          className="h-2"
        />
      </div>

      {/* Swipe Area */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="relative w-full max-w-2xs aspect-[3/4]">
          {cats
            .slice(currentIndex, currentIndex + 3)
            .reverse()
            .map((cat, index) => (
              <SwipeCard
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
