import type { Gender, ActivityLevel, BMRFormula, MacroResult, MacroGoals } from './types';
import { calculateTDEE } from './tdee';

export interface MacroRatio {
  protein: number;
  carbs: number;
  fat: number;
}

const PRESET_RATIOS = {
  balanced: { protein: 0.3, carbs: 0.4, fat: 0.3 },
  low_carb: { protein: 0.4, carbs: 0.2, fat: 0.4 },
  high_carb: { protein: 0.25, carbs: 0.55, fat: 0.2 },
  high_protein: { protein: 0.4, carbs: 0.35, fat: 0.25 },
  keto: { protein: 0.3, carbs: 0.05, fat: 0.65 },
  zone: { protein: 0.3, carbs: 0.4, fat: 0.3 },
} as const;

export type MacroPreset = keyof typeof PRESET_RATIOS;

function caloriesFromMacros(calories: number, ratio: MacroRatio): MacroResult {
  return {
    calories: Math.round(calories),
    protein: Math.round((calories * ratio.protein) / 4),
    carbs: Math.round((calories * ratio.carbs) / 4),
    fat: Math.round((calories * ratio.fat) / 9),
  };
}

export function calculateMacros(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  ratio: MacroRatio | MacroPreset = 'balanced',
  formula: BMRFormula = 'mifflin_st_jeor',
  bodyFatPercentage?: number,
): MacroGoals {
  const resolvedRatio: MacroRatio =
    typeof ratio === 'string' ? { ...PRESET_RATIOS[ratio] } : ratio;

  const sum = resolvedRatio.protein + resolvedRatio.carbs + resolvedRatio.fat;
  if (Math.abs(sum - 1) > 0.01) {
    throw new Error(`Macro ratios must sum to 1.0, got ${sum}`);
  }

  const { tdee } = calculateTDEE(
    weightKg,
    heightCm,
    age,
    gender,
    activityLevel,
    formula,
    bodyFatPercentage,
  );

  return {
    maintenance: caloriesFromMacros(tdee, resolvedRatio),
    cutting: caloriesFromMacros(tdee * 0.8, resolvedRatio),
    bulking: caloriesFromMacros(tdee * 1.15, resolvedRatio),
  };
}

export function calculateMacrosFromCalories(
  calories: number,
  ratio: MacroRatio | MacroPreset = 'balanced',
): MacroResult {
  if (calories <= 0) throw new RangeError('Calories must be positive');

  const resolvedRatio: MacroRatio =
    typeof ratio === 'string' ? { ...PRESET_RATIOS[ratio] } : ratio;

  return caloriesFromMacros(calories, resolvedRatio);
}

export function getPresetRatios(): Record<MacroPreset, MacroRatio> {
  return { ...PRESET_RATIOS };
}
