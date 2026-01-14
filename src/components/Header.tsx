import { Heart, CircleHelp, Undo2, Moon, Sun } from "lucide-react";
import catIcon from "@/assets/cat.png";

interface HeaderProps {
  likedCount: number;
  title?: string;
  subtitle?: string;
  onHelpClick?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  canUndo?: boolean;
  onUndo?: () => void;
}

export function Header({
  likedCount,
  title = "PAWS & PREFERENCES",
  subtitle = "Find your purr-fect match!",
  onHelpClick,
  isDarkMode,
  onToggleDarkMode,
  canUndo,
  onUndo
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <img
              src={catIcon}
              alt="Cat logo"
              className="w-12 h-12 object-contain pl-2"
            />
          </div>{" "}
        </div>
        <div className="flex flex-col leading-tight min-w-0">
          <h1 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-foreground break-words">
            {title}
          </h1>
          {subtitle && (
            <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0 ml-2">
        {onUndo && (
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-foreground/10 active:bg-foreground/20 transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Undo last swipe"
            title="Undo last swipe"
          >
            <Undo2 className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
          </button>
        )}

        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-foreground/10 active:bg-foreground/20 transition-colors flex items-center justify-center"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={isDarkMode ? "Light mode" : "Dark mode"}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
            ) : (
              <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
            )}
          </button>
        )}

        <button
          onClick={onHelpClick}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-foreground/10 active:bg-foreground/20 transition-colors flex items-center justify-center"
          aria-label="Help"
        >
          <CircleHelp className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5 bg-card px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border border-border">
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary" />
          <span className="font-semibold text-sm sm:text-base text-foreground">
            {likedCount}
          </span>
        </div>
      </div>
    </header>
  );
}
