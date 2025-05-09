import { Component, Input, OnInit } from '@angular/core';
import { StudentResponseService } from '@shared/services/student-response.service';
import { TabAssignmentService } from './tab-assignment.service';
import { AssignmentTopic } from '@shared/models/topic';
import { mockAssignmentResponses } from '@shared/mocks/student-response';
import { formatDateString } from '@shared/helper/date.helper';

@Component({
  selector: 'tab-assignment',
  standalone: false,
  templateUrl: './tab-assignment.component.html',
  styleUrl: './tab-assignment.component.scss',
  providers: [TabAssignmentService, StudentResponseService],
})
export class TabAssignmentComponent implements OnInit {
  @Input({ required: true }) topic!: AssignmentTopic;

  studentResponses = mockAssignmentResponses;

  constructor(
    private tabAssignmentService: TabAssignmentService,
    private studentResponseService: StudentResponseService
  ) {}

  ngOnInit(): void {
    this.tabAssignmentService.setTopic(this.topic);
    this.tabAssignmentService.topic$.subscribe((topic) => {
      if (!topic) return;
      this.topic = topic;
    });
  }

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }
}
