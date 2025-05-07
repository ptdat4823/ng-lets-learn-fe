import { Component, inject, Input, OnInit } from '@angular/core';
import { formatDateString } from '@shared/helper/date.helper';
import { mockStudentResponses } from '@shared/mocks/student-response';
import { QuizTopic } from '@shared/models/topic';
import { TabQuizService } from './tab-setting.service';
import { GradingMethod } from '@shared/models/quiz';
import { StudentResponseService } from '@shared/services/student-response.service';

@Component({
  selector: 'tab-setting',
  standalone: false,
  templateUrl: './tab-setting.component.html',
  styleUrl: './tab-setting.component.scss',
  providers: [TabQuizService, StudentResponseService],
})
export class TabSettingComponent implements OnInit {
  @Input({ required: true }) topic!: QuizTopic;

  studentResponses = mockStudentResponses;
  gradingMethod: GradingMethod = GradingMethod.HIGHEST_GRADE;
  gradeToShow = 0;
  fullMarkOfQuiz = 100;
  gradeColor = 'green';

  private tabQuizService = inject(TabQuizService);
  private studentResponseService = inject(StudentResponseService);

  ngOnInit(): void {
    this.tabQuizService.setTopic(this.topic);
    this.tabQuizService.topic$.subscribe((topic) => {
      if (!topic) return;
      this.topic = topic;
      this.fullMarkOfQuiz = this.tabQuizService.getFullMarkOfQuiz(topic);
      this.gradingMethod = topic.data.gradingMethod;

      if (this.gradingMethod === GradingMethod.FIRST_GRADE) {
        this.gradeToShow = this.tabQuizService.getFirstAttemptGrade(
          this.studentResponses
        );
      } else if (this.gradingMethod === GradingMethod.LAST_GRADE) {
        this.gradeToShow = this.tabQuizService.getLastAttemptGrade(
          this.studentResponses
        );
      } else if (this.gradingMethod === GradingMethod.AVERAGE_GRADE) {
        this.gradeToShow = this.tabQuizService.getAverageGrade(
          this.studentResponses
        );
      } else {
        this.gradeToShow = this.tabQuizService.getHighestGrade(
          this.studentResponses
        );
      }

      this.gradeColor = this.studentResponseService.getGradeColor(
        this.gradeToShow,
        this.fullMarkOfQuiz
      );
    });
  }

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }
}
