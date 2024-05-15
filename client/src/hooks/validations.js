export function isOnlySpaces(input) {
    return input.trim().length === 0;
}

export function isOnlyAlphabet(input) {
    return /^[a-zA-Z\s]+$/.test(input);
}

export function isAlphanumeric(input) {
    return /^[a-zA-Z0-9]+$/.test(input);
}
