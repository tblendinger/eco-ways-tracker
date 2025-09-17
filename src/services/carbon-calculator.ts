// Carbon Calculator Service - Mock API Implementation

export interface CalculationRequest {
  user_id: string;
  category: string;
  mode: string;
  distance_km: number;
  factor_baseline: number;
  factors: Record<string, number>;
}

export interface CalculationResponse {
  baseline_co2_kg: number;
  mode_co2_kg: number;
  saved_co2_kg: number;
  reduction_pct: number;
  calculation_steps: string[];
}

export interface ActionRecord {
  id: string;
  user_id: string;
  category: string;
  mode: string;
  distance_km: number;
  saved_co2_kg: number;
  reduction_pct: number;
  timestamp: Date;
}

// Mock data storage
let actionRecords: ActionRecord[] = [];

// Emission factors (kg CO₂ per km)
export const EMISSION_FACTORS = {
  auto: 0.21,
  moto: 0.10,
  bus: 0.05,
  tren: 0.04,
  bicicleta: 0.0,
  caminata: 0.0,
};

export const DEFAULT_BASELINE = 0.21; // Auto promedio

// Mock API delay simulation
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 800));

export const calculateCarbonFootprint = async (request: CalculationRequest): Promise<CalculationResponse> => {
  await simulateApiDelay();

  const { distance_km, factor_baseline, factors, mode } = request;
  
  // Calculation step by step
  const baseline_co2_kg = distance_km * factor_baseline;
  const mode_factor = factors[mode] || 0;
  const mode_co2_kg = distance_km * mode_factor;
  const saved_co2_kg = Math.max(0, baseline_co2_kg - mode_co2_kg);
  const reduction_pct = baseline_co2_kg > 0 ? (saved_co2_kg / baseline_co2_kg) * 100 : 0;

  // Generate calculation steps for transparency
  const calculation_steps = [
    `baseline_co2_kg = ${distance_km} * ${factor_baseline} = ${baseline_co2_kg.toFixed(2)}`,
    `mode_co2_kg = ${distance_km} * ${mode_factor} = ${mode_co2_kg.toFixed(2)}`,
    `saved_co2_kg = ${baseline_co2_kg.toFixed(2)} - ${mode_co2_kg.toFixed(2)} = ${saved_co2_kg.toFixed(2)}`,
    `reduction_pct = (${saved_co2_kg.toFixed(2)} / ${baseline_co2_kg.toFixed(2)}) * 100 = ${reduction_pct.toFixed(0)}%`
  ];

  return {
    baseline_co2_kg: Number(baseline_co2_kg.toFixed(2)),
    mode_co2_kg: Number(mode_co2_kg.toFixed(2)),
    saved_co2_kg: Number(saved_co2_kg.toFixed(2)),
    reduction_pct: Number(reduction_pct.toFixed(0)),
    calculation_steps
  };
};

export const saveAction = async (request: CalculationRequest, calculation: CalculationResponse): Promise<ActionRecord> => {
  await simulateApiDelay();

  const action: ActionRecord = {
    id: `action_${Date.now()}`,
    user_id: request.user_id,
    category: request.category,
    mode: request.mode,
    distance_km: request.distance_km,
    saved_co2_kg: calculation.saved_co2_kg,
    reduction_pct: calculation.reduction_pct,
    timestamp: new Date()
  };

  actionRecords.push(action);
  return action;
};

export const getRecentActions = (): ActionRecord[] => {
  return actionRecords.slice(-10).reverse(); // Last 10 actions
};

// Transport modes configuration
export const TRANSPORT_MODES = [
  { key: 'auto', label: 'Auto', icon: '🚗' },
  { key: 'moto', label: 'Moto', icon: '🏍️' },
  { key: 'bus', label: 'Bus', icon: '🚌' },
  { key: 'tren', label: 'Tren', icon: '🚊' },
  { key: 'bicicleta', label: 'Bicicleta', icon: '🚲' },
  { key: 'caminata', label: 'Caminata', icon: '🚶' },
];

export const DISTANCE_PRESETS = [1, 5, 10, 20];