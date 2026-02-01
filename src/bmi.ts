import type { BMIResult, BMICategory } from './types';

function classifyBMI(bmi: number): BMICategory {
  if (bmi < 16) return 'underweight_severe';
  if (bmi < 17) return 'underweight_moderate';
  if (bmi < 18.5) return 'underweight_mild';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  if (bmi < 35) return 'obese_class_1';
  if (bmi < 40) return 'obese_class_2';
  return 'obese_class_3';
}

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  if (weightKg <= 0) throw new RangeError('Weight must be positive');
  if (heightCm <= 0) throw new RangeError('Height must be positive');

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const minHealthyWeight = 18.5 * heightM * heightM;
  const maxHealthyWeight = 24.9 * heightM * heightM;

  return {
    bmi: Math.round(bmi * 10) / 10,
    category: classifyBMI(bmi),
    healthyWeightRange: {
      min: Math.round(minHealthyWeight * 10) / 10,
      max: Math.round(maxHealthyWeight * 10) / 10,
    },
  };
}

export function calculateBMIImperial(weightLbs: number, heightInches: number): BMIResult {
  if (weightLbs <= 0) throw new RangeError('Weight must be positive');
  if (heightInches <= 0) throw new RangeError('Height must be positive');

  const weightKg = weightLbs * 0.453592;
  const heightCm = heightInches * 2.54;
  return calculateBMI(weightKg, heightCm);
}
