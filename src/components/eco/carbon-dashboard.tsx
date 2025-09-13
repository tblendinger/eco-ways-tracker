import { TrendingDown, TrendingUp, Calendar, Target, Zap, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CarbonData {
  total: number;
  weeklyChange: number;
  monthlyGoal: number;
  streak?: number;
  breakdown: {
    transport: number;
    food: number;
    energy: number;
    shopping: number;
  };
}

interface CarbonDashboardProps {
  data: CarbonData;
  onRegisterAction: () => void;
}

export const CarbonDashboard = ({ data, onRegisterAction }: CarbonDashboardProps) => {
  const { total, weeklyChange, monthlyGoal, streak = 0, breakdown } = data;
  const totalBreakdown = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const goalProgress = (total / monthlyGoal) * 100;
  
  const categories = [
    { key: 'food', label: 'Alimentación', value: breakdown.food, color: 'bg-eco-green' },
    { key: 'transport', label: 'Transporte', value: breakdown.transport, color: 'bg-blue-500' },
    { key: 'energy', label: 'Hogar', value: breakdown.energy, color: 'bg-yellow-500' },
    { key: 'shopping', label: 'Compras', value: breakdown.shopping, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-poppins font-bold text-2xl text-foreground">Tu Huella de Carbono</h1>
        <p className="text-muted-foreground font-inter">Seguimiento semanal y mensual</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-poppins font-bold text-eco-green">{total}</div>
              <div className="text-sm text-muted-foreground">kg CO₂e esta semana</div>
              <div className="flex items-center justify-center space-x-1">
                {weeklyChange < 0 ? (
                  <TrendingDown size={16} className="text-eco-green" />
                ) : (
                  <TrendingUp size={16} className="text-eco-warning" />
                )}
                <span className={`text-sm font-inter ${weeklyChange < 0 ? 'text-eco-green' : 'text-eco-warning'}`}>
                  {Math.abs(weeklyChange)}% vs semana anterior
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-poppins font-bold text-foreground">{monthlyGoal}</div>
              <div className="text-sm text-muted-foreground">kg CO₂e objetivo mensual</div>
              <Progress value={goalProgress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {goalProgress.toFixed(0)}% del objetivo
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Leaf size={24} className="text-eco-green" />
                <span className="text-3xl font-poppins font-bold text-eco-green">{streak}</span>
              </div>
              <div className="text-sm text-muted-foreground">días de racha</div>
              {streak >= 7 && (
                <Badge className="bg-eco-green text-white">
                  ¡Racha Desbloqueada! 🍃
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Button 
                onClick={onRegisterAction}
                className="w-full bg-gradient-eco hover:shadow-eco transition-all duration-300"
              >
                <Zap size={18} className="mr-2" />
                Registrar Acción
              </Button>
              <div className="text-xs text-muted-foreground">
                ¿Qué hiciste hoy?
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-poppins text-lg flex items-center space-x-2">
            <Calendar size={20} />
            <span>Desglose por Categoría</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category) => {
            const percentage = totalBreakdown > 0 ? (category.value / totalBreakdown) * 100 : 0;
            return (
              <div key={category.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <span className="font-inter font-medium">{category.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {percentage.toFixed(0)}%
                    </Badge>
                    <span className="text-sm font-poppins font-semibold">
                      {category.value} kg CO₂e
                    </span>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Empty State Helper */}
      {total === 0 && (
        <Card className="shadow-card bg-gradient-subtle border-dashed">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto">
              <Target size={32} className="text-eco-green" />
            </div>
            <div className="space-y-2">
              <h3 className="font-poppins font-semibold text-lg">Todavía no registraste acciones</h3>
              <p className="text-muted-foreground font-inter">
                Empieza con un preset y comienza a trackear tu impacto ambiental
              </p>
            </div>
            <Button 
              onClick={onRegisterAction}
              className="bg-gradient-eco hover:shadow-eco transition-all duration-300"
            >
              Comenzar Ahora
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};