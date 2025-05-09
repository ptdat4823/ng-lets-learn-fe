import { Injectable } from '@angular/core';
import { QuizResult } from '@modules/quiz/constants/quiz.constant';
import { getDurationText } from '@shared/helper/date.helper';
import {
  QuizResponseData,
  StudentResponse,
} from '@shared/models/student-response';
import { QuizService } from '@shared/services/quiz.service';
import { StudentResponseService } from '@shared/services/student-response.service';

@Injectable()
export class QuizResultService {
  constructor(
    private studentResponseService: StudentResponseService,
    private quizService: QuizService
  ) {}

  getScore(studentResponse: StudentResponse): number {
    const data = studentResponse.data as QuizResponseData;
    return this.studentResponseService.getQuizResponseMark(data);
  }

  getTotalScore(studentResponse: StudentResponse): number {
    const data = studentResponse.data as QuizResponseData;
    return this.studentResponseService.getQuizResponseTotalMark(data);
  }

  getDurationString(studentResponse: StudentResponse): string {
    const data = studentResponse.data as QuizResponseData;
    const startTime = data.startedAt;
    const endTime = data.completedAt;
    return getDurationText(startTime, endTime);
  }

  getQuizResult(studentResponse: StudentResponse): QuizResult {
    const mark = this.getScore(studentResponse);
    const totalMark = this.getTotalScore(studentResponse);
    return this.quizService.getQuizResultFromMark(mark, totalMark);
  }
}
