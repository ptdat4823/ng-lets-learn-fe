import { Component, Input, OnInit } from '@angular/core';
import { GetAllQuizResponsesOfTopic } from '@modules/quiz/api/quiz-response.api';
import { StudentResponse } from '@shared/models/student-response';
import { QuizTopic } from '@shared/models/topic';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tab-dashboard',
  standalone: false,
  templateUrl: './tab-dashboard.component.html',
  styleUrl: './tab-dashboard.component.scss',
})
export class TabDashboardComponent implements OnInit {
  @Input({ required: true }) topic!: QuizTopic;

  studentResponses: StudentResponse[] = [];

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchQuizResponses();
  }

  getQuestionCount(): number {
    return Array.isArray(this.topic.data?.questions) ? this.topic.data.questions.length : 0;
  }

  async fetchQuizResponses() {
    try {
      this.studentResponses = await GetAllQuizResponsesOfTopic(this.topic.id);
    } catch (error) {
      this.toastr.error('Failed to fetch quiz responses', 'Error');
    }
  }
}
