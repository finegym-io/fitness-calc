import type { HeartRateZoneModel, HeartRateZone, HeartRateZonesResult } from './types';

export function estimateMaxHeartRate(age: number, formula: 'tanaka' | 'fox' = 'tanaka'): number {
  if (age <= 0 || age > 120) throw new RangeError('Age must be between 1 and 120');

  switch (formula) {
    case 'tanaka':
      return Math.round(208 - 0.7 * age);
    case 'fox':
      return Math.round(220 - age);
    default:
      throw new Error(`Unknown formula: ${formula}`);
  }
}

export function calculateHeartRateZones(
  age: number,
  restingHeartRate?: number,
  model: HeartRateZoneModel = 'standard',
  maxHeartRate?: number,
): HeartRateZonesResult {
  const mhr = maxHeartRate ?? estimateMaxHeartRate(age);

  if (model === 'karvonen' && restingHeartRate === undefined) {
    throw new Error('Resting heart rate is required for Karvonen model');
  }

  const zoneDefinitions = [
    { name: 'Zone 1 - Recovery', min: 0.5, max: 0.6, description: 'Very light activity, warm-up and recovery' },
    { name: 'Zone 2 - Endurance', min: 0.6, max: 0.7, description: 'Light aerobic, fat burning, base fitness' },
    { name: 'Zone 3 - Aerobic', min: 0.7, max: 0.8, description: 'Moderate aerobic, cardiovascular improvement' },
    { name: 'Zone 4 - Threshold', min: 0.8, max: 0.9, description: 'Hard effort, lactate threshold training' },
    { name: 'Zone 5 - Maximum', min: 0.9, max: 1.0, description: 'Maximum effort, anaerobic capacity' },
  ];

  const zones: HeartRateZone[] = zoneDefinitions.map((zone) => {
    let min: number;
    let max: number;

    if (model === 'karvonen') {
      const hrr = mhr - restingHeartRate!;
      min = Math.round(hrr * zone.min + restingHeartRate!);
      max = Math.round(hrr * zone.max + restingHeartRate!);
    } else {
      min = Math.round(mhr * zone.min);
      max = Math.round(mhr * zone.max);
    }

    return { name: zone.name, min, max, description: zone.description };
  });

  return {
    maxHeartRate: mhr,
    restingHeartRate,
    zones,
  };
}

export function getTargetHeartRate(
  age: number,
  intensityPercent: number,
  restingHeartRate?: number,
): number {
  if (intensityPercent < 0 || intensityPercent > 100) {
    throw new RangeError('Intensity must be between 0 and 100');
  }

  const mhr = estimateMaxHeartRate(age);
  const intensity = intensityPercent / 100;

  if (restingHeartRate !== undefined) {
    const hrr = mhr - restingHeartRate;
    return Math.round(hrr * intensity + restingHeartRate);
  }

  return Math.round(mhr * intensity);
}
