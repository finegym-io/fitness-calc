import { describe, it, expect } from 'vitest';
import { calculatePace, paceToSpeed, speedToPace, estimateRaceTime } from '../src/pace';

describe('calculatePace', () => {
  it('calculates pace for 5km in 25 minutes', () => {
    const result = calculatePace(5, 25, 'km');
    expect(result.pacePerKm).toBe('5:00');
    expect(result.speedKmh).toBe(12);
  });

  it('calculates pace in imperial', () => {
    const result = calculatePace(3.1, 25, 'mi');
    expect(result.pacePerMile).toBeDefined();
    expect(result.speedMph).toBeGreaterThan(0);
  });

  it('throws on zero distance', () => {
    expect(() => calculatePace(0, 25)).toThrow('Distance must be positive');
  });

  it('throws on zero time', () => {
    expect(() => calculatePace(5, 0)).toThrow('Time must be positive');
  });
});

describe('paceToSpeed', () => {
  it('converts pace to speed', () => {
    const result = paceToSpeed('5:00');
    expect(result.kmh).toBe(12);
    expect(result.mph).toBeGreaterThan(7);
  });

  it('throws on invalid format', () => {
    expect(() => paceToSpeed('invalid')).toThrow('Pace must be in');
  });
});

describe('speedToPace', () => {
  it('converts speed to pace', () => {
    const result = speedToPace(12);
    expect(result.perKm).toBe('5:00');
  });

  it('throws on zero speed', () => {
    expect(() => speedToPace(0)).toThrow('Speed must be positive');
  });
});

describe('estimateRaceTime', () => {
  it('estimates marathon from 5K time', () => {
    const result = estimateRaceTime(5, 25, 42.195);
    expect(result.estimatedMinutes).toBeGreaterThan(200);
    expect(result.formatted).toContain(':');
  });

  it('throws on invalid distance', () => {
    expect(() => estimateRaceTime(0, 25, 10)).toThrow();
  });
});
