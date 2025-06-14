import { Component, OnInit } from '@angular/core';
import { DonutChartSegment } from '@shared/components/charts/donut-chart/donut-chart.component';
import { DashboardStat } from '@shared/models/dashboard-stats';

@Component({
  selector: 'submission-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  studentCount = 40;
  stats: DashboardStat[] = [];
  fileTypeSegments: DonutChartSegment[] = [];
  gradedAssignmentsSegments: DonutChartSegment[] = [];

  ngOnInit(): void {
    this.stats = [
      { label: 'Submissions', value: '38' },
      { label: 'Graded submission', value: '0' },
      { label: 'Total files', value: '76' },
      { label: 'Avg mark (100)', value: '72.8' },
      { label: 'Top mark (100)', value: '95' },
      { label: 'Completion rate', value: '75%' },
    ];
    this.fileTypeSegments = [
      { value: 120, color: '#FF5252', label: 'pdf' },
      { value: 80, color: '#E040FB', label: 'docx' },
      { value: 50, color: '#448AFF', label: 'zip' },
      { value: 30, color: '#4CAF50', label: 'xlsx' },
    ];
    this.gradedAssignmentsSegments = [
      { value: 100, color: '#4CAF50', label: '80 - 100 points' },
      { value: 90, color: '#448AFF', label: '50 - 79 points' },
      { value: 60, color: '#FFC107', label: '20 - 49 points' },
      { value: 30, color: '#FF5252', label: '0 - 19 points' },
    ];
  }

  constructor() {}
}
