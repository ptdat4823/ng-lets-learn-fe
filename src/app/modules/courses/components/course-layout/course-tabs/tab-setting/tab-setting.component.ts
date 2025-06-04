import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@shared/models/course';

@Component({
  selector: 'tab-setting',
  standalone: false,
  templateUrl: './tab-setting.component.html',
  styleUrl: './tab-setting.component.scss',
})
export class TabSettingComponent implements OnInit {
  @Input({ required: true }) course!: Course;
  ngOnInit(): void {}
}
