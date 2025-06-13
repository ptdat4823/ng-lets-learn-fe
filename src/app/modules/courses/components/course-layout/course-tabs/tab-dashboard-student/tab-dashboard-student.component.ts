import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@shared/models/course';

@Component({
  selector: 'tab-dashboard-student',
  standalone: false,
  templateUrl: './tab-dashboard-student.component.html',
  styleUrl: './tab-dashboard-student.component.scss',
})
export class TabDashboardStudentComponent implements OnInit {
  @Input({ required: true }) course!: Course;
  ngOnInit(): void {}
}