import { motion } from "framer-motion";
import {
  Heart,
  RotateCcw,
  Cat,
  PartyPopper,
  Undo2,
} from "lucide-react";
import { useState } from "react";
import { HelpDialog } from "./HelpDialog";
import { Header } from "./Header";

interface CatImage {
  id: string;
  url: string;
}

interface ResultsViewProps {
  likedCats: CatImage[];
  totalCats: number;
  onRestart: () => void;
  onUndo?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function ResultsView({
  likedCats,
  totalCats,
  onRestart,
  onUndo,
  isDarkMode,
  onToggleDarkMode
}: ResultsViewProps) {
  const [showHelp, setShowHelp] = useState(false);
  const percentage = Math.round((likedCats.length / totalCats) * 100);

  return (
    <main className="min-h-dvh flex flex-col bg-background">
      {/* Help Dialog */}
      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />

      <Header
        likedCount={likedCats.length}
        onHelpClick={() => setShowHelp(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        // canUndo={canUndo}
        onUndo={onUndo}
      />

      {/* Results Content */}
      <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 overflow-auto">
        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-border mb-4 sm:mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              All Done!
            </h1>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-8 mb-3 sm:mb-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-secondary">
                {likedCats.length}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Liked
              </div>
            </div>
            <div className="w-px h-10 sm:h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">
                {totalCats}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Total
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-full h-2.5 sm:h-3 overflow-hidden mb-2">
            <motion.div
              className="h-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            You liked{" "}
            <span className="font-semibold text-secondary">{percentage}%</span>{" "}
            of the cats!
          </p>
        </motion.div>

        {/* Liked Cats Grid */}
        {likedCats.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-secondary fill-secondary" />
              <h2 className="text-base sm:text-lg font-semibold text-foreground">
                Your Favourites
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {likedCats.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-border"
                >
                  <img
                    src={cat.url || "/placeholder.svg"}
                    alt="A cat you liked"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {likedCats.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 sm:py-8"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-muted flex items-center justify-center">
              <Cat className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              {"You didn't like any cats this time."}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Maybe try again?
            </p>
          </motion.div>
        )}
      </div>

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-3 sm:pt-4 flex gap-3">
        {onUndo && (
          <button
            onClick={onUndo}
            className="h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-muted hover:bg-muted/80 active:scale-[0.98] text-foreground font-semibold text-base sm:text-lg shadow-md flex items-center justify-center gap-2 transition-all"
            aria-label="Undo last swipe and go back"
          >
            <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Undo</span>
          </button>
        )}
        <button
          onClick={onRestart}
          className="flex-1 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-semibold text-base sm:text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          Find More Cats
        </button>
      </div>
    </main>
  );
}
