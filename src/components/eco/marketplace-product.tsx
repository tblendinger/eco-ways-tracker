import { Star, ShoppingCart, Leaf, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  ecoScore: number;
  certifications: string[];
  inStock: boolean;
  fastShipping?: boolean;
}

interface MarketplaceProductProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export const MarketplaceProduct = ({ product, onAddToCart }: MarketplaceProductProps) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="w-full">
      <Card className="shadow-card hover:shadow-eco transition-all duration-200 group">
        <div className="relative">
          <div className="aspect-square bg-gradient-subtle rounded-t-lg flex items-center justify-center">
            <span 
              className="text-2xl sm:text-3xl md:text-4xl" 
              role="img" 
              aria-label={`Imagen del producto ${product.name}`}
            >
              {product.image}
            </span>
          </div>
        
        {/* Eco Score Badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-eco-green text-white font-inter text-xs flex items-center space-x-1">
            <Leaf size={12} />
            <span>Eco {product.ecoScore}/10</span>
          </Badge>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-eco-orange text-white font-inter text-xs">
              -{discountPercentage}%
            </Badge>
          </div>
        )}

        {/* Fast Shipping */}
        {product.fastShipping && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="font-inter text-xs">
              Envío rápido
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs text-muted-foreground font-inter uppercase tracking-wide">
          {product.category}
        </div>

        {/* Product Name */}
        <h3 className="font-poppins font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-eco-green transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground font-inter line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? "text-eco-orange fill-current" : "text-muted-foreground"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-inter">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div className="flex items-center space-x-1">
            <Award size={12} className="text-eco-green" />
            <span className="text-xs text-muted-foreground font-inter">
              {product.certifications.join(", ")}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
           <div className="space-y-1">
             <div className="flex items-center space-x-2">
               <span className="font-poppins font-bold text-lg text-foreground">
                 ${product.price}
               </span>
               {product.originalPrice && (
                 <span className="text-sm text-muted-foreground line-through font-inter">
                   ${product.originalPrice}
                 </span>
               )}
             </div>
            <div className="text-xs text-muted-foreground font-inter">
              {product.inStock ? "En stock" : "Agotado"}
            </div>
          </div>

          <Button
            size="sm"
            className="flex items-center space-x-1"
            onClick={() => onAddToCart(product.id)}
            disabled={!product.inStock}
          >
            <ShoppingCart size={14} />
            <span className="font-inter">Agregar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
    </article>
  );
};