import { describe, it, expect } from 'vitest';
import { calculateOneRepMax, calculateAllFormulas, estimateRepsAtWeight } from '../src/one-rep-max';

describe('calculateOneRepMax', () => {
  it('calculates 1RM with Epley formula', () => {
    const result = calculateOneRepMax(100, 5);
    expect(result.oneRepMax).toBeGreaterThan(110);
    expect(result.oneRepMax).toBeLessThan(120);
    expect(result.formula).toBe('epley');
  });

  it('returns weight as 1RM when reps is 1', () => {
    const result = calculateOneRepMax(100, 1);
    expect(result.oneRepMax).toBe(100);
  });

  it('calculates with Brzycki formula', () => {
    const result = calculateOneRepMax(100, 5, 'brzycki');
    expect(result.oneRepMax).toBeGreaterThan(110);
    expect(result.formula).toBe('brzycki');
  });

  it('includes percentage table', () => {
    const result = calculateOneRepMax(100, 5);
    expect(result.percentages[100]).toBeDefined();
    expect(result.percentages[50]).toBeDefined();
    expect(result.percentages[100]).toBeGreaterThan(result.percentages[50]);
  });

  it('throws on zero weight', () => {
    expect(() => calculateOneRepMax(0, 5)).toThrow('Weight must be positive');
  });

  it('throws on invalid reps', () => {
    expect(() => calculateOneRepMax(100, 0)).toThrow('Reps must be between');
    expect(() => calculateOneRepMax(100, 31)).toThrow('Reps must be between');
  });
});

describe('calculateAllFormulas', () => {
  it('returns results for all formulas', () => {
    const results = calculateAllFormulas(100, 5);
    expect(results.epley).toBeDefined();
    expect(results.brzycki).toBeDefined();
    expect(results.lombardi).toBeDefined();
    expect(results.mayhew).toBeDefined();
    expect(results.oconner).toBeDefined();
    expect(results.wathan).toBeDefined();
    expect(results.lander).toBeDefined();
  });
});

describe('estimateRepsAtWeight', () => {
  it('estimates reps at a given weight', () => {
    const reps = estimateRepsAtWeight(100, 80);
    expect(reps).toBeGreaterThan(5);
    expect(reps).toBeLessThan(15);
  });

  it('returns 1 for max weight', () => {
    expect(estimateRepsAtWeight(100, 100)).toBe(1);
  });

  it('throws when target exceeds max', () => {
    expect(() => estimateRepsAtWeight(100, 110)).toThrow('cannot exceed');
  });
});
