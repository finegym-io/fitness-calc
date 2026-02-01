import type { ActivityLevel, WaterIntakeResult } from './types';

const ACTIVITY_WATER_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.0,
  light: 1.12,
  moderate: 1.25,
  active: 1.4,
  very_active: 1.55,
  extra_active: 1.7,
};

export function calculateWaterIntake(
  weightKg: number,
  activityLevel: ActivityLevel = 'moderate',
): WaterIntakeResult {
  if (weightKg <= 0) throw new RangeError('Weight must be positive');

  const multiplier = ACTIVITY_WATER_MULTIPLIERS[activityLevel];
  if (multiplier === undefined) {
    throw new Error(`Unknown activity level: ${activityLevel}`);
  }

  const baseLiters = weightKg * 0.033;
  const liters = baseLiters * multiplier;
  const ounces = liters * 33.814;

  return {
    liters: Math.round(liters * 10) / 10,
    ounces: Math.round(ounces),
  };
}
