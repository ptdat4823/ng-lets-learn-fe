export const getCharacter = (index: number): string => {
  const charCode = 'A'.charCodeAt(0) + index;
  return String.fromCharCode(charCode);
};
