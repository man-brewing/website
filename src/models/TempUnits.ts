export const TempUnits = {
  Celsius: 'Celsius',
  Fahrenheit: 'Fahrenheit',
} as const;

export type TempUnits = (typeof TempUnits)[keyof typeof TempUnits];
