import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { formatDateString, getDurationText } from '@shared/helper/date.helper';
import {
  QuizResponseData,
  StudentResponse,
} from '@shared/models/student-response';

@Component({
  selector: 'quiz-result-table',
  standalone: false,
  templateUrl: './quiz-result-table.component.html',
  styleUrl: './quiz-result-table.component.scss',
})
export class QuizResultTableComponent implements OnInit {
  @Input() studentReponses: StudentResponse[] = [];
  @Output() review = new EventEmitter<string>();
  private responsive = inject(BreakpointObserver);
  datePattern = 'dd/MM/yyyy HH:mm a';

  ngOnInit(): void {
    this.responsive
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state) => {
        this.datePattern = 'MM/dd/yyyy HH:mm a';
        if (state.matches) this.datePattern = 'MM/dd/yy HH:mm';
      });
  }

  getQuizResponseData(response: StudentResponse): QuizResponseData {
    return response.data as QuizResponseData;
  }

  formatDate(date: string | null) {
    return formatDateString(date, this.datePattern);
  }
  getDurationString(startTime: any, endTime: any, fixed: number = 6) {
    return getDurationText(startTime, endTime, fixed);
  }
  showDuration(quizResponse: QuizResponseData) {
    const startTime = quizResponse.startedAt;
    const endTime = quizResponse.completedAt;
    return this.getDurationString(startTime, endTime, 6);
  }
  onReviewClick(response: StudentResponse) {
    this.review.emit(response.id);
  }
}
