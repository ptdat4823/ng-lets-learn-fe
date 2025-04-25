import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { CalendarRange } from '../calendar/calendar.type';

@Injectable()
export class CalendarPageService {
  constructor() {}

  formatCalendarRange = (range: CalendarRange) => {
    const isDifferentYear =
      range.start.getFullYear() !== range.end.getFullYear();

    const startText = isDifferentYear
      ? format(range.start, 'MMM d, yyyy')
      : format(range.start, 'MMM d');
    const endText = format(range.end, 'MMM d, yyyy');
    return `${startText} - ${endText}`;
  };
}
