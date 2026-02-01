import type { Gender, BMRFormula, BMRResult } from './types';

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  formula: BMRFormula = 'mifflin_st_jeor',
  bodyFatPercentage?: number,
): BMRResult {
  if (weightKg <= 0) throw new RangeError('Weight must be positive');
  if (heightCm <= 0) throw new RangeError('Height must be positive');
  if (age <= 0 || age > 120) throw new RangeError('Age must be between 1 and 120');

  let bmr: number;

  switch (formula) {
    case 'mifflin_st_jeor':
      bmr =
        gender === 'male'
          ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
          : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
      break;

    case 'harris_benedict':
      bmr =
        gender === 'male'
          ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
          : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
      break;

    case 'katch_mcardle':
      if (bodyFatPercentage === undefined) {
        throw new Error('Body fat percentage is required for Katch-McArdle formula');
      }
      if (bodyFatPercentage < 0 || bodyFatPercentage > 100) {
        throw new RangeError('Body fat percentage must be between 0 and 100');
      }
      const leanMass = weightKg * (1 - bodyFatPercentage / 100);
      bmr = 370 + 21.6 * leanMass;
      break;

    default:
      throw new Error(`Unknown formula: ${formula}`);
  }

  return {
    bmr: Math.round(bmr),
    formula,
  };
}
