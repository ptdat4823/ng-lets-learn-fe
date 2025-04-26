import { Component, inject, Input, OnInit } from '@angular/core';
import { formatDateString } from '@shared/helper/date.helper';
import { mockStudentResponses } from '@shared/mocks/student-response';
import { QuizTopic } from '@shared/models/topic';
import { TabQuizService } from './tab-quiz.service';
import { GradingMethod } from '@shared/models/quiz';
import { StudentResponseService } from '@shared/services/student-response.service';

@Component({
  selector: 'tab-quiz',
  standalone: false,
  templateUrl: './tab-quiz.component.html',
  styleUrl: './tab-quiz.component.scss',
  providers: [TabQuizService, StudentResponseService],
})
export class TabQuizComponent implements OnInit {
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

  formatDate(date: string | null) {
    return formatDateString(date, 'MM/dd/yyyy HH:mm a');
  }
}
