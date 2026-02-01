import { describe, it, expect } from 'vitest';
import { calculateBMI, calculateBMIImperial } from '../src/bmi';

describe('calculateBMI', () => {
  it('calculates normal BMI correctly', () => {
    const result = calculateBMI(70, 175);
    expect(result.bmi).toBe(22.9);
    expect(result.category).toBe('normal');
  });

  it('classifies underweight correctly', () => {
    const result = calculateBMI(50, 170);
    expect(result.category).toBe('underweight_mild');
  });

  it('classifies overweight correctly', () => {
    const result = calculateBMI(85, 170);
    expect(result.category).toBe('overweight');
  });

  it('classifies obese class 1 correctly', () => {
    const result = calculateBMI(100, 175);
    expect(result.category).toBe('obese_class_1');
  });

  it('classifies obese class 3 correctly', () => {
    const result = calculateBMI(150, 170);
    expect(result.category).toBe('obese_class_3');
  });

  it('returns healthy weight range', () => {
    const result = calculateBMI(70, 175);
    expect(result.healthyWeightRange.min).toBeGreaterThan(50);
    expect(result.healthyWeightRange.max).toBeLessThan(80);
  });

  it('throws on zero weight', () => {
    expect(() => calculateBMI(0, 175)).toThrow('Weight must be positive');
  });

  it('throws on negative height', () => {
    expect(() => calculateBMI(70, -1)).toThrow('Height must be positive');
  });
});

describe('calculateBMIImperial', () => {
  it('calculates BMI from imperial units', () => {
    const result = calculateBMIImperial(154, 69);
    expect(result.bmi).toBeGreaterThan(20);
    expect(result.bmi).toBeLessThan(25);
    expect(result.category).toBe('normal');
  });

  it('throws on invalid input', () => {
    expect(() => calculateBMIImperial(-1, 69)).toThrow();
  });
});
