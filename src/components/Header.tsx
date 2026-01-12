import { Heart } from "lucide-react";

interface HeaderProps {
  likedCount: number;
  title?: string;
  subtitle?: string;
  icon?: string;
}

export function Header({
  likedCount,
  title = "Paws & Preferences",
  subtitle = "Find your purr-fect match today!",
  icon = "/cat.png"
}: HeaderProps) {
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
      <div className="flex items-center gap-2 bg-card px-4 py-1.5 rounded-full shadow-sm border border-border">
        <Heart className="w-6 h-6 text-primary fill-primary" />
        <span className="font-medium text-base text-foreground">
          {likedCount}
        </span>
      </div>
    </header>
  );
}
