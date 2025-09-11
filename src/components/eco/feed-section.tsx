import { Edit3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "./post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FeedSectionProps {
  posts: any[];
  currentUser: {
    name: string;
    avatar?: string;
  };
  onCreatePost: () => void;
}

export const FeedSection = ({ posts, currentUser, onCreatePost }: FeedSectionProps) => {
  return (
    <div className="space-y-6 p-4">
      {/* Welcome Header */}
      <div className="text-center space-y-2 py-6">
        <h1 className="font-poppins font-bold text-2xl text-foreground">
          ¡Hola, {currentUser.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground font-inter">
          Descubre qué está haciendo tu comunidad para cuidar el planeta
        </p>
      </div>

      {/* Quick Post */}
      <Card className="shadow-card hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-gradient-eco text-white font-poppins">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="flex-1 justify-start text-muted-foreground hover:text-foreground font-inter"
              onClick={onCreatePost}
            >
              <Edit3 size={16} className="mr-2" />
              Comparte tu idea sostenible
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Inspiration */}
      <Card className="shadow-card bg-gradient-subtle border-eco-green/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles size={18} className="text-eco-green" />
            <h3 className="font-poppins font-semibold text-foreground">Inspiración del día</h3>
          </div>
          <p className="text-sm font-inter text-muted-foreground">
            "Pequeñas acciones, grandes cambios. Cada elección sostenible cuenta para nuestro futuro."
          </p>
        </CardContent>
      </Card>

      {/* Feed Posts */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))
        ) : (
          <Card className="shadow-card bg-gradient-subtle border-dashed">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto">
                <Edit3 size={32} className="text-eco-green" />
              </div>
              <div className="space-y-2">
                <h3 className="font-poppins font-semibold text-lg">Tu feed está vacío</h3>
                <p className="text-muted-foreground font-inter">
                  Sigue a otros usuarios o comparte tu primera acción sostenible
                </p>
              </div>
              <Button 
                onClick={onCreatePost}
                className="bg-gradient-eco hover:shadow-eco transition-all duration-300 font-inter"
              >
                Crear mi primer post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More */}
      {posts.length > 0 && (
        <div className="text-center pt-6">
          <Button variant="outline" className="font-inter">
            Ver más posts
          </Button>
        </div>
      )}
    </div>
  );
};