import { Component, Input, OnInit } from '@angular/core';
import { formatDateString } from '@shared/helper/date.helper';
import { StudentResponse } from '@shared/models/student-response';
import { AssignmentTopic } from '@shared/models/topic';

@Component({
  selector: 'default-view',
  standalone: false,
  templateUrl: './default-view.component.html',
  styleUrl: './default-view.component.scss',
})
export class DefaultViewComponent implements OnInit {
  @Input({ required: true }) topic!: AssignmentTopic;
  @Input() studentResponses: StudentResponse[] = [];
  @Input() studentAssigned: number = 0;

  ngOnInit(): void {}

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }
}
