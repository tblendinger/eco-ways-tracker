import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export const FloatingActionButton = ({ onClick, className }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-eco bg-gradient-eco hover:shadow-lg transform hover:scale-105 transition-all duration-300",
        className
      )}
      size="icon"
    >
      <Plus size={24} className="text-white" />
    </Button>
  );
};