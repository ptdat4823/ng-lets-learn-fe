import { Component, inject, Input, OnInit } from '@angular/core';
import { formatDateString } from '@shared/helper/date.helper';
import { GradingMethod } from '@shared/models/quiz';
import { QuizTopic } from '@shared/models/topic';
import { StudentResponseService } from '@shared/services/student-response.service';
import { TabQuizService } from './tab-quiz.service';

@Component({
  selector: 'tab-quiz',
  standalone: false,
  templateUrl: './tab-quiz.component.html',
  styleUrl: './tab-quiz.component.scss',
  providers: [TabQuizService, StudentResponseService],
})
export class TabQuizComponent implements OnInit {
  @Input({ required: true }) topic!: QuizTopic;

  gradingMethod: GradingMethod = GradingMethod.HIGHEST_GRADE;

  private tabQuizService = inject(TabQuizService);

  ngOnInit(): void {
    this.tabQuizService.setTopic(this.topic);
    this.tabQuizService.topic$.subscribe((topic) => {
      if (!topic) return;
      this.topic = topic;
    });
  }

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }
}
