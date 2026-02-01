import { describe, it, expect } from 'vitest';
import { calculateMacros, calculateMacrosFromCalories, getPresetRatios } from '../src/macros';

describe('calculateMacros', () => {
  it('calculates balanced macros', () => {
    const result = calculateMacros(80, 180, 30, 'male', 'moderate');
    expect(result.maintenance.calories).toBeGreaterThan(2500);
    expect(result.maintenance.protein).toBeGreaterThan(0);
    expect(result.maintenance.carbs).toBeGreaterThan(0);
    expect(result.maintenance.fat).toBeGreaterThan(0);
  });

  it('cutting calories are less than maintenance', () => {
    const result = calculateMacros(80, 180, 30, 'male', 'moderate');
    expect(result.cutting.calories).toBeLessThan(result.maintenance.calories);
  });

  it('bulking calories are more than maintenance', () => {
    const result = calculateMacros(80, 180, 30, 'male', 'moderate');
    expect(result.bulking.calories).toBeGreaterThan(result.maintenance.calories);
  });

  it('accepts preset ratios', () => {
    const result = calculateMacros(80, 180, 30, 'male', 'moderate', 'keto');
    expect(result.maintenance.fat).toBeGreaterThan(result.maintenance.carbs);
  });

  it('accepts custom ratios', () => {
    const result = calculateMacros(80, 180, 30, 'male', 'moderate', {
      protein: 0.5,
      carbs: 0.3,
      fat: 0.2,
    });
    expect(result.maintenance.protein).toBeGreaterThan(result.maintenance.carbs);
  });

  it('throws on invalid ratio sum', () => {
    expect(() =>
      calculateMacros(80, 180, 30, 'male', 'moderate', {
        protein: 0.5,
        carbs: 0.5,
        fat: 0.5,
      }),
    ).toThrow('Macro ratios must sum to 1.0');
  });
});

describe('calculateMacrosFromCalories', () => {
  it('calculates macros from raw calories', () => {
    const result = calculateMacrosFromCalories(2500);
    expect(result.calories).toBe(2500);
    expect(result.protein).toBeGreaterThan(0);
    expect(result.carbs).toBeGreaterThan(0);
    expect(result.fat).toBeGreaterThan(0);
  });

  it('throws on zero calories', () => {
    expect(() => calculateMacrosFromCalories(0)).toThrow('Calories must be positive');
  });
});

describe('getPresetRatios', () => {
  it('returns all presets', () => {
    const presets = getPresetRatios();
    expect(presets).toHaveProperty('balanced');
    expect(presets).toHaveProperty('keto');
    expect(presets).toHaveProperty('high_protein');
  });
});
