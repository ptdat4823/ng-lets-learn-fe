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

export const generateId = (length: number = 8): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};
