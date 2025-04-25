import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'new-course',
  standalone: false,
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.scss',
})
export class NewCourseComponent {
  location = inject(Location);
  onNavigateBack() {
    this.location.back();
  }
}
