import { Component } from '@angular/core';
import { mockCourses } from '@shared/mocks/course';
import { Role, User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'course-list',
  standalone: false,
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent {
  courses = mockCourses;
  isStudent = true;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.isStudent = user.role === Role.STUDENT;
      } else {
        this.isStudent = true;
      }
    });
  }
}
