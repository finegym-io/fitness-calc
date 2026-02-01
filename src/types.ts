export type Gender = 'male' | 'female';

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'
  | 'extra_active';

export type BMRFormula = 'mifflin_st_jeor' | 'harris_benedict' | 'katch_mcardle';

export type OneRepMaxFormula =
  | 'epley'
  | 'brzycki'
  | 'lombardi'
  | 'mayhew'
  | 'oconner'
  | 'wathan'
  | 'lander';

export type BodyFatMethod = 'us_navy' | 'bmi_derived';

export type BMICategory =
  | 'underweight_severe'
  | 'underweight_moderate'
  | 'underweight_mild'
  | 'normal'
  | 'overweight'
  | 'obese_class_1'
  | 'obese_class_2'
  | 'obese_class_3';

export type HeartRateZoneModel = 'standard' | 'karvonen';

export interface BMIResult {
  bmi: number;
  category: BMICategory;
  healthyWeightRange: { min: number; max: number };
}

export interface BMRResult {
  bmr: number;
  formula: BMRFormula;
}

export interface TDEEResult {
  tdee: number;
  bmr: number;
  activityLevel: ActivityLevel;
}

export interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroGoals {
  maintenance: MacroResult;
  cutting: MacroResult;
  bulking: MacroResult;
}

export interface OneRepMaxResult {
  oneRepMax: number;
  formula: OneRepMaxFormula;
  percentages: Record<number, number>;
}

export interface BodyFatResult {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  method: BodyFatMethod;
}

export interface HeartRateZone {
  name: string;
  min: number;
  max: number;
  description: string;
}

export interface HeartRateZonesResult {
  maxHeartRate: number;
  restingHeartRate?: number;
  zones: HeartRateZone[];
}

export interface PaceResult {
  pacePerKm: string;
  pacePerMile: string;
  speedKmh: number;
  speedMph: number;
}

export interface WaterIntakeResult {
  liters: number;
  ounces: number;
}

export interface IdealWeightResult {
  robinson: number;
  miller: number;
  devine: number;
  hamwi: number;
  average: number;
}

export interface CalorieBurnResult {
  totalCalories: number;
  caloriesPerMinute: number;
}

export type DistanceUnit = 'km' | 'mi';
