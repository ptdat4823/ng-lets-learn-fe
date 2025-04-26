import { Injectable } from '@angular/core';
import { QuestionResult } from '@modules/courses/constants/quiz.constant';

@Injectable()
export class QuizService {
  constructor() {}

  getQuizResultFromMark = (
    mark: number,
    defaultMark: number
  ): QuestionResult => {
    if (mark === defaultMark) return QuestionResult.FULL_MARK;
    if (mark === 0) return QuestionResult.ZERO_MARK;
    return QuestionResult.PARTIAL_MARK;
  };
}
