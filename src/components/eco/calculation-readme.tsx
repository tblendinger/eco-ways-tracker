import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Calculator } from "lucide-react";

export const CalculationReadme = () => {
  const factors = [
    { mode: "Auto", factor: 0.21, icon: "🚗", color: "bg-red-500" },
    { mode: "Moto", factor: 0.10, icon: "🏍️", color: "bg-orange-500" },
    { mode: "Bus", factor: 0.05, icon: "🚌", color: "bg-yellow-500" },
    { mode: "Tren", factor: 0.04, icon: "🚊", color: "bg-blue-500" },
    { mode: "Bicicleta", factor: 0.0, icon: "🚲", color: "bg-eco-green" },
    { mode: "Caminata", factor: 0.0, icon: "🚶", color: "bg-eco-green" },
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="font-poppins text-lg flex items-center space-x-2">
          <Info size={20} className="text-eco-green" />
          <span>Factores de Emisión</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground font-inter">
          Los cálculos se basan en factores de emisión promedio (kg CO₂ por km):
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {factors.map((factor) => (
            <div key={factor.mode} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
              <div className="flex items-center space-x-2">
                <span>{factor.icon}</span>
                <span className="font-inter text-sm">{factor.mode}</span>
              </div>
              <Badge 
                className={`${factor.color} text-white text-xs`}
              >
                {factor.factor} kg/km
              </Badge>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Calculator size={16} className="text-eco-green" />
            <span className="font-inter font-medium text-sm">Fórmula de Cálculo:</span>
          </div>
          
          <div className="text-xs font-mono bg-muted p-3 rounded-md space-y-1">
            <div>baseline_co2 = distancia × {factors[0].factor} (auto promedio)</div>
            <div>mode_co2 = distancia × factor_modo</div>
            <div>ahorro_co2 = baseline_co2 - mode_co2</div>
            <div>reducción_% = (ahorro_co2 / baseline_co2) × 100</div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            💡 Los factores son configurables desde Ajustes. Basados en promedios de Argentina.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};