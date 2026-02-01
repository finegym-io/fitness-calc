import { describe, it, expect } from 'vitest';
import {
  lbsToKg,
  kgToLbs,
  inchesToCm,
  cmToInches,
  feetInchesToCm,
  cmToFeetInches,
  kmToMiles,
  milesToKm,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from '../src/conversions';

describe('weight conversions', () => {
  it('converts lbs to kg', () => {
    expect(lbsToKg(100)).toBeCloseTo(45.36, 1);
  });

  it('converts kg to lbs', () => {
    expect(kgToLbs(100)).toBeCloseTo(220.46, 1);
  });

  it('round trips weight', () => {
    expect(lbsToKg(kgToLbs(75))).toBeCloseTo(75, 0);
  });
});

describe('height conversions', () => {
  it('converts inches to cm', () => {
    expect(inchesToCm(69)).toBeCloseTo(175.26, 1);
  });

  it('converts cm to inches', () => {
    expect(cmToInches(175)).toBeCloseTo(68.9, 0);
  });

  it('converts feet/inches to cm', () => {
    expect(feetInchesToCm(5, 9)).toBeCloseTo(175.26, 1);
  });

  it('converts cm to feet/inches', () => {
    const result = cmToFeetInches(175);
    expect(result.feet).toBe(5);
    expect(result.inches).toBeCloseTo(8.9, 0);
  });
});

describe('distance conversions', () => {
  it('converts km to miles', () => {
    expect(kmToMiles(10)).toBeCloseTo(6.21, 1);
  });

  it('converts miles to km', () => {
    expect(milesToKm(6.21)).toBeCloseTo(10, 0);
  });
});

describe('temperature conversions', () => {
  it('converts celsius to fahrenheit', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it('converts fahrenheit to celsius', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
    expect(fahrenheitToCelsius(212)).toBe(100);
  });
});
