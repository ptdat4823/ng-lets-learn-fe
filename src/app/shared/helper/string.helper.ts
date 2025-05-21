export const getCharacter = (index: number): string => {
  const charCode = 'A'.charCodeAt(0) + index;
  return String.fromCharCode(charCode);
};

export const generateRandomId = (
  prefix: string = '',
  suffix: string = ''
): string => {
  const randomId = Math.random().toString(36).substring(2, 8);
  if (!prefix && !suffix) return randomId;
  if (!prefix && suffix) return `${randomId}-${suffix}`;
  if (prefix && !suffix) return `${prefix}-${randomId}`;
  return `${prefix}-${randomId}-${suffix}`;
};
