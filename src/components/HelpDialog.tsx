import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>How to Play? 🐾</DialogTitle>
          <DialogDescription className="space-y-2 pt-2">
            <p className="text-foreground">
              Swipe <span className="font-semibold text-primary">left</span> to
              pass a cat.
            </p>
            <p className="text-foreground">
              Swipe <span className="font-semibold text-secondary">right</span>{" "}
              to like a cat.
            </p>
            <p className="text-foreground">
              Click the <span className="font-bold text-accent">undo</span>{" "}
              button to undo your last swipe.
            </p>
            <p className="text-foreground">
              Click the <span className="font-bold text-accent">moon/sun</span>{" "}
              button to toggle dark/light mode.
            </p>
            
            <p className="pt-2 text-sm text-foreground">
              At the end, you’ll see all the cats you liked!
            </p>
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => onOpenChange(false)}>Got it!</Button>
      </DialogContent>
    </Dialog>
  )
}
