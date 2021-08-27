/**
 * Gets the index of the first item that has the matching attribute.
 * @param {*} array 
 * @param {*} attr 
 * @param {*} value 
 * @returns 
 */
export function indexOfByAttr(array, attr, value) {
    return array.findIndex(item => item[attr] === value);
}

/**
 * Converts a Celsius measurement to Fahrenheit.
 * @param {*} celsius 
 * @returns 
 */
export function toFahrenheit(celsius) {
    return (celsius * 1.8) + 32;
}