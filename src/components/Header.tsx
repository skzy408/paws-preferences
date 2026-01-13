import { Heart, CircleHelp, Cat } from "lucide-react";

interface HeaderProps {
  likedCount: number;
  title?: string;
  subtitle?: string;
  onHelpClick?: () => void;
}

export function Header({
  likedCount,
  title = "PAWS & PREFERENCES",
  subtitle = "Find your purr-fect match!",
  onHelpClick
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Cat className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-foreground" />
        </div>
        <div className="flex flex-col leading-tight min-w-0">
          <h1 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-foreground truncate">
            {title}
          </h1>
          <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground truncate hidden xs:block">
            {subtitle}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0 ml-2">
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
