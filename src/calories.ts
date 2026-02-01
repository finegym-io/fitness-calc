import type { CalorieBurnResult } from './types';

const MET_VALUES: Record<string, number> = {
  walking_slow: 2.5,
  walking_moderate: 3.5,
  walking_brisk: 4.3,
  running_5mph: 8.3,
  running_6mph: 9.8,
  running_7mph: 11.0,
  running_8mph: 11.8,
  running_9mph: 12.8,
  running_10mph: 14.5,
  cycling_leisure: 4.0,
  cycling_moderate: 6.8,
  cycling_vigorous: 10.0,
  swimming_leisure: 6.0,
  swimming_moderate: 8.3,
  swimming_vigorous: 10.0,
  weight_training_light: 3.5,
  weight_training_moderate: 5.0,
  weight_training_vigorous: 6.0,
  yoga: 3.0,
  pilates: 3.8,
  hiit: 8.0,
  crossfit: 8.0,
  rowing_moderate: 7.0,
  rowing_vigorous: 12.0,
  jump_rope_slow: 8.8,
  jump_rope_moderate: 11.8,
  jump_rope_fast: 14.0,
  elliptical: 5.0,
  stair_climbing: 9.0,
  boxing: 7.8,
  dancing: 5.5,
  hiking: 6.0,
  rock_climbing: 8.0,
  tennis: 7.3,
  basketball: 6.5,
  soccer: 7.0,
  martial_arts: 10.3,
  stretching: 2.3,
  rest: 1.0,
};

export function calculateCaloriesBurned(
  weightKg: number,
  durationMinutes: number,
  activity: string | number,
): CalorieBurnResult {
  if (weightKg <= 0) throw new RangeError('Weight must be positive');
  if (durationMinutes <= 0) throw new RangeError('Duration must be positive');

  let met: number;

  if (typeof activity === 'number') {
    if (activity <= 0) throw new RangeError('MET value must be positive');
    met = activity;
  } else {
    const metValue = MET_VALUES[activity];
    if (metValue === undefined) {
      throw new Error(
        `Unknown activity: ${activity}. Use a numeric MET value or one of: ${Object.keys(MET_VALUES).join(', ')}`,
      );
    }
    met = metValue;
  }

  const totalCalories = (met * 3.5 * weightKg * durationMinutes) / 200;
  const caloriesPerMinute = totalCalories / durationMinutes;

  return {
    totalCalories: Math.round(totalCalories),
    caloriesPerMinute: Math.round(caloriesPerMinute * 10) / 10,
  };
}

export function getAvailableActivities(): Record<string, number> {
  return { ...MET_VALUES };
}
