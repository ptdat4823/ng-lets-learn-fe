import { Component, Input, OnInit } from '@angular/core';
import { BarChartSegment } from '@shared/components/charts/bar-chart/bar-chart.component';
import { LineChartSegment } from '@shared/components/charts/line-chart/line-chart.component';
import { Course } from '@shared/models/course';
import { DashboardStat } from '@shared/models/dashboard-stats';

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

  avgQuizMarkSegments: LineChartSegment[] = [];
  avgAssignmentsMarkSegments: LineChartSegment[] = [];

  topQuizMarkSegments: BarChartSegment[] = [];
  topAssignmentsMarkSegments: BarChartSegment[] = [];

  monthLabels = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    return date.toLocaleString('default', { month: 'short' });
  });

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
    this.avgQuizMarkSegments = [
      {
        label: 'Quiz',
        data: [60, 80, 70, 75, 77.5, 80],
        color: '#EC4899',
      },
    ];
    this.avgAssignmentsMarkSegments = [
      {
        label: 'Assignments',
        data: [70, 65, 95, 90, 85, 95],
        color: '#A855F7',
      },
    ];
    this.topQuizMarkSegments = [
      { value: 8.2, color: '#8B5CF6', label: 'First exam' },
      { value: 8.2, color: '#8B5CF6', label: 'Introduction to Astronogy' },
      { value: 6.6, color: '#8B5CF6', label: 'Final test' },
    ];
    this.topAssignmentsMarkSegments = [
      { value: 8.2, color: '#06B6D4', label: 'First exam' },
      { value: 8.2, color: '#06B6D4', label: 'Introduction to Astronogy' },
      { value: 6.6, color: '#06B6D4', label: 'Final test' },
    ];
  }
}
