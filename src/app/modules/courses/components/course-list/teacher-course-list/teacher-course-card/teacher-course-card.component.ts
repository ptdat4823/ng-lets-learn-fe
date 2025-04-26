import { Component, inject, Input } from '@angular/core';
import { Course } from '@shared/models/course';
import { Router } from '@angular/router';

@Component({
  selector: 'teacher-course-card',
  standalone: false,
  templateUrl: './teacher-course-card.component.html',
  styleUrl: './teacher-course-card.component.scss',
})
export class TeacherCourseCardComponent {
  @Input({ required: true }) course!: Course;
  router = inject(Router);

  handleClick(): void {
    this.router.navigate(['/courses', this.course.id]);
  }
}
