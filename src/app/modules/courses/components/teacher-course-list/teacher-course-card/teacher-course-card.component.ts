import { Component, Input } from '@angular/core';
import { Course } from '@shared/models/course';

@Component({
  selector: 'teacher-course-card',
  standalone: false,
  templateUrl: './teacher-course-card.component.html',
  styleUrl: './teacher-course-card.component.scss',
})
export class TeacherCourseCardComponent {
  @Input({ required: true }) course!: Course;

  handleClick(): void {
    // handle your click logic here
  }
}
