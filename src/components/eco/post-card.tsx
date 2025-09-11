import { Heart, MessageCircle, Share2, Leaf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PostCardProps {
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  co2Impact?: number;
  actionType?: "transport" | "food" | "energy" | "shopping";
  likes: number;
  comments: number;
  isLiked?: boolean;
  timestamp: string;
  hasSustainableAction?: boolean;
}

const actionTypeLabels = {
  transport: "Transporte",
  food: "Alimentación", 
  energy: "Energía",
  shopping: "Compras"
};

const actionTypeColors = {
  transport: "bg-blue-100 text-blue-800",
  food: "bg-eco-green/10 text-eco-green",
  energy: "bg-yellow-100 text-yellow-800",
  shopping: "bg-purple-100 text-purple-800"
};

export const PostCard = ({ 
  user, 
  content, 
  image, 
  co2Impact, 
  actionType,
  likes, 
  comments, 
  isLiked,
  timestamp,
  hasSustainableAction
}: PostCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 animate-slide-up">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-eco text-white font-poppins">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-poppins font-semibold text-sm text-foreground">{user.name}</h4>
              <p className="text-xs text-muted-foreground font-inter">@{user.username} • {timestamp}</p>
            </div>
          </div>
          
          {hasSustainableAction && (
            <Badge variant="outline" className="bg-eco-green/10 border-eco-green/20 text-eco-green animate-badge-glow">
              <Leaf size={12} className="mr-1" />
              Acción Eco
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-foreground font-inter leading-relaxed">{content}</p>
          {image && (
            <img 
              src={image} 
              alt="Post content"
              className="w-full rounded-lg object-cover max-h-80"
            />
          )}
        </div>

        {/* CO2 Impact */}
        {co2Impact && actionType && (
          <div className="bg-gradient-subtle rounded-lg p-3 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className={cn("text-xs", actionTypeColors[actionType])}>
                  {actionTypeLabels[actionType]}
                </Badge>
                <span className="text-sm font-inter text-muted-foreground">redujo</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-poppins font-bold text-eco-green">{co2Impact} kg</span>
                <span className="text-xs text-muted-foreground">CO₂e</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-6">
            <button className={cn(
              "flex items-center space-x-2 transition-colors duration-200",
              isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            )}>
              <Heart size={18} className={isLiked ? "fill-current" : ""} />
              <span className="text-sm font-inter">{likes}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
              <MessageCircle size={18} />
              <span className="text-sm font-inter">{comments}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Share2 size={18} />
            </button>
          </div>

          {hasSustainableAction && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-eco-green border-eco-green/20 hover:bg-eco-green/10 font-inter"
            >
              Aplico esto
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};