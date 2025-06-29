import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ComboboxService } from '@shared/components/combobox/combobox.service';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import {
  getEndDateOfWeek,
  getStartDateOfWeek,
} from '@shared/helper/date.helper';
import { Course } from '@shared/models/course';
import { Topic } from '@shared/models/topic';
import { Role, User } from '@shared/models/user';
import { CalendarRange } from '../calendar/calendar.type';
import { CalendarPageService } from './calendar-page.service';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { UserService } from '@shared/services/user.service';
import { GetPublicCourses, GetTeacherCourses } from '@modules/courses/api/courses.api';
import { GetAllWorkingTopicsOfUser } from '@shared/api/user.api';

@Component({
  selector: 'calendar-page',
  standalone: false,
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
  providers: [ComboboxService, CalendarPageService],
})
export class CalendarPageComponent implements OnInit {
  courseOptions: ComboboxOption[] = [
    { value: 'all', label: 'All courses' },
  ];

  topics: Topic[] = [];
  selectedCourseId: string = 'all';
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);

  calendarRange = signal<CalendarRange>({
    start: getStartDateOfWeek(new Date()),
    end: getEndDateOfWeek(new Date()),
  });

  calendarRangeText = computed(() =>
    this.calendarPageService.formatCalendarRange(this.calendarRange())
  );

  get filteredTopics(): Topic[] {
    if (this.selectedCourseId === 'all') return this.topics;
    return this.topics.filter(
      (topic: any) => topic.course && topic.course.id === this.selectedCourseId
    );
  }

  constructor(
    private calendarPageService: CalendarPageService,
    private breadcrumbService: BreadcrumbService,
    private userService: UserService
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {
        label: 'Calendar',
        url: '/calendar',
        active: true,
      },
    ]);
  }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    this.isLoading.set(true);
    this.hasError.set(false);
    
    try {
      // Load courses for the combobox based on user role
      const user = this.userService.getUser();
      if (!user) {
        throw new Error('User not found');
      }

      let courses: Course[] = [];
      if (user.role === Role.TEACHER) {
        courses = await GetTeacherCourses(user.id);
      } else {
        const publicCourses = await GetPublicCourses();
        courses = publicCourses.filter(course =>
          course.students.some(student => student.id === user.id)
        );
      }

      this.courseOptions = [
        { value: 'all', label: 'All courses' },
        ...courses.map((course) => ({
          value: course.id,
          label: course.title,
        })),
      ];

      // Load topics for the current calendar range
      await this.loadTopics();
    } catch (error) {
      console.error('Error loading calendar data:', error);
      this.hasError.set(true);
    } finally {
      this.isLoading.set(false);
    }
  }

  private async loadTopics(): Promise<void> {
    try {
      const startDate = this.calendarRange().start.toISOString();
      const endDate = this.calendarRange().end.toISOString();
      this.topics = await GetAllWorkingTopicsOfUser(startDate, endDate);
    } catch (error) {
      console.error('Error loading topics:', error);
      this.hasError.set(true);
    }
  }

  navigatePrevious(): void {
    const newDate = new Date(this.calendarRange().start);
    newDate.setDate(this.calendarRange().start.getDate() - 7);
    this.calendarRange.set({
      start: getStartDateOfWeek(newDate),
      end: getEndDateOfWeek(newDate),
    });
    this.loadTopics();
  }

  navigateNext(): void {
    const newDate = new Date(this.calendarRange().start);
    newDate.setDate(this.calendarRange().start.getDate() + 7);
    this.calendarRange.set({
      start: getStartDateOfWeek(newDate),
      end: getEndDateOfWeek(newDate),
    });
    this.loadTopics();
  }

  onSelectOption(option: ComboboxOption) {
    this.selectedCourseId = option.value;
  }

  retryLoad(): void {
    this.loadData();
  }
}
