import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@shared/models/course';
import { ChartItem } from '@shared/components/donut-chart/donut-chart.component';
import { DashboardStat } from '@shared/models/dashboard-stats';
import { getMonthName } from '@shared/helper/date.helper';
import { generateMonthOptions } from '@shared/helper/date.helper';
import { ComboboxService } from '@shared/components/combobox/combobox.service';

@Component({
  selector: 'tab-dashboard',
  standalone: false,
  templateUrl: './tab-dashboard.component.html',
  styleUrl: './tab-dashboard.component.scss',
  providers: [ComboboxService],
})
export class TabDashboardComponent implements OnInit {
  @Input({ required: true }) course!: Course;
  selectedTab: 'quiz' | 'assignments' = 'quiz';
  selectedMonth: number = new Date().getMonth(); // 0 = January, 11 = December
  selectedYear: number = new Date().getFullYear();
  selectedMonthValue: string = `${this.selectedYear}-${this.selectedMonth}`;

  monthOptions: { label: string; value: string }[] = [];

  assignmentsStats: DashboardStat[] = [];
  quizStats: DashboardStat[] = [];

  fileTypeSegments: ChartItem[] = [];
  gradedSegments: ChartItem[] = [];

  questionTypeSegments: ChartItem[] = [];
  studentMarkSegments: ChartItem[] = [];

  ngOnInit(): void {
    this.monthOptions = generateMonthOptions();
    this.selectedMonthValue = this.monthOptions[0]?.value || '';
    this.onMonthChange(this.selectedMonthValue);
  }

  updateStatsForMonth(month: number, year: number): void {
    // For now, using static data as before
    this.assignmentsStats = [
      {
        label: 'Total assignments',
        value: '7',
        increasement: '2 assignments',
        note: `Compare to last month (${getMonthName(month - 1)} ${year})`,
      },
      {
        label: 'Avg completion rate',
        value: '74 %',
        increasement: '2.5 %',
        note: `Compare to last month (${getMonthName(month - 1)} ${year})`,
      },
      { label: 'Assignments to do', value: '2 assignments' },
      { label: 'Next assignment will end on', value: 'Fri, Dec 20, 2024' },
    ];
    this.quizStats = [
      { label: 'Total quizzes', value: '7' },
      { label: 'Number of question rang', value: '10 - 40' },
      { label: 'Avg completion rate', value: '74 %' },
      { label: 'Score range', value: '1.9 - 8.8' },
    ];
    this.fileTypeSegments = [
      { value: 150, color: '#FF5252', label: 'pdf' },
      { value: 70, color: '#E040FB', label: 'docx' },
      { value: 30, color: '#448AFF', label: 'zip' },
      { value: 30, color: '#4CAF50', label: 'xlsx' },
    ];
    this.gradedSegments = [
      { value: 100, color: '#4CAF50', label: '80 - 100 points' },
      { value: 90, color: '#448AFF', label: '50 - 79 points' },
      { value: 60, color: '#FFC107', label: '20 - 49 points' },
      { value: 30, color: '#FF5252', label: '0 - 19 points' },
    ];
    this.questionTypeSegments = [
      { value: 300, color: '#EC4899', label: 'Multiple choice' },
      { value: 75, color: '#8B5CF6', label: 'True/false' },
      { value: 125, color: '#F97316', label: 'Short answer' },
    ];
    this.studentMarkSegments = [
      { value: 5, color: '#FF5252', label: '80 - 100%' },
      { value: 15, color: '#448AFF', label: '50 - 79%' },
      { value: 10, color: '#4CAF50', label: '20 - 49%' },
      { value: 5, color: '#FFC107', label: '0 - 19%' },
      { value: 5, color: '#9E9E9E', label: 'Not attempted' },
    ];
  }

  onMonthChange(value: string): void {
    const [year, month] = value.split('-').map(Number);
    this.selectedMonth = month;
    this.selectedYear = year;
    this.selectedMonthValue = value;
    this.updateStatsForMonth(month, year);
  }
}
