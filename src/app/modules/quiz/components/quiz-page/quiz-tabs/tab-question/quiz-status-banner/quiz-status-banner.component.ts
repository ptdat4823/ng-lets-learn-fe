import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { QuizTopic } from '@shared/models/topic';
import { format } from 'date-fns';

type variant = 'success' | 'warning' | 'error' | 'info';
type QuizStatus = 'will-open' | 'closed' | 'in-progress';

@Component({
  selector: 'quiz-status-banner',
  standalone: false,
  templateUrl: './quiz-status-banner.component.html',
  styleUrl: './quiz-status-banner.component.scss',
})
export class QuizStatusBannerComponent implements OnInit, OnChanges {
  @Input({ required: true }) topic!: QuizTopic;
  @Input() variant: variant = 'info';
  quizStatus: QuizStatus = 'will-open';
  quizStatusText: string = '';

  ngOnInit(): void {
    this.updateQuizStatus(this.topic);
  }

  ngOnChanges(changes: SimpleChanges) {
    const topicChange = changes['topic'];
    this.updateQuizStatus(topicChange.currentValue);
  }

  updateQuizStatus(topic: QuizTopic) {
    const now = new Date();
    const openDate = topic.data.open ? new Date(topic.data.open) : null;
    const closeDate = topic.data.close ? new Date(topic.data.close) : null;

    if (openDate && now < openDate) {
      this.quizStatus = 'will-open';

      const openDateStr = this.formatDate(openDate);
      this.quizStatusText = `This quiz will open on ${openDateStr}`;
    } else if (closeDate && now > closeDate) {
      this.quizStatus = 'closed';
      const closeDateStr = this.formatDate(closeDate);
      this.quizStatusText = `This quiz is closed on ${closeDateStr}`;
    } else {
      this.quizStatus = 'in-progress';
      this.quizStatusText = 'This quiz is opening now';
    }

    this.updateVariant(this.quizStatus);
  }

  updateVariant(status: QuizStatus) {
    if (status === 'will-open') this.variant = 'info';
    else if (status === 'closed') this.variant = 'error';
    else if (status === 'in-progress') this.variant = 'success';
  }

  formatDate(date: Date): string {
    const dateString = format(date, 'EEEE, MMMM dd, yyyy');
    const timeString = format(date, 'hh:mm a');
    return `${dateString} at ${timeString}`;
  }
}
