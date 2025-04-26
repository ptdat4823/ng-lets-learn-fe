import { Injectable } from '@angular/core';
import {
  QuizResponseData,
  StudentResponse,
} from '@shared/models/student-response';

@Injectable()
export class StudentResponseService {
  constructor() {}

  getQuizResponseMark = (quizResponse: QuizResponseData) => {
    let mark = 0;
    quizResponse.answers.forEach((answer) => {
      mark += answer.mark;
    });
    return mark;
  };

  getQuizResponseTotalMark = (quizResponse: QuizResponseData) => {
    let totalMark = 0;
    quizResponse.answers.forEach((answer) => {
      totalMark += answer.question.defaultMark;
    });
    return totalMark;
  };

  sortQuizResponsesByCompletedDate = (
    quizResponses: StudentResponse[],
    ascending = true
  ) => {
    return quizResponses.sort((a, b) => {
      const aData = a.data as QuizResponseData;
      const bData = b.data as QuizResponseData;
      if (ascending)
        return (
          new Date(aData.completedAt).getTime() -
          new Date(bData.completedAt).getTime()
        );
      return (
        new Date(bData.completedAt).getTime() -
        new Date(aData.completedAt).getTime()
      );
    });
  };

  getGradeColor = (grade: number, maxGrade: number) => {
    if (grade >= maxGrade * 0.8) return 'green';
    if (grade >= maxGrade * 0.5) return 'orange';
    return 'red';
  };
}
