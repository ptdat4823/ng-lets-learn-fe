import { Component, OnInit } from '@angular/core';
import { getDurationText } from '@shared/helper/date.helper';
import { mockStudentResponses } from '@shared/mocks/student-response';
import {
  QuizResponseData,
  StudentResponse,
} from '@shared/models/student-response';
import { StudentResponseService } from '@shared/services/student-response.service';

export type ResultElement = {
  index: number;
  image: string;
  name: string;
  email: string;
  duration: string;
  grade: number;
};

@Component({
  selector: 'result-table',
  standalone: false,
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.scss',
})
export class ResultTableComponent implements OnInit {
  studentResponses = mockStudentResponses;
  displayedColumns: string[] = [
    'index',
    'image',
    'name',
    'email',
    'duration',
    'grade',
  ];
  dataSource: ResultElement[] = [];

  constructor(private studentResponseService: StudentResponseService) {}

  ngOnInit(): void {
    this.dataSource = this.convertStudentResponsesToResultElements(
      this.studentResponses
    );
  }

  convertStudentResponsesToResultElements(
    responses: StudentResponse[]
  ): ResultElement[] {
    const converted: ResultElement[] = responses.map((response, index) => {
      const student = response.student;
      const data = response.data as QuizResponseData;
      const duration = getDurationText(data.startedAt, data.completedAt);
      const score = this.studentResponseService.getQuizResponseMark(data);
      return {
        index: index + 1,
        image: student.avatar,
        name: student.username,
        email: student.email,
        duration: duration,
        grade: score,
      };
    });

    return converted;
  }
}
