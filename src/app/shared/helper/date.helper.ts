import { format } from 'date-fns';

function getStartDateOfWeek(date = new Date()): Date {
  const start = new Date(date);
  const day = start.getDay(); // 0 = Sunday
  start.setDate(start.getDate() - day);
  start.setHours(0, 0, 0, 0); // Reset time to midnight
  return start;
}

function getEndDateOfWeek(date = new Date()): Date {
  const start = getStartDateOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // 7 day range (inclusive)
  return end;
}

const isInDate = (date: Date, toCompare: Date) => {
  return (
    date.getFullYear() === toCompare.getFullYear() &&
    date.getMonth() === toCompare.getMonth() &&
    date.getDate() === toCompare.getDate()
  );
};

const formatDateString = (
  date: string | null,
  pattern: string = 'MM/dd/yyyy HH:mm a'
) => {
  if (!date) return '';
  try {
    return format(new Date(date), pattern);
  } catch (error) {
    return '';
  }
};

// 3680s -> 1 hour 1 minute 20 second
const getDurationText = (startTime: any, endTime: any, fixed: number = 6) => {
  if (!startTime || !endTime) return '';

  try {
    startTime = new Date(startTime);
    endTime = new Date(endTime);
  } catch (e) {
    return '';
  }

  const duration = Math.abs(
    Math.floor(endTime / 1000) - Math.floor(startTime / 1000)
  );
  return getTimeStringByDuration(duration, fixed);
};

const getTimeStringByDuration = (duration: number, fixed: number = 6) => {
  const years = Math.floor(duration / 31536000);
  duration -= years * 31536000;
  const months = Math.floor(duration / 2628000);
  duration -= months * 2628000;
  const days = Math.floor(duration / 86400);
  duration -= days * 86400;
  const hours = Math.floor(duration / 3600);
  duration -= hours * 3600;
  const minutes = Math.floor((duration % 3600) / 60);
  duration -= minutes * 60;
  const seconds = duration % 60;
  // any value that is 0 will not be displayed
  const time = [
    years && `${years} ${years > 1 ? 'years' : 'year'}`,
    months && `${months} ${months > 1 ? 'months' : 'month'}`,
    days && `${days} ${days > 1 ? 'days' : 'day'}`,
    hours && `${hours} ${hours > 1 ? 'hours' : 'hour'}`,
    minutes && `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`,
    seconds && `${seconds} ${seconds > 1 ? 'seconds' : 'second'}`,
  ]
    .filter((value) => {
      if (value && fixed > 0) {
        fixed -= 1;
        return value;
      }
      return false;
    })
    .join(' ');

  return time;
};

const getShortTimeStringByDuration = (duration: number, fixed: number = 6) => {
  const years = Math.floor(duration / 31536000);
  duration -= years * 31536000;
  const months = Math.floor(duration / 2628000);
  duration -= months * 2628000;
  const days = Math.floor(duration / 86400);
  duration -= days * 86400;
  const hours = Math.floor(duration / 3600);
  duration -= hours * 3600;
  const minutes = Math.floor((duration % 3600) / 60);
  duration -= minutes * 60;
  const seconds = duration % 60;
  // any value that is 0 will not be displayed
  const time = [
    years && `${years}Y`,
    months && `${months}M`,
    days && `${days}D`,
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    seconds && `${seconds}s`,
  ]
    .filter((value) => {
      if (value && fixed > 0) {
        fixed -= 1;
        return value;
      }
      return false;
    })
    .join(' ');

  return time;
};

const getBaseTime = () => {
  const baseTime = new Date();
  baseTime.setHours(0, 0, 0, 0); // Reset time to midnight
  return baseTime;
};

const getTimeBySeconds = (seconds: number) => {
  const baseTime = getBaseTime();
  return new Date(baseTime.setSeconds(seconds));
};

const removeMilliseconds = (date: Date) => {
  date.setMilliseconds(0);
  return date;
};

const compareTime = (date1: Date, date2: Date): number => {
  if (date1.getTime() > date2.getTime()) return 1;
  if (date1.getTime() < date2.getTime()) return -1;
  return 0;
};


const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  if (month < 0) month = 11;
  return months[month] || '';
};

const generateMonthOptions = (count: number = 12): { label: string; value: string }[] => {
  const now = new Date();
  const options: { label: string; value: string }[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    const value = `${date.getFullYear()}-${date.getMonth()}`; // e.g., "2024-6"
    options.push({ label, value });
  }
  return options;
};

export {
  getDurationText,
  getTimeStringByDuration,
  getShortTimeStringByDuration,
  getStartDateOfWeek,
  getEndDateOfWeek,
  isInDate,
  formatDateString,
  getBaseTime,
  getTimeBySeconds,
  removeMilliseconds,
  compareTime,
  getMonthName,
  generateMonthOptions
};
