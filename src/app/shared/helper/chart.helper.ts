export const hexToRgba = (hex: string, alpha: number): string => {
  const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthand, (_, r, g, b) => r + r + g + g + b + b);

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) return hex;

  const r = parseInt(match[1], 16);
  const g = parseInt(match[2], 16);
  const b = parseInt(match[3], 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
