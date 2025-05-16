import { Component, computed, inject, signal } from '@angular/core';
import { ComboboxService } from '@shared/components/combobox/combobox.service';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import {
  getEndDateOfWeek,
  getStartDateOfWeek,
} from '@shared/helper/date.helper';
import { mockCourses } from '@shared/mocks/course';
import { CalendarRange } from '../calendar/calendar.type';
import { CalendarPageService } from './calendar-page.service';
import { mockTopics } from '@shared/mocks/topic';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';

@Component({
  selector: 'calendar-page',
  standalone: false,
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
  providers: [ComboboxService, CalendarPageService],
})
export class CalendarPageComponent {
  courseOptions: ComboboxOption[] = [
    { value: 'all', label: 'All courses' },
    ...mockCourses.map((course) => ({
      value: course.id,
      label: course.title,
    })),
  ];

  topics = mockTopics;

  calendarRange = signal<CalendarRange>({
    start: getStartDateOfWeek(new Date()),
    end: getEndDateOfWeek(new Date()),
  });

  calendarRangeText = computed(() =>
    this.calendarPageService.formatCalendarRange(this.calendarRange())
  );

  constructor(
    private calendarPageService: CalendarPageService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {
        label: 'Calendar',
        url: '/calendar',
        active: true,
      },
    ]);
  }

  navigatePrevious(): void {
    const newDate = new Date(this.calendarRange().start);
    newDate.setDate(this.calendarRange().start.getDate() - 7);
    this.calendarRange.set({
      start: getStartDateOfWeek(newDate),
      end: getEndDateOfWeek(newDate),
    });
  }

  navigateNext(): void {
    const newDate = new Date(this.calendarRange().start);
    newDate.setDate(this.calendarRange().start.getDate() + 7);
    this.calendarRange.set({
      start: getStartDateOfWeek(newDate),
      end: getEndDateOfWeek(newDate),
    });
  }

  onSelectOption(option: ComboboxOption) {
    console.log('Selected option:', option);
  }
}
