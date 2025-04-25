import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import {
  getEndDateOfWeek,
  getStartDateOfWeek,
  isInDate,
} from '@shared/helper/date.helper';
import { Topic } from '@shared/models/topic';
import { format } from 'date-fns';
import { CalendarService } from './calendar.service';
import { CalendarRange, DateItem, TopicItem } from './calendar.type';

@Component({
  selector: 'calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [CalendarService],
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() range: CalendarRange = {
    start: getStartDateOfWeek(new Date()),
    end: getEndDateOfWeek(new Date()),
  };
  @Input() topics: Topic[] = [];
  calendarService = inject(CalendarService);

  calendar: DateItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.calendar = this.calendarService.handleGetDateItems(
      this.range,
      this.topics
    );
  }

  ngOnChanges(): void {
    this.calendar = this.calendarService.handleGetDateItems(
      this.range,
      this.topics
    );
  }

  getDateOfWeek(date: Date): string {
    return format(date, 'eee');
  }

  getDateNumber(date: Date): number {
    return date.getDate();
  }

  getTopicTime(topic: TopicItem, date: Date): string {
    return this.calendarService.getTopicTime(topic, date);
  }

  isCurrentDate(date: Date): boolean {
    return isInDate(date, new Date());
  }
}
