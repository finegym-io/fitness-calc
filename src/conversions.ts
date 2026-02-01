export function lbsToKg(lbs: number): number {
  return Math.round(lbs * 0.453592 * 100) / 100;
}

export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462 * 100) / 100;
}

export function inchesToCm(inches: number): number {
  return Math.round(inches * 2.54 * 100) / 100;
}

export function cmToInches(cm: number): number {
  return Math.round(cm / 2.54 * 100) / 100;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * 2.54 * 100) / 100;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round((totalInches % 12) * 10) / 10;
  return { feet, inches };
}

export function kmToMiles(km: number): number {
  return Math.round(km * 0.621371 * 100) / 100;
}

export function milesToKm(miles: number): number {
  return Math.round(miles * 1.60934 * 100) / 100;
}

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9 / 5 + 32) * 10) / 10;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5 / 9) * 10) / 10;
}
