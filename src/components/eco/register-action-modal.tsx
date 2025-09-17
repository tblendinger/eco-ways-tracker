import { useState } from "react";
import { Loader2, Calculator, Share2, Save, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  calculateCarbonFootprint, 
  saveAction, 
  TRANSPORT_MODES, 
  DISTANCE_PRESETS, 
  EMISSION_FACTORS, 
  DEFAULT_BASELINE,
  type CalculationResponse 
} from "@/services/carbon-calculator";
import { CalculationReadme } from "./calculation-readme";

interface RegisterActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionSaved?: (savedCo2: number) => void;
  onActionShared?: (content: string) => void;
}

export const RegisterActionModal = ({ 
  open, 
  onOpenChange, 
  onActionSaved, 
  onActionShared 
}: RegisterActionModalProps) => {
  const [category] = useState("transporte"); // Pre-selected for demo
  const [mode, setMode] = useState("");
  const [distance, setDistance] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [calculation, setCalculation] = useState<CalculationResponse | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  const handleDistancePreset = (preset: number) => {
    setDistance(preset.toString());
  };

  const handleCalculate = async () => {
    if (!mode || !distance || Number(distance) <= 0) {
      toast({
        title: "Error de validación",
        description: "Por favor seleccioná un modo de transporte e ingresá una distancia válida.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    try {
      const result = await calculateCarbonFootprint({
        user_id: "demo-user-1",
        category,
        mode,
        distance_km: Number(distance),
        factor_baseline: DEFAULT_BASELINE,
        factors: EMISSION_FACTORS
      });
      
      setCalculation(result);
      setShowSteps(true); // Auto-expand steps after calculation
      
      toast({
        title: "Cálculo completado",
        description: `Ahorro estimado: ${result.saved_co2_kg} kg CO₂`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo calcular el impacto. Intentá de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSave = async () => {
    if (!calculation || !mode) return;

    setIsSaving(true);
    try {
      await saveAction({
        user_id: "demo-user-1",
        category,
        mode,
        distance_km: Number(distance),
        factor_baseline: DEFAULT_BASELINE,
        factors: EMISSION_FACTORS
      }, calculation);

      onActionSaved?.(calculation.saved_co2_kg);
      
      toast({
        title: "Acción guardada",
        description: `Tu acción de ${mode} ${distance}km fue registrada exitosamente.`
      });

      // Reset form
      setMode("");
      setDistance("");
      setCalculation(null);
      setShowSteps(false);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la acción. Intentá de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    if (!calculation || !mode) return;

    const modeData = TRANSPORT_MODES.find(m => m.key === mode);
    const shareContent = `¡Acabo de ahorrar ${calculation.saved_co2_kg} kg CO₂ usando ${modeData?.label} por ${distance}km! ${modeData?.icon} Una reducción del ${calculation.reduction_pct}% vs mi consumo promedio. #EcoWaysTracker #SostenibilidadUrbana`;
    
    onActionShared?.(shareContent);
    
    toast({
      title: "Contenido preparado",
      description: "Tu acción está lista para compartir en el feed."
    });
    
    onOpenChange(false);
  };

  const selectedModeData = TRANSPORT_MODES.find(m => m.key === mode);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins text-xl">Registrar acción</DialogTitle>
          <DialogDescription className="font-inter">
            Calculá tu impacto ambiental y registrá tus acciones sostenibles
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category (Pre-selected) */}
          <div className="space-y-2">
            <Label className="font-inter font-medium">¿Qué hiciste?</Label>
            <Badge variant="secondary" className="bg-eco-green text-white">
              Transporte
            </Badge>
          </div>

          {/* Transport Mode Selection */}
          <div className="space-y-2">
            <Label htmlFor="mode" className="font-inter font-medium">Modo de transporte</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná el modo de transporte" />
              </SelectTrigger>
              <SelectContent>
                {TRANSPORT_MODES.map((transportMode) => (
                  <SelectItem key={transportMode.key} value={transportMode.key}>
                    <div className="flex items-center space-x-2">
                      <span>{transportMode.icon}</span>
                      <span>{transportMode.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Distance Input */}
          <div className="space-y-2">
            <Label htmlFor="distance" className="font-inter font-medium">Distancia (km)</Label>
            <div className="space-y-3">
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Ingresá distancia (km)"
                min="0"
                step="0.1"
              />
              <div className="flex flex-wrap gap-2">
                {DISTANCE_PRESETS.map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDistancePreset(preset)}
                    className="text-xs"
                  >
                    {preset}km
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate}
            disabled={isCalculating || !mode || !distance}
            className="w-full bg-gradient-eco hover:shadow-eco transition-all duration-300"
          >
            {isCalculating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Calculator className="mr-2 h-4 w-4" />
            )}
            {isCalculating ? "Calculando..." : "Calcular & Guardar"}
          </Button>

          {/* Calculation Results */}
          {calculation && (
            <Card className="shadow-card">
              <CardContent className="p-4 space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-poppins font-bold text-eco-green">
                    {calculation.saved_co2_kg} kg CO₂
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ahorro estimado ({calculation.reduction_pct}% reducción)
                  </div>
                  {selectedModeData && (
                    <div className="text-lg">
                      {selectedModeData.icon} {selectedModeData.label} - {distance}km
                    </div>
                  )}
                </div>

                {/* Calculation Steps */}
                <div className="border-t pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSteps(!showSteps)}
                    className="w-full justify-between text-xs"
                  >
                    Ver cálculo paso a paso
                    {showSteps ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                  
                  {showSteps && (
                    <div className="mt-3 space-y-1 text-xs font-mono bg-muted p-3 rounded-md">
                      {calculation.calculation_steps.map((step, index) => (
                        <div key={index} className="text-muted-foreground">
                          {step}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  Estimación basada en un auto promedio: {DEFAULT_BASELINE} kg CO₂/km.
                  <br />
                  Ajustá en Ajustes.
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-eco-green hover:bg-eco-green/90"
                  >
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Guardar acción
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir en feed
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* No savings message */}
          {calculation && calculation.saved_co2_kg <= 0 && (
            <Card className="border-eco-warning bg-eco-warning/5">
              <CardContent className="p-4 text-center">
                <div className="text-eco-warning font-inter text-sm">
                  Esta acción no reduce tus emisiones respecto a tu consumo promedio.
                </div>
              </CardContent>
            </Card>
          )}

          {/* Calculation Info */}
          <div className="border-t pt-4">
            <CalculationReadme />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};