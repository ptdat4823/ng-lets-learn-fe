import { Component } from '@angular/core';
import { mockCourses } from '@shared/mocks/course';

@Component({
  selector: 'courses-page',
  standalone: false,
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
})
export class CoursesPageComponent {
  courses = mockCourses;
}
