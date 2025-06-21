export const getCharacter = (index: number): string => {
  const charCode = 'A'.charCodeAt(0) + index;
  return String.fromCharCode(charCode);
};

export const joinStrings = (
  strings: string[],
  separator: string = ', '
): string => {
  if (!strings || strings.length === 0) return '';
  return strings.join(separator);
};
