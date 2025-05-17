import { Component, Input, OnInit } from '@angular/core';
import { StudentResponseService } from '@shared/services/student-response.service';
import { AssignmentTopic } from '@shared/models/topic';
import { mockAssignmentResponses } from '@shared/mocks/student-response';
import { formatDateString } from '@shared/helper/date.helper';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { AssignmentTab } from '@modules/assignment/constants/assignment.constant';

@Component({
  selector: 'tab-assignment',
  standalone: false,
  templateUrl: './tab-assignment.component.html',
  styleUrl: './tab-assignment.component.scss',
  providers: [StudentResponseService],
})
export class TabAssignmentComponent implements OnInit {
  @Input({ required: true }) topic!: AssignmentTopic;

  studentResponses = mockAssignmentResponses;

  constructor(
    private studentResponseService: StudentResponseService,
    private tabService: TabService<string>
  ) {}

  ngOnInit(): void {}

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }

  onGradeBtnClick() {
    this.tabService.selectTab(AssignmentTab.SUBMISSIONS);
  }
}
