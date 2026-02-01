import type { Gender, BodyFatMethod, BodyFatResult } from './types';

export interface USNavyMeasurements {
  waistCm: number;
  neckCm: number;
  heightCm: number;
  hipCm?: number;
}

export function calculateBodyFat(
  gender: Gender,
  weightKg: number,
  measurements: USNavyMeasurements,
  method: BodyFatMethod = 'us_navy',
): BodyFatResult {
  if (weightKg <= 0) throw new RangeError('Weight must be positive');

  let bodyFatPercentage: number;

  switch (method) {
    case 'us_navy': {
      const { waistCm, neckCm, heightCm, hipCm } = measurements;
      if (waistCm <= 0 || neckCm <= 0 || heightCm <= 0) {
        throw new RangeError('All measurements must be positive');
      }
      if (gender === 'female' && (!hipCm || hipCm <= 0)) {
        throw new RangeError('Hip measurement is required for females');
      }

      if (gender === 'male') {
        bodyFatPercentage =
          495 /
            (1.0324 -
              0.19077 * Math.log10(waistCm - neckCm) +
              0.15456 * Math.log10(heightCm)) -
          450;
      } else {
        bodyFatPercentage =
          495 /
            (1.29579 -
              0.35004 * Math.log10(waistCm + hipCm! - neckCm) +
              0.22100 * Math.log10(heightCm)) -
          450;
      }
      break;
    }

    case 'bmi_derived': {
      const heightM = measurements.heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      bodyFatPercentage =
        gender === 'male'
          ? 1.2 * bmi + 0.23 * 30 - 16.2
          : 1.2 * bmi + 0.23 * 30 - 5.4;
      break;
    }

    default:
      throw new Error(`Unknown method: ${method}`);
  }

  bodyFatPercentage = Math.max(0, Math.min(bodyFatPercentage, 70));

  const fatMass = weightKg * (bodyFatPercentage / 100);
  const leanMass = weightKg - fatMass;

  return {
    bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
    fatMass: Math.round(fatMass * 10) / 10,
    leanMass: Math.round(leanMass * 10) / 10,
    method,
  };
}

export function getBodyFatCategory(bodyFatPercentage: number, gender: Gender): string {
  if (gender === 'male') {
    if (bodyFatPercentage < 6) return 'essential';
    if (bodyFatPercentage < 14) return 'athlete';
    if (bodyFatPercentage < 18) return 'fitness';
    if (bodyFatPercentage < 25) return 'average';
    return 'obese';
  } else {
    if (bodyFatPercentage < 14) return 'essential';
    if (bodyFatPercentage < 21) return 'athlete';
    if (bodyFatPercentage < 25) return 'fitness';
    if (bodyFatPercentage < 32) return 'average';
    return 'obese';
  }
}
