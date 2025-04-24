import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { COURSE_TABS } from '@modules/courses/constants/courses.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockCourses } from '@shared/mocks/course';
import { Course } from '@shared/models/course';

@Component({
  selector: 'app-course-layout',
  standalone: false,
  templateUrl: './course-layout.component.html',
  styleUrl: './course-layout.component.scss',
  providers: [TabService],
})
export class CourseLayoutComponent implements OnInit {
  route = inject(ActivatedRoute);
  tabs = COURSE_TABS;
  course: Course | null = null;

  ngOnInit(): void {
    this.fetchCourseData();
  }

  get courseId(): string {
    return this.route.snapshot.paramMap.get('courseId') || '';
  }

  fetchCourseData() {
    const res = mockCourses.find((course) => course.id === this.courseId);
    if (res) this.course = res;
  }
}
