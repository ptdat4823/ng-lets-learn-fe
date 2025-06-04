import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@shared/models/course';

@Component({
  selector: 'tab-dashboard',
  standalone: false,
  templateUrl: './tab-dashboard.component.html',
  styleUrl: './tab-dashboard.component.scss',
})
export class TabDashboardComponent implements OnInit {
  @Input({ required: true }) course!: Course;
  ngOnInit(): void {}
}
