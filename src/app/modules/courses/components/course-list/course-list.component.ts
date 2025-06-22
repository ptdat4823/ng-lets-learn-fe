import { Component, OnInit } from '@angular/core';
import {
  GetPublicCourses,
  GetTeacherCourses,
} from '@modules/courses/api/courses.api';
import { mockCourses } from '@shared/mocks/course';
import { Course } from '@shared/models/course';
import { Role, User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'course-list',
  standalone: false,
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
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

  ngOnInit(): void {
    this.updateCourses();
  }

  async updateCourses() {
    const user = this.userService.getUser();
    if (!user) return;
    let res: Course[] = [];
    if (user.role === Role.TEACHER) res = await GetTeacherCourses(user.id);
    else res = await GetPublicCourses();
    this.courses = res;
  }
}
