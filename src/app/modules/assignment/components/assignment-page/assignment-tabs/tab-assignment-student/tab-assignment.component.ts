import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StudentResponseService } from '@shared/services/student-response.service';
import { AssignmentTopic } from '@shared/models/topic';
import { mockAssignmentResponses } from '@shared/mocks/student-response';
import { formatDateString } from '@shared/helper/date.helper';
import { acceptedExplorerFileTypes } from '@modules/assignment/constants/assignment.constant';
import { StudentResponse } from '@shared/models/student-response';

@Component({
  selector: 'tab-assignment-student',
  standalone: false,
  templateUrl: './tab-assignment.component.html',
  styleUrl: './tab-assignment.component.scss',
  providers: [StudentResponseService],
})
export class TabAssignmentStudentComponent implements OnInit {
  @Input({ required: true }) topic!: AssignmentTopic;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  acceptedFileTypes = acceptedExplorerFileTypes;
  studentResponse: StudentResponse | null = null;

  constructor(private studentResponseService: StudentResponseService) {}

  ngOnInit(): void {}

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }

  openExplorer() {
    this.fileInput.nativeElement.click();
  }

  onSelectedFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('Selected file:', input.files);
      // Handle the selected file as needed
      this.studentResponse = mockAssignmentResponses[0];
    }
    this.fileInput.nativeElement.value = '';
  }

  onRemoveSubmission() {
    this.studentResponse = null;
  }
}
