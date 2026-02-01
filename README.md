# @finegym/fitness-calc

A comprehensive, zero-dependency TypeScript library for fitness and health calculations. Covers everything from body composition to workout planning.

Built by the team behind [FineGym](https://www.finegym.io) — modern gym management software.

## Features

- **BMI** — Body Mass Index with WHO classification
- **BMR** — Basal Metabolic Rate (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle)
- **TDEE** — Total Daily Energy Expenditure with 6 activity levels
- **Macros** — Macronutrient calculations with preset diets (balanced, keto, high protein, etc.)
- **1RM** — One Rep Max with 7 formulas (Epley, Brzycki, Lombardi, Mayhew, O'Conner, Wathan, Lander)
- **Body Fat** — US Navy method and BMI-derived estimation
- **Heart Rate Zones** — Standard and Karvonen models with 5 training zones
- **Calories Burned** — MET-based calculations for 30+ activities
- **Pace & Speed** — Running pace, speed conversions, and race time prediction (Riegel formula)
- **Ideal Weight** — Robinson, Miller, Devine, and Hamwi formulas
- **Water Intake** — Daily hydration recommendations by activity level
- **Unit Conversions** — Weight, height, distance, and temperature

## Installation

```bash
npm install @finegym/fitness-calc
```

```bash
yarn add @finegym/fitness-calc
```

```bash
pnpm add @finegym/fitness-calc
```

## Quick Start

```typescript
import { calculateBMI, calculateTDEE, calculateOneRepMax, calculateMacros } from '@finegym/fitness-calc';

// BMI
const bmi = calculateBMI(75, 180);
// { bmi: 23.1, category: 'normal', healthyWeightRange: { min: 59.9, max: 80.7 } }

// TDEE
const tdee = calculateTDEE(75, 180, 28, 'male', 'moderate');
// { tdee: 2713, bmr: 1750, activityLevel: 'moderate' }

// 1RM - Bench press: 100kg for 5 reps
const orm = calculateOneRepMax(100, 5);
// { oneRepMax: 116.7, formula: 'epley', percentages: { 100: 116.7, 95: 110.9, ... } }

// Macros
const macros = calculateMacros(75, 180, 28, 'male', 'moderate', 'high_protein');
// { maintenance: { calories: 2713, protein: 271, carbs: 237, fat: 75 }, cutting: {...}, bulking: {...} }
```

## API Reference

### Body Composition

#### `calculateBMI(weightKg, heightCm)`

Returns BMI value, WHO category, and healthy weight range.

```typescript
const result = calculateBMI(70, 175);
// { bmi: 22.9, category: 'normal', healthyWeightRange: { min: 56.7, max: 76.3 } }
```

Categories: `underweight_severe`, `underweight_moderate`, `underweight_mild`, `normal`, `overweight`, `obese_class_1`, `obese_class_2`, `obese_class_3`

#### `calculateBMIImperial(weightLbs, heightInches)`

Same as `calculateBMI` but accepts imperial units.

#### `calculateBodyFat(gender, weightKg, measurements, method?)`

Estimates body fat percentage using the US Navy method or BMI-derived formula.

```typescript
const result = calculateBodyFat('male', 80, {
  waistCm: 85,
  neckCm: 38,
  heightCm: 180,
});
// { bodyFatPercentage: 16.2, fatMass: 13.0, leanMass: 67.0, method: 'us_navy' }
```

#### `getBodyFatCategory(bodyFatPercentage, gender)`

Returns category: `essential`, `athlete`, `fitness`, `average`, or `obese`.

#### `calculateIdealWeight(heightCm, gender)`

Returns ideal weight from 4 formulas plus average.

```typescript
const result = calculateIdealWeight(180, 'male');
// { robinson: 72.6, miller: 71.5, devine: 75.0, hamwi: 77.1, average: 74.1 }
```

### Energy & Nutrition

#### `calculateBMR(weightKg, heightCm, age, gender, formula?, bodyFatPercentage?)`

Formulas: `mifflin_st_jeor` (default), `harris_benedict`, `katch_mcardle`

```typescript
const result = calculateBMR(80, 180, 30, 'male');
// { bmr: 1780, formula: 'mifflin_st_jeor' }
```

#### `calculateTDEE(weightKg, heightCm, age, gender, activityLevel, formula?, bodyFatPercentage?)`

Activity levels: `sedentary`, `light`, `moderate`, `active`, `very_active`, `extra_active`

```typescript
const result = calculateTDEE(80, 180, 30, 'male', 'moderate');
// { tdee: 2759, bmr: 1780, activityLevel: 'moderate' }
```

#### `calculateMacros(weightKg, heightCm, age, gender, activityLevel, ratio?, formula?, bodyFatPercentage?)`

Presets: `balanced`, `low_carb`, `high_carb`, `high_protein`, `keto`, `zone`

```typescript
// Using preset
const result = calculateMacros(80, 180, 30, 'male', 'moderate', 'keto');

// Using custom ratio (must sum to 1.0)
const custom = calculateMacros(80, 180, 30, 'male', 'moderate', {
  protein: 0.35,
  carbs: 0.40,
  fat: 0.25,
});
```

Returns `{ maintenance, cutting, bulking }` each with `{ calories, protein, carbs, fat }` in grams.

#### `calculateMacrosFromCalories(calories, ratio?)`

Calculate macros from a known calorie target.

#### `calculateCaloriesBurned(weightKg, durationMinutes, activity)`

30+ built-in activities or pass a custom MET value.

```typescript
// Using built-in activity
const result = calculateCaloriesBurned(70, 30, 'running_6mph');
// { totalCalories: 360, caloriesPerMinute: 12.0 }

// Using custom MET value
const custom = calculateCaloriesBurned(70, 30, 8.5);
```

#### `calculateWaterIntake(weightKg, activityLevel?)`

Daily water intake recommendation.

```typescript
const result = calculateWaterIntake(75, 'active');
// { liters: 3.5, ounces: 118 }
```

### Strength Training

#### `calculateOneRepMax(weight, reps, formula?)`

7 formulas: `epley` (default), `brzycki`, `lombardi`, `mayhew`, `oconner`, `wathan`, `lander`

```typescript
const result = calculateOneRepMax(100, 5, 'brzycki');
// { oneRepMax: 112.5, formula: 'brzycki', percentages: { 100: 112.5, 95: 106.9, ... } }
```

#### `calculateAllFormulas(weight, reps)`

Returns 1RM from all 7 formulas for comparison.

#### `estimateRepsAtWeight(oneRepMax, targetWeight, formula?)`

Estimates how many reps you can do at a given weight.

### Cardio & Running

#### `calculateHeartRateZones(age, restingHeartRate?, model?, maxHeartRate?)`

Models: `standard` (default), `karvonen`

```typescript
const zones = calculateHeartRateZones(30, 60, 'karvonen');
// { maxHeartRate: 187, restingHeartRate: 60, zones: [{ name: 'Zone 1 - Recovery', min: 124, max: 136, ... }, ...] }
```

#### `getTargetHeartRate(age, intensityPercent, restingHeartRate?)`

Get target heart rate at a specific intensity.

#### `calculatePace(distance, timeMinutes, unit?)`

```typescript
const pace = calculatePace(5, 25, 'km');
// { pacePerKm: '5:00', pacePerMile: '8:03', speedKmh: 12, speedMph: 7.46 }
```

#### `paceToSpeed(paceMinPerKm)` / `speedToPace(speedKmh)`

Convert between pace and speed.

#### `estimateRaceTime(knownDistance, knownTimeMinutes, targetDistance, unit?)`

Predict race times using the Riegel formula.

```typescript
const marathon = estimateRaceTime(5, 25, 42.195);
// { estimatedMinutes: 236.87, formatted: '3:56:52' }
```

### Unit Conversions

```typescript
import { lbsToKg, kgToLbs, inchesToCm, cmToInches, feetInchesToCm, cmToFeetInches, kmToMiles, milesToKm, celsiusToFahrenheit, fahrenheitToCelsius } from '@finegym/fitness-calc';

lbsToKg(155);           // 70.31
kgToLbs(70);            // 154.32
feetInchesToCm(5, 10);  // 177.8
cmToFeetInches(180);    // { feet: 5, inches: 10.9 }
kmToMiles(10);          // 6.21
celsiusToFahrenheit(37); // 98.6
```

## TypeScript Support

Full TypeScript support with exported types for all inputs and outputs:

```typescript
import type {
  Gender,
  ActivityLevel,
  BMRFormula,
  OneRepMaxFormula,
  BMIResult,
  TDEEResult,
  MacroGoals,
  OneRepMaxResult,
  HeartRateZonesResult,
  PaceResult,
} from '@finegym/fitness-calc';
```

## Scientific References

| Calculation | Formula/Source |
|-------------|---------------|
| BMR | Mifflin-St Jeor (1990), Harris-Benedict (1919, revised 1984), Katch-McArdle |
| BMI | WHO Classification |
| Body Fat | U.S. Navy Circumference Method |
| 1RM | Epley, Brzycki, Lombardi, Mayhew et al., O'Conner et al., Wathan, Lander |
| Heart Rate | Tanaka (2001), Fox & Haskell (1970), Karvonen Method |
| Calories | Metabolic Equivalent of Task (MET) values from Compendium of Physical Activities |
| Ideal Weight | Robinson (1983), Miller (1983), Devine (1974), Hamwi (1964) |
| Race Time | Riegel Formula (1981) |
| Water Intake | National Academies of Sciences guidelines |

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT - see [LICENSE](LICENSE) for details.

## About FineGym

This library is maintained by [FineGym](https://www.finegym.io), a modern gym management platform that helps fitness businesses streamline operations, manage members, and grow their business. Learn more at [finegym.io](https://www.finegym.io).
