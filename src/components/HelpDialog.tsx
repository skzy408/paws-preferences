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
          <DialogTitle>How it works 🐾</DialogTitle>
          <DialogDescription className="space-y-2 pt-2">
            <p>
              Swipe <span className="font-semibold text-primary">left</span> to
              pass a cat.
            </p>
            <p>
              Swipe <span className="font-semibold text-secondary">right</span>{" "}
              to like a cat.
            </p>
            <p className="pt-2 text-sm text-muted-foreground">
              At the end, you’ll see all the cats you liked!
            </p>
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => onOpenChange(false)}>Got it!</Button>
      </DialogContent>
    </Dialog>
  )
}
