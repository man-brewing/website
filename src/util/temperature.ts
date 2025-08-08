/**
 * Converts a Celsius measurement to Fahrenheit.
 * @param {*} celsius
 * @returns
 */
export const toFahrenheit = (celsius: number) => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Converts a Fahrenheit measurement to Celsius.
 * @param {*} fahrenheit
 * @returns
 */
export const toCelsius = (fahrenheit: number) => {
  return (fahrenheit - 32) * (5 / 9);
};
