import { Component, Input } from '@angular/core';
import { mockAssignmentResponses } from '@shared/mocks/student-response';
import { AssignmentTopic } from '@shared/models/topic';

@Component({
  selector: 'tab-dashboard',
  standalone: false,
  templateUrl: './tab-dashboard.component.html',
  styleUrl: './tab-dashboard.component.scss',
})
export class TabDashboardComponent {
  @Input({ required: true }) topic!: AssignmentTopic;

  studentResponses = mockAssignmentResponses;
}
