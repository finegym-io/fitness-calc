import { describe, it, expect } from 'vitest';
import { calculateTDEE, getActivityMultiplier } from '../src/tdee';

describe('calculateTDEE', () => {
  it('calculates TDEE for sedentary male', () => {
    const result = calculateTDEE(80, 180, 30, 'male', 'sedentary');
    expect(result.tdee).toBeGreaterThan(2000);
    expect(result.tdee).toBeLessThan(2300);
    expect(result.activityLevel).toBe('sedentary');
  });

  it('calculates higher TDEE for active level', () => {
    const sedentary = calculateTDEE(80, 180, 30, 'male', 'sedentary');
    const active = calculateTDEE(80, 180, 30, 'male', 'active');
    expect(active.tdee).toBeGreaterThan(sedentary.tdee);
  });

  it('returns BMR along with TDEE', () => {
    const result = calculateTDEE(80, 180, 30, 'male', 'moderate');
    expect(result.bmr).toBeGreaterThan(0);
    expect(result.tdee).toBeGreaterThan(result.bmr);
  });
});

describe('getActivityMultiplier', () => {
  it('returns correct multiplier for sedentary', () => {
    expect(getActivityMultiplier('sedentary')).toBe(1.2);
  });

  it('returns correct multiplier for extra_active', () => {
    expect(getActivityMultiplier('extra_active')).toBe(2.1);
  });
});
