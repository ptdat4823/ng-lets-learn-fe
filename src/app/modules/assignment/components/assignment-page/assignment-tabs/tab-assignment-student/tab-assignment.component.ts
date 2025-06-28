import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StudentResponseService } from '@shared/services/student-response.service';
import { AssignmentTopic } from '@shared/models/topic';
import { formatDateString } from '@shared/helper/date.helper';
import { acceptedExplorerFileTypes } from '@modules/assignment/constants/assignment.constant';
import { StudentResponse } from '@shared/models/student-response';
import { GetAllAssignmentResponsesOfUser } from '@modules/assignment/api/assignment-response.api';
import { UserService } from '@shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private studentResponseService: StudentResponseService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUserAssignmentResponse();
  }

  async fetchUserAssignmentResponse() {
    try {
      const user = this.userService.getUser();
      if (user) {
        const responses = await GetAllAssignmentResponsesOfUser(user.id);
        // Find the response for this specific topic
        this.studentResponse = responses.find((response: StudentResponse) => 
          response.topicId === this.topic.id
        ) || null;
      }
    } catch (error) {
      this.toastr.error('Failed to fetch assignment response', 'Error');
    }
  }

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
    }
    this.fileInput.nativeElement.value = '';
  }

  onRemoveSubmission() {
    this.studentResponse = null;
  }
}
