import { Component, Input, OnInit } from '@angular/core';
import { mockAssignmentResponses } from '@shared/mocks/student-response';
import {
  AssignmentResponseData,
  StudentResponse,
} from '@shared/models/student-response';
import { AssignmentTopic } from '@shared/models/topic';

@Component({
  selector: 'tab-submission',
  standalone: false,
  templateUrl: './tab-submission.component.html',
  styleUrl: './tab-submission.component.scss',
})
export class TabSubmissionComponent implements OnInit {
  @Input({ required: true }) topic!: AssignmentTopic;
  studentResponses: StudentResponse[] = mockAssignmentResponses;
  filteredStudentResponses: StudentResponse[] = [];

  selectedStudentResponse: StudentResponse | null = null;

  ngOnInit(): void {
    this.filteredStudentResponses = this.studentResponses;
  }

  filteredStudents(searchTerm: string) {
    return this.studentResponses.filter((res) =>
      res.student.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onSearchChange(searchTerm: string) {
    this.filteredStudentResponses = this.filteredStudents(searchTerm);
  }

  getStudents(responses: StudentResponse[]) {
    return responses.map((response) => response.student);
  }

  getMarkOfResponse(response: StudentResponse) {
    const data = response.data as AssignmentResponseData;
    return data.mark;
  }

  onResponseClick(response: StudentResponse) {
    console.log('Response clicked:', response);
    this.selectedStudentResponse = response;
  }

  onCloseSubmittedView() {
    this.selectedStudentResponse = null;
  }
}
