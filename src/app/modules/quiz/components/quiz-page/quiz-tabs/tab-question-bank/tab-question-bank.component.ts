import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizTopic } from '@shared/models/topic';

@Component({
  selector: 'tab-question-bank',
  standalone: false,
  templateUrl: './tab-question-bank.component.html',
  styleUrl: './tab-question-bank.component.scss',
})
export class TabQuestionBankComponent {
  @Input({ required: true }) topic!: QuizTopic;
  @Output() topicChange = new EventEmitter<QuizTopic>();

  onTopicChange(topic: QuizTopic): void {
    this.topicChange.emit(topic);
  }
}
