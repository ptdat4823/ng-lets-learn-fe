export const getLocalStorageData = <T>(
  key: string,
  defaultValue: T | null = null
): T | null => {
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;
  return JSON.parse(data) as T;
};

export const setLocalStorageData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearLocalStorageData = (key: string): void => {
  localStorage.removeItem(key);
};
