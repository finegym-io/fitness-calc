import type { PaceResult, DistanceUnit } from './types';

const KM_TO_MILES = 0.621371;
const MILES_TO_KM = 1.60934;

function formatPace(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function calculatePace(
  distance: number,
  timeMinutes: number,
  unit: DistanceUnit = 'km',
): PaceResult {
  if (distance <= 0) throw new RangeError('Distance must be positive');
  if (timeMinutes <= 0) throw new RangeError('Time must be positive');

  const distanceKm = unit === 'mi' ? distance * MILES_TO_KM : distance;
  const distanceMi = unit === 'km' ? distance * KM_TO_MILES : distance;

  const totalSeconds = timeMinutes * 60;
  const secondsPerKm = totalSeconds / distanceKm;
  const secondsPerMile = totalSeconds / distanceMi;

  const speedKmh = (distanceKm / timeMinutes) * 60;
  const speedMph = (distanceMi / timeMinutes) * 60;

  return {
    pacePerKm: formatPace(secondsPerKm),
    pacePerMile: formatPace(secondsPerMile),
    speedKmh: Math.round(speedKmh * 100) / 100,
    speedMph: Math.round(speedMph * 100) / 100,
  };
}

export function paceToSpeed(paceMinPerKm: string): { kmh: number; mph: number } {
  const parts = paceMinPerKm.split(':');
  if (parts.length !== 2) throw new Error('Pace must be in "mm:ss" format');

  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  const totalMinutes = minutes + seconds / 60;

  if (totalMinutes <= 0) throw new RangeError('Pace must be positive');

  const kmh = 60 / totalMinutes;
  const mph = kmh * KM_TO_MILES;

  return {
    kmh: Math.round(kmh * 100) / 100,
    mph: Math.round(mph * 100) / 100,
  };
}

export function speedToPace(speedKmh: number): { perKm: string; perMile: string } {
  if (speedKmh <= 0) throw new RangeError('Speed must be positive');

  const secondsPerKm = 3600 / speedKmh;
  const secondsPerMile = secondsPerKm / KM_TO_MILES;

  return {
    perKm: formatPace(secondsPerKm),
    perMile: formatPace(secondsPerMile),
  };
}

export function estimateRaceTime(
  knownDistance: number,
  knownTimeMinutes: number,
  targetDistance: number,
  unit: DistanceUnit = 'km',
): { estimatedMinutes: number; formatted: string } {
  if (knownDistance <= 0 || targetDistance <= 0) throw new RangeError('Distance must be positive');
  if (knownTimeMinutes <= 0) throw new RangeError('Time must be positive');

  const riegelExponent = 1.06;
  const estimatedMinutes =
    knownTimeMinutes * Math.pow(targetDistance / knownDistance, riegelExponent);

  const hours = Math.floor(estimatedMinutes / 60);
  const minutes = Math.floor(estimatedMinutes % 60);
  const seconds = Math.round((estimatedMinutes % 1) * 60);

  let formatted: string;
  if (hours > 0) {
    formatted = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return {
    estimatedMinutes: Math.round(estimatedMinutes * 100) / 100,
    formatted,
  };
}
