import { Component } from '@angular/core';
import { mockCourses } from '@shared/mocks/course';

@Component({
  selector: 'course-list',
  standalone: false,
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent {
  courses = mockCourses;
}
