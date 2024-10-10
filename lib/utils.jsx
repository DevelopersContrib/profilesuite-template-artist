export function removeSpecialCharacters(text) {
    // Regular expression to match any character that is not a letter, number, or whitespace
    const regex = /[^a-zA-Z0-9\s]/g;
    return text.replace(regex, '');
}