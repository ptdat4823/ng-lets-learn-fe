import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@shared/models/course';
import { User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'student-course-card',
  standalone: false,
  templateUrl: './student-course-card.component.html',
  styleUrl: './student-course-card.component.scss',
})
export class StudentCourseCardComponent {
  @Input({ required: true }) course!: Course;
  @Output() joinCourse = new EventEmitter<string>();
  currentUser: User | null = null;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  get hasJoined(): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.courses.some((c) => c.id === this.course.id);
  }

  handleClick() {}

  onJoinCourse() {}
}
