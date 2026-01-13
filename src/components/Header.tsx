import { Heart, CircleQuestionMark } from "lucide-react";
import catIcon from "@/assets/cat.png";
import { useState } from "react";

interface HeaderProps {
  likedCount: number;
  title?: string;
  subtitle?: string;
  icon?: string;
  onHelpClick?: () => void;
}

export function Header({
  likedCount,
  title = "Paws & Preferences",
  subtitle = "Find your purr-fect match today!",
  icon = catIcon,
  onHelpClick
}: HeaderProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
          <img
            src={icon}
            alt="Cat logo"
            className="w-12 h-12 object-contain pl-2"
          />
        </div>
        <div className="flex flex-col leading-tight pl-3">
          <span className="font-bold text-3xl text-foreground">{title}</span>
          <span className="text-sm text-muted-foreground">{subtitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <CircleQuestionMark
          className="size-8 rounded-full p-1 text-foreground/80 hover:bg-primary/60"
          onClick={onHelpClick}
        />

        <div className="flex items-center gap-2 bg-card px-3 py-1 rounded-full shadow-sm border border-border">
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <span className="font-medium text-base text-foreground">
            {likedCount}
          </span>
        </div>
      </div>
    </header>
  );
}
