export type {
  Gender,
  ActivityLevel,
  BMRFormula,
  OneRepMaxFormula,
  BodyFatMethod,
  BMICategory,
  HeartRateZoneModel,
  BMIResult,
  BMRResult,
  TDEEResult,
  MacroResult,
  MacroGoals,
  OneRepMaxResult,
  BodyFatResult,
  HeartRateZone,
  HeartRateZonesResult,
  PaceResult,
  WaterIntakeResult,
  IdealWeightResult,
  CalorieBurnResult,
  DistanceUnit,
} from './types';

export { calculateBMI, calculateBMIImperial } from './bmi';
export { calculateBMR } from './bmr';
export { calculateTDEE, getActivityMultiplier } from './tdee';
export { calculateMacros, calculateMacrosFromCalories, getPresetRatios } from './macros';
export type { MacroRatio, MacroPreset } from './macros';
export { calculateOneRepMax, calculateAllFormulas, estimateRepsAtWeight } from './one-rep-max';
export { calculateBodyFat, getBodyFatCategory } from './body-fat';
export type { USNavyMeasurements } from './body-fat';
export { estimateMaxHeartRate, calculateHeartRateZones, getTargetHeartRate } from './heart-rate';
export { calculatePace, paceToSpeed, speedToPace, estimateRaceTime } from './pace';
export { calculateIdealWeight } from './ideal-weight';
export { calculateWaterIntake } from './water-intake';
export { calculateCaloriesBurned, getAvailableActivities } from './calories';
export {
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
} from './conversions';
