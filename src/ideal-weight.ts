import type { Gender, IdealWeightResult } from './types';

export function calculateIdealWeight(heightCm: number, gender: Gender): IdealWeightResult {
  if (heightCm <= 0) throw new RangeError('Height must be positive');

  const heightInches = heightCm / 2.54;
  const inchesOver5Feet = Math.max(0, heightInches - 60);

  let robinson: number;
  let miller: number;
  let devine: number;
  let hamwi: number;

  if (gender === 'male') {
    robinson = 52 + 1.9 * inchesOver5Feet;
    miller = 56.2 + 1.41 * inchesOver5Feet;
    devine = 50 + 2.3 * inchesOver5Feet;
    hamwi = 48 + 2.7 * inchesOver5Feet;
  } else {
    robinson = 49 + 1.7 * inchesOver5Feet;
    miller = 53.1 + 1.36 * inchesOver5Feet;
    devine = 45.5 + 2.3 * inchesOver5Feet;
    hamwi = 45.5 + 2.2 * inchesOver5Feet;
  }

  const average = (robinson + miller + devine + hamwi) / 4;

  return {
    robinson: Math.round(robinson * 10) / 10,
    miller: Math.round(miller * 10) / 10,
    devine: Math.round(devine * 10) / 10,
    hamwi: Math.round(hamwi * 10) / 10,
    average: Math.round(average * 10) / 10,
  };
}
