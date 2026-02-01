import type { Gender, ActivityLevel, BMRFormula, TDEEResult } from './types';
import { calculateBMR } from './bmr';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
  extra_active: 2.1,
};

export function calculateTDEE(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  formula: BMRFormula = 'mifflin_st_jeor',
  bodyFatPercentage?: number,
): TDEEResult {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  if (multiplier === undefined) {
    throw new Error(`Unknown activity level: ${activityLevel}`);
  }

  const { bmr } = calculateBMR(weightKg, heightCm, age, gender, formula, bodyFatPercentage);
  const tdee = bmr * multiplier;

  return {
    tdee: Math.round(tdee),
    bmr,
    activityLevel,
  };
}

export function getActivityMultiplier(activityLevel: ActivityLevel): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  if (multiplier === undefined) {
    throw new Error(`Unknown activity level: ${activityLevel}`);
  }
  return multiplier;
}
