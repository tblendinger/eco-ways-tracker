import { Calendar, MapPin, Award, TrendingDown, Share2, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "./post-card";

interface UserProfileProps {
  user: {
    name: string;
    username: string;
    avatar?: string;
    bio: string;
    location: string;
    joinedDate: string;
    stats: {
      posts: number;
      followers: number;
      following: number;
      totalCO2Saved: number;
    };
    badges: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      rarity: "common" | "rare" | "epic";
    }>;
  };
  posts: any[];
  isOwnProfile?: boolean;
}

export const UserProfile = ({ user, posts, isOwnProfile = false }: UserProfileProps) => {
  const rarityColors = {
    common: "bg-gray-100 text-gray-800 border-gray-200",
    rare: "bg-blue-100 text-blue-800 border-blue-200", 
    epic: "bg-gradient-eco text-white border-eco-green"
  };

  return (
    <div className="space-y-6 p-4">
      {/* Profile Header */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-20 w-20 md:h-24 md:w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-eco text-white font-poppins text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="font-poppins font-bold text-2xl text-foreground">{user.name}</h1>
                <p className="text-muted-foreground font-inter">@{user.username}</p>
              </div>
              
              <p className="text-foreground font-inter leading-relaxed">{user.bio}</p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span className="font-inter">{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span className="font-inter">Se unió en {user.joinedDate}</span>
                </div>
              </div>
            </div>
            
            {isOwnProfile ? (
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings size={18} />
                <span>Editar Perfil</span>
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button className="bg-gradient-eco hover:shadow-eco">
                  Seguir
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 size={18} />
                </Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="font-poppins font-bold text-xl text-foreground">{user.stats.posts}</div>
              <div className="text-sm text-muted-foreground font-inter">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-xl text-foreground">{user.stats.followers}</div>
              <div className="text-sm text-muted-foreground font-inter">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-xl text-foreground">{user.stats.following}</div>
              <div className="text-sm text-muted-foreground font-inter">Siguiendo</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-xl text-eco-green flex items-center justify-center space-x-1">
                <TrendingDown size={20} />
                <span>{user.stats.totalCO2Saved}</span>
              </div>
              <div className="text-sm text-muted-foreground font-inter">kg CO₂e ahorrados</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-poppins text-lg flex items-center space-x-2">
            <Award size={20} />
            <span>Logros Ecológicos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {user.badges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-card">
                <div className="text-2xl">{badge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-poppins font-semibold text-sm">{badge.name}</h4>
                    <Badge className={`text-xs ${rarityColors[badge.rarity]}`}>
                      {badge.rarity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-inter">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts" className="font-inter">Posts</TabsTrigger>
          <TabsTrigger value="actions" className="font-inter">Acciones Eco</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))
          ) : (
            <Card className="shadow-card bg-gradient-subtle border-dashed">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground font-inter">
                  {isOwnProfile ? "Aún no has publicado nada" : "Este usuario no ha publicado nada aún"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="actions" className="space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground font-inter">
                Vista de acciones ecológicas próximamente...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};