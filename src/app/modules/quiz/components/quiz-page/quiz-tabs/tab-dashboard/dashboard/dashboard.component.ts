import { Component, OnInit } from '@angular/core';
import { ChartItem } from '@shared/components/donut-chart/donut-chart.component';

@Component({
  selector: 'overview-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  studentCount = 40;
  stats: any[] = [];
  fileTypeSegments: ChartItem[] = [];
  gradedAssignmentsSegments: ChartItem[] = [];

  ngOnInit(): void {
    this.stats = [
      { label: 'Questions', value: '40' },
      { label: 'Attempted', value: '67' },
      { label: 'Avg mark (40)', value: '27.6' },
      { label: 'Top mark', value: '39' },
      { label: 'Avg time spend', value: '24m 2s' },
      { label: 'Completion rate', value: '75%' },
    ];
    this.fileTypeSegments = [
      { value: 26, color: '#E040FB', label: 'Multiple choice' },
      { value: 7, color: '#FF5252', label: 'True false' },
      { value: 7, color: '#448AFF', label: 'Short answer' },
    ];
    this.gradedAssignmentsSegments = [
      { value: 5, color: '#4CAF50', label: '80 - 100%' },
      { value: 15, color: '#448AFF', label: '50 - 79%' },
      { value: 10, color: '#FFC107', label: '20 - 49%' },
      { value: 5, color: '#FF5252', label: '0 - 19%' },
      { value: 5, color: '#9E9E9E', label: 'Not attempted' },
    ];
  }

  constructor() {}
}
