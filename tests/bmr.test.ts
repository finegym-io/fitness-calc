import { describe, it, expect } from 'vitest';
import { calculateBMR } from '../src/bmr';

describe('calculateBMR', () => {
  it('calculates Mifflin-St Jeor for male', () => {
    const result = calculateBMR(80, 180, 30, 'male');
    expect(result.bmr).toBeGreaterThan(1700);
    expect(result.bmr).toBeLessThan(1900);
    expect(result.formula).toBe('mifflin_st_jeor');
  });

  it('calculates Mifflin-St Jeor for female', () => {
    const result = calculateBMR(60, 165, 25, 'female');
    expect(result.bmr).toBeGreaterThan(1300);
    expect(result.bmr).toBeLessThan(1500);
  });

  it('calculates Harris-Benedict for male', () => {
    const result = calculateBMR(80, 180, 30, 'male', 'harris_benedict');
    expect(result.bmr).toBeGreaterThan(1800);
    expect(result.bmr).toBeLessThan(2000);
    expect(result.formula).toBe('harris_benedict');
  });

  it('calculates Katch-McArdle with body fat', () => {
    const result = calculateBMR(80, 180, 30, 'male', 'katch_mcardle', 15);
    expect(result.bmr).toBeGreaterThan(1800);
    expect(result.bmr).toBeLessThan(1900);
  });

  it('throws when Katch-McArdle missing body fat', () => {
    expect(() => calculateBMR(80, 180, 30, 'male', 'katch_mcardle')).toThrow(
      'Body fat percentage is required',
    );
  });

  it('throws on invalid age', () => {
    expect(() => calculateBMR(80, 180, 0, 'male')).toThrow('Age must be between');
  });

  it('throws on negative weight', () => {
    expect(() => calculateBMR(-1, 180, 30, 'male')).toThrow('Weight must be positive');
  });
});
