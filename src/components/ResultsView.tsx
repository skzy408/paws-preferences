import { motion } from "framer-motion";
import { Heart, RotateCcw, Cat, PartyPopper } from "lucide-react";
import { Header } from "./Header";

interface CatImage {
  id: string;
  url: string;
}

interface ResultsViewProps {
  likedCats: CatImage[];
  totalCats: number;
  onRestart: () => void;
}

export function ResultsView({
  likedCats,
  totalCats,
  onRestart
}: ResultsViewProps) {
  const percentage = Math.round((likedCats.length / totalCats) * 100);

  return (
    <main className="min-h-dvh flex flex-col bg-background">
      {/* Header */}
      <Header likedCount={likedCats.length} />
      {/* Results Content */}
      <div className="flex-1 px-6 py-4 overflow-auto">
        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-6 shadow-lg border border-border mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <PartyPopper className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold text-foreground">All Done!</h1>
          </div>

          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">
                {likedCats.length}
              </div>
              <div className="text-sm text-muted-foreground">Liked</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">
                {totalCats}
              </div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>

          <div className="bg-muted rounded-full h-4 overflow-hidden mb-2">
            <motion.div
              className="h-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            You liked{" "}
            <span className="font-semibold text-secondary">{percentage}%</span>{" "}
            of the cats!
          </p>
        </motion.div>

        {/* Liked Cats Grid */}
        {likedCats.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-secondary fill-secondary" />
              <h2 className="text-lg font-semibold text-foreground">
                Your Favorites
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {likedCats.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-md border border-border"
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
            className="text-center py-8"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Cat className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {"You didn't like any cats this time."}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Maybe try again?
            </p>
          </motion.div>
        )}
      </div>

      {/* Restart Button */}
      <div className="px-6 pb-8 pt-4">
        <button
          onClick={onRestart}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Find More Cats
        </button>
      </div>
    </main>
  );
}
