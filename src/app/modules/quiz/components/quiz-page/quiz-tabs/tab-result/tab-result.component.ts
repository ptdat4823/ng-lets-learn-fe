import { Component, Input } from '@angular/core';
import { QuizTopic } from '@shared/models/topic';

@Component({
  selector: 'tab-result',
  standalone: false,
  templateUrl: './tab-result.component.html',
  styleUrl: './tab-result.component.scss',
})
export class TabResultComponent {
  @Input({ required: true }) topic!: QuizTopic;
}
