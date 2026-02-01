import type { OneRepMaxFormula, OneRepMaxResult } from './types';

const FORMULAS: Record<OneRepMaxFormula, (weight: number, reps: number) => number> = {
  epley: (w, r) => w * (1 + r / 30),
  brzycki: (w, r) => w * (36 / (37 - r)),
  lombardi: (w, r) => w * Math.pow(r, 0.1),
  mayhew: (w, r) => (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r)),
  oconner: (w, r) => w * (1 + r / 40),
  wathan: (w, r) => (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r)),
  lander: (w, r) => (100 * w) / (101.3 - 2.67123 * r),
};

function generatePercentages(oneRepMax: number): Record<number, number> {
  const percentages: Record<number, number> = {};
  for (let pct = 100; pct >= 50; pct -= 5) {
    percentages[pct] = Math.round((oneRepMax * pct) / 100 * 10) / 10;
  }
  return percentages;
}

export function calculateOneRepMax(
  weight: number,
  reps: number,
  formula: OneRepMaxFormula = 'epley',
): OneRepMaxResult {
  if (weight <= 0) throw new RangeError('Weight must be positive');
  if (reps < 1 || reps > 30) throw new RangeError('Reps must be between 1 and 30');

  if (reps === 1) {
    return {
      oneRepMax: Math.round(weight * 10) / 10,
      formula,
      percentages: generatePercentages(weight),
    };
  }

  const formulaFn = FORMULAS[formula];
  if (!formulaFn) {
    throw new Error(`Unknown formula: ${formula}`);
  }

  const oneRepMax = formulaFn(weight, reps);

  return {
    oneRepMax: Math.round(oneRepMax * 10) / 10,
    formula,
    percentages: generatePercentages(oneRepMax),
  };
}

export function calculateAllFormulas(
  weight: number,
  reps: number,
): Record<OneRepMaxFormula, number> {
  if (weight <= 0) throw new RangeError('Weight must be positive');
  if (reps < 1 || reps > 30) throw new RangeError('Reps must be between 1 and 30');

  const results: Partial<Record<OneRepMaxFormula, number>> = {};

  for (const [name, fn] of Object.entries(FORMULAS)) {
    const value = reps === 1 ? weight : fn(weight, reps);
    results[name as OneRepMaxFormula] = Math.round(value * 10) / 10;
  }

  return results as Record<OneRepMaxFormula, number>;
}

export function estimateRepsAtWeight(
  oneRepMax: number,
  targetWeight: number,
  formula: OneRepMaxFormula = 'epley',
): number {
  if (oneRepMax <= 0) throw new RangeError('One rep max must be positive');
  if (targetWeight <= 0) throw new RangeError('Target weight must be positive');
  if (targetWeight > oneRepMax) throw new RangeError('Target weight cannot exceed one rep max');

  if (targetWeight === oneRepMax) return 1;

  const ratio = targetWeight / oneRepMax;

  switch (formula) {
    case 'epley':
      return Math.round(30 * (1 / ratio - 1));
    case 'brzycki':
      return Math.round(37 - 36 * ratio);
    case 'oconner':
      return Math.round(40 * (1 / ratio - 1));
    case 'lander':
      return Math.round((101.3 - 100 * ratio) / 2.67123);
    default:
      return Math.round(30 * (1 / ratio - 1));
  }
}
