import { Search, TrendingUp, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "./post-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExploreSectionProps {
  posts: any[];
  trendingTags: string[];
  onSearch: (query: string) => void;
}

export const ExploreSection = ({ posts, trendingTags, onSearch }: ExploreSectionProps) => {
  const categories = [
    { id: "all", label: "Todo", count: posts.length },
    { id: "food", label: "Alimentación", count: posts.filter(p => p.actionType === "food").length },
    { id: "transport", label: "Transporte", count: posts.filter(p => p.actionType === "transport").length },
    { id: "energy", label: "Hogar", count: posts.filter(p => p.actionType === "energy").length },
    { id: "shopping", label: "Compras", count: posts.filter(p => p.actionType === "shopping").length },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="font-poppins font-bold text-2xl text-foreground">Explorar</h1>
        
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar acciones sostenibles..."
            className="pl-10 font-inter"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Trending Tags */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp size={18} className="text-eco-green" />
            <h3 className="font-poppins font-semibold text-foreground">Trending</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="cursor-pointer hover:bg-eco-green/10 hover:text-eco-green transition-colors duration-200 font-inter"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all" className="font-inter text-xs">Todo</TabsTrigger>
            <TabsTrigger value="trending" className="font-inter text-xs">Trending</TabsTrigger>
            <TabsTrigger value="recent" className="font-inter text-xs">Reciente</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Filter size={16} />
            <span className="font-inter">Filtros</span>
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              className="whitespace-nowrap flex items-center space-x-2 font-inter"
            >
              <span>{category.label}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts
              .filter(post => post.likes > 10)
              .map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts
              .slice()
              .reverse()
              .map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline" className="font-inter">
          Cargar más contenido
        </Button>
      </div>
    </div>
  );
};