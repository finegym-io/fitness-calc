import { describe, it, expect } from 'vitest';
import { calculateCaloriesBurned, getAvailableActivities } from '../src/calories';

describe('calculateCaloriesBurned', () => {
  it('calculates calories for running', () => {
    const result = calculateCaloriesBurned(70, 30, 'running_6mph');
    expect(result.totalCalories).toBeGreaterThan(250);
    expect(result.totalCalories).toBeLessThan(400);
    expect(result.caloriesPerMinute).toBeGreaterThan(0);
  });

  it('accepts custom MET value', () => {
    const result = calculateCaloriesBurned(70, 30, 8.0);
    expect(result.totalCalories).toBeGreaterThan(0);
  });

  it('heavier person burns more calories', () => {
    const light = calculateCaloriesBurned(60, 30, 'running_6mph');
    const heavy = calculateCaloriesBurned(90, 30, 'running_6mph');
    expect(heavy.totalCalories).toBeGreaterThan(light.totalCalories);
  });

  it('throws on unknown activity', () => {
    expect(() => calculateCaloriesBurned(70, 30, 'flying')).toThrow('Unknown activity');
  });

  it('throws on zero weight', () => {
    expect(() => calculateCaloriesBurned(0, 30, 'running_6mph')).toThrow();
  });

  it('throws on zero duration', () => {
    expect(() => calculateCaloriesBurned(70, 0, 'running_6mph')).toThrow();
  });
});

describe('getAvailableActivities', () => {
  it('returns all activities', () => {
    const activities = getAvailableActivities();
    expect(Object.keys(activities).length).toBeGreaterThan(20);
    expect(activities).toHaveProperty('running_6mph');
    expect(activities).toHaveProperty('yoga');
    expect(activities).toHaveProperty('crossfit');
  });
});
