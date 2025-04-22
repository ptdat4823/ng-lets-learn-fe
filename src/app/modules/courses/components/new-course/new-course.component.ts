import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'new-course',
  standalone: false,
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.scss',
})
export class NewCourseComponent {
  router = inject(Router);
  onNavigateBack() {
    this.router.navigate(['/courses']);
  }
}
