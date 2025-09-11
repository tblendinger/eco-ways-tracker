import { Gift, Clock, Users, CheckCircle, Lock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Benefit {
  id: string;
  title: string;
  description: string;
  partner: {
    name: string;
    logo: string;
  };
  category: "transport" | "food" | "energy" | "shopping" | "lifestyle";
  requirement: {
    co2Saved: number;
    period: string;
  };
  discount: {
    type: "percentage" | "fixed" | "free_shipping" | "gift";
    value: string;
  };
  validUntil: string;
  usedBy: number;
  maxUses?: number;
  isUnlocked: boolean;
  userProgress?: number;
  terms: string[];
}

interface BenefitCardProps {
  benefit: Benefit;
  onClaim: (benefitId: string) => void;
  onViewTerms: (benefitId: string) => void;
}

const categoryColors = {
  transport: "bg-blue-100 text-blue-800 border-blue-200",
  food: "bg-eco-green/10 text-eco-green border-eco-green/20",
  energy: "bg-yellow-100 text-yellow-800 border-yellow-200",
  shopping: "bg-purple-100 text-purple-800 border-purple-200",
  lifestyle: "bg-orange-100 text-orange-800 border-orange-200"
};

const categoryLabels = {
  transport: "Transporte",
  food: "Alimentación", 
  energy: "Energía",
  shopping: "Compras",
  lifestyle: "Estilo de Vida"
};

const discountTypeLabels = {
  percentage: "Descuento",
  fixed: "Descuento",
  free_shipping: "Envío Gratis",
  gift: "Regalo"
};

export const BenefitCard = ({ benefit, onClaim, onViewTerms }: BenefitCardProps) => {
  const progressPercentage = benefit.userProgress ? (benefit.userProgress / benefit.requirement.co2Saved) * 100 : 0;
  const isCloseToUnlock = progressPercentage >= 80 && !benefit.isUnlocked;

  return (
    <Card className={cn(
      "shadow-card hover:shadow-lg transition-all duration-300 animate-slide-up relative overflow-hidden",
      benefit.isUnlocked ? "border-eco-green/30" : "opacity-75"
    )}>
      {/* Unlock Glow Effect */}
      {benefit.isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-eco-green/5 to-transparent" />
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${categoryColors[benefit.category]}`}>
                {categoryLabels[benefit.category]}
              </Badge>
              {benefit.isUnlocked && (
                <Badge className="bg-eco-green/10 text-eco-green animate-badge-glow">
                  <CheckCircle size={10} className="mr-1" />
                  Desbloqueado
                </Badge>
              )}
            </div>
            <CardTitle className="font-poppins text-lg pr-4">{benefit.title}</CardTitle>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            {benefit.isUnlocked ? (
              <CheckCircle size={24} className="text-eco-green" />
            ) : (
              <Lock size={24} className="text-muted-foreground" />
            )}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground font-inter leading-relaxed">
          {benefit.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Partner */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-lg">
              {benefit.partner.logo}
            </div>
            <div>
              <h4 className="font-poppins font-semibold text-sm">{benefit.partner.name}</h4>
              <p className="text-xs text-muted-foreground font-inter">Partner oficial</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-poppins font-bold text-lg text-eco-green">
              {benefit.discount.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {discountTypeLabels[benefit.discount.type]}
            </div>
          </div>
        </div>

        {/* Requirement & Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-inter text-muted-foreground">Requisito</span>
            <span className="font-poppins font-semibold">
              {benefit.requirement.co2Saved} kg CO₂ en {benefit.requirement.period}
            </span>
          </div>
          
          {!benefit.isUnlocked && benefit.userProgress !== undefined && (
            <>
              <Progress 
                value={progressPercentage} 
                className={cn(
                  "h-2",
                  isCloseToUnlock && "animate-pulse-eco"
                )}
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-inter">
                  Tu progreso: {benefit.userProgress} kg CO₂
                </span>
                <span className={cn(
                  "font-poppins font-semibold",
                  isCloseToUnlock ? "text-eco-green" : "text-muted-foreground"
                )}>
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 py-3 border-t border-border text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Users size={14} className="text-muted-foreground" />
              <span className="text-sm font-poppins font-semibold">
                {benefit.usedBy}
                {benefit.maxUses && `/${benefit.maxUses}`}
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-inter">Canjeados</div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-sm font-poppins font-semibold">{benefit.validUntil}</span>
            </div>
            <div className="text-xs text-muted-foreground font-inter">Válido hasta</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {benefit.isUnlocked ? (
            <>
              <Button 
                className="w-full bg-gradient-eco hover:shadow-eco font-inter"
                onClick={() => onClaim(benefit.id)}
              >
                <Gift size={16} className="mr-2" />
                Canjear Beneficio
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full font-inter text-xs"
                onClick={() => onViewTerms(benefit.id)}
              >
                <ExternalLink size={12} className="mr-2" />
                Ver términos y condiciones
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="w-full font-inter" 
                disabled
              >
                <Lock size={16} className="mr-2" />
                {progressPercentage >= 50 ? "¡Casi desbloqueado!" : "Continúa reduciendo CO₂"}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full font-inter text-xs"
                onClick={() => onViewTerms(benefit.id)}
              >
                Ver detalles del beneficio
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};