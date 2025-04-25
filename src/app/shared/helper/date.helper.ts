export function getStartDateOfWeek(date = new Date()): Date {
  const start = new Date(date);
  const day = start.getDay(); // 0 = Sunday
  start.setDate(start.getDate() - day);
  start.setHours(0, 0, 0, 0); // Reset time to midnight
  return start;
}

export function getEndDateOfWeek(date = new Date()): Date {
  const start = getStartDateOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // 7 day range (inclusive)
  return end;
}

export const isInDate = (date: Date, toCompare: Date) => {
  return (
    date.getFullYear() === toCompare.getFullYear() &&
    date.getMonth() === toCompare.getMonth() &&
    date.getDate() === toCompare.getDate()
  );
};
