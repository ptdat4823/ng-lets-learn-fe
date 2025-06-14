import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@shared/models/course';
import { DashboardStat } from '@shared/models/dashboard-stats';
import { ChartItem } from 'chart.js';

@Component({
  selector: 'tab-dashboard-student',
  standalone: false,
  templateUrl: './tab-dashboard-student.component.html',
  styleUrl: './tab-dashboard-student.component.scss',
})
export class TabDashboardStudentComponent implements OnInit {
  @Input({ required: true }) course!: Course;
  generalStats: DashboardStat[] = [];
  quizStats: DashboardStat[] = [];
  assignmentsStats: DashboardStat[] = [];

  fileTypeSegments: ChartItem[] = [];
  gradedSegments: ChartItem[] = [];
  ngOnInit(): void {
    this.generalStats = [
      { label: 'Quiz completion rate', value: '80%' },
      { label: 'Avg quiz mark', value: '7.8', rank: 'B' },
      { label: 'Assignment completion rate:', value: '67%' },
      { label: 'Avg assignment mark', value: '85', rank: 'A' },
    ];
    this.quizStats = [
      { label: 'Total quizzes', value: '4' },
      { label: 'Quizzes to do', value: '2 quizzes' },
      { label: 'Next quiz wil end on', value: 'Friday, Dec 20, 2024' },
    ];
    this.assignmentsStats = [
      { label: 'Total assignments', value: '3' },
      { label: 'Assignments to do', value: '2 assignments' },
      { label: 'Next assignment will end on', value: 'Monday, Dec 23, 2024' },
    ];
  }
}
