import { describe, it, expect } from 'vitest';
import { estimateMaxHeartRate, calculateHeartRateZones, getTargetHeartRate } from '../src/heart-rate';

describe('estimateMaxHeartRate', () => {
  it('estimates MHR with Tanaka formula', () => {
    const mhr = estimateMaxHeartRate(30);
    expect(mhr).toBe(187);
  });

  it('estimates MHR with Fox formula', () => {
    const mhr = estimateMaxHeartRate(30, 'fox');
    expect(mhr).toBe(190);
  });

  it('throws on invalid age', () => {
    expect(() => estimateMaxHeartRate(0)).toThrow();
    expect(() => estimateMaxHeartRate(121)).toThrow();
  });
});

describe('calculateHeartRateZones', () => {
  it('returns 5 zones with standard model', () => {
    const result = calculateHeartRateZones(30);
    expect(result.zones).toHaveLength(5);
    expect(result.maxHeartRate).toBe(187);
  });

  it('returns Karvonen zones with resting HR', () => {
    const result = calculateHeartRateZones(30, 60, 'karvonen');
    expect(result.zones).toHaveLength(5);
    expect(result.zones[0].min).toBeGreaterThan(60);
  });

  it('throws when Karvonen used without resting HR', () => {
    expect(() => calculateHeartRateZones(30, undefined, 'karvonen')).toThrow(
      'Resting heart rate is required',
    );
  });

  it('uses custom max heart rate when provided', () => {
    const result = calculateHeartRateZones(30, undefined, 'standard', 200);
    expect(result.maxHeartRate).toBe(200);
  });
});

describe('getTargetHeartRate', () => {
  it('calculates target HR at given intensity', () => {
    const thr = getTargetHeartRate(30, 70);
    expect(thr).toBeGreaterThan(120);
    expect(thr).toBeLessThan(140);
  });

  it('calculates with Karvonen method when resting HR provided', () => {
    const standard = getTargetHeartRate(30, 70);
    const karvonen = getTargetHeartRate(30, 70, 60);
    expect(karvonen).not.toBe(standard);
  });

  it('throws on invalid intensity', () => {
    expect(() => getTargetHeartRate(30, -1)).toThrow();
    expect(() => getTargetHeartRate(30, 101)).toThrow();
  });
});
