import { Injectable } from '@angular/core';
import { QuizData } from '@shared/models/quiz';
import {
  QuizResponseData,
  StudentResponse,
} from '@shared/models/student-response';
import { QuizTopic } from '@shared/models/topic';
import { QuizService } from '@shared/services/quiz.service';
import { StudentResponseService } from '@shared/services/student-response.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabQuizService {
  private topic = new BehaviorSubject<QuizTopic | null>(null);
  public topic$ = this.topic.asObservable();

  setTopic(topic: QuizTopic) {
    this.topic.next(topic);
  }

  constructor(
    private studentResponseService: StudentResponseService,
    private quizService: QuizService
  ) {}

  private getQuizResponseMark = (quizResponse: QuizResponseData) => {
    return this.studentResponseService.getQuizResponseMark(quizResponse);
  };

  private sortQuizResponsesByCompletedDate = (
    quizResponses: StudentResponse[],
    ascending = true
  ) => {
    return this.studentResponseService.sortQuizResponsesByCompletedDate(
      quizResponses,
      ascending
    );
  };

  getHighestGrade = (quizResponses: StudentResponse[]) => {
    return quizResponses.reduce((cur, quizResponse) => {
      const data = quizResponse.data as QuizResponseData;
      return Math.max(cur, this.getQuizResponseMark(data));
    }, 0);
  };

  getAverageGrade = (quizResponses: StudentResponse[]) => {
    if (quizResponses.length === 0) return 0;
    const grade =
      quizResponses.reduce((cur, quizResponse) => {
        const data = quizResponse.data as QuizResponseData;
        return cur + this.getQuizResponseMark(data);
      }, 0) / quizResponses.length;
    return grade;
  };

  getFirstAttemptGrade = (quizResponses: StudentResponse[]) => {
    const sortedByCompletedDate =
      this.sortQuizResponsesByCompletedDate(quizResponses);
    if (sortedByCompletedDate.length === 0) return 0;
    const firstAttempt = sortedByCompletedDate[0];
    const data = firstAttempt.data as QuizResponseData;
    return this.getQuizResponseMark(data);
  };

  getLastAttemptGrade = (quizResponses: StudentResponse[]) => {
    const sortedByCompletedDate = this.sortQuizResponsesByCompletedDate(
      quizResponses,
      false
    );
    if (sortedByCompletedDate.length === 0) return 0;
    const lastAttempt = sortedByCompletedDate[0];
    const data = lastAttempt.data as QuizResponseData;
    return this.getQuizResponseMark(data);
  };

  getFullMarkOfQuiz = (topic: QuizTopic) => {
    return this.quizService.getFullMarkOfQuiz(topic);
  };
}
