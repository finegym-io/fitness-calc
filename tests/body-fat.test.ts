import { describe, it, expect } from 'vitest';
import { calculateBodyFat, getBodyFatCategory } from '../src/body-fat';

describe('calculateBodyFat', () => {
  it('calculates US Navy method for male', () => {
    const result = calculateBodyFat('male', 80, {
      waistCm: 85,
      neckCm: 38,
      heightCm: 180,
    });
    expect(result.bodyFatPercentage).toBeGreaterThan(10);
    expect(result.bodyFatPercentage).toBeLessThan(25);
    expect(result.fatMass).toBeGreaterThan(0);
    expect(result.leanMass).toBeGreaterThan(0);
    expect(result.fatMass + result.leanMass).toBeCloseTo(80, 0);
  });

  it('calculates US Navy method for female', () => {
    const result = calculateBodyFat('female', 60, {
      waistCm: 70,
      neckCm: 32,
      heightCm: 165,
      hipCm: 95,
    });
    expect(result.bodyFatPercentage).toBeGreaterThan(15);
    expect(result.bodyFatPercentage).toBeLessThan(35);
  });

  it('throws for female without hip measurement', () => {
    expect(() =>
      calculateBodyFat('female', 60, {
        waistCm: 70,
        neckCm: 32,
        heightCm: 165,
      }),
    ).toThrow('Hip measurement is required');
  });

  it('throws on zero weight', () => {
    expect(() =>
      calculateBodyFat('male', 0, { waistCm: 85, neckCm: 38, heightCm: 180 }),
    ).toThrow('Weight must be positive');
  });
});

describe('getBodyFatCategory', () => {
  it('classifies male body fat', () => {
    expect(getBodyFatCategory(5, 'male')).toBe('essential');
    expect(getBodyFatCategory(10, 'male')).toBe('athlete');
    expect(getBodyFatCategory(15, 'male')).toBe('fitness');
    expect(getBodyFatCategory(20, 'male')).toBe('average');
    expect(getBodyFatCategory(30, 'male')).toBe('obese');
  });

  it('classifies female body fat', () => {
    expect(getBodyFatCategory(12, 'female')).toBe('essential');
    expect(getBodyFatCategory(18, 'female')).toBe('athlete');
    expect(getBodyFatCategory(23, 'female')).toBe('fitness');
    expect(getBodyFatCategory(28, 'female')).toBe('average');
    expect(getBodyFatCategory(35, 'female')).toBe('obese');
  });
});
