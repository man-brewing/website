export function indexOfByAttr(array, attr, value) {
    return array.findIndex(item => item[attr] === value);
}