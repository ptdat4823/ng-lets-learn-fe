import { Component, Input } from '@angular/core';
import { QuizTopic } from '@shared/models/topic';

@Component({
  selector: 'tab-dashboard',
  standalone:false,
  templateUrl: './tab-dashboard.component.html',
  styleUrl: './tab-dashboard.component.scss'
})
export class TabDashboardComponent {
  @Input({ required: true }) topic!: QuizTopic;

}
