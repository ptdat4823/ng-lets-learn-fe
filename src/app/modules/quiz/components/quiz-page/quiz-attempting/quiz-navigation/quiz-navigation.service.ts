import { Injectable } from '@angular/core';
import { QuestionResult } from '@modules/quiz/constants/quiz.constant';
import { Question } from '@shared/models/question';
import { BehaviorSubject } from 'rxjs';
import { QuizAttemptingService } from '../quiz-attempting.service';

@Injectable()
export class QuizNavigationService {
  private questions = new BehaviorSubject<Question[]>([]);
  public questions$ = this.questions.asObservable();

  private currentQuestionId = new BehaviorSubject<string>('');
  public currentQuestionId$ = this.currentQuestionId.asObservable();

  private answerRecord = new BehaviorSubject<Record<string, string>>({});
  public answerRecord$ = this.answerRecord.asObservable();

  private showAnswer = new BehaviorSubject<boolean>(false);
  public showAnswer$ = this.showAnswer.asObservable();

  constructor(private quizAttemptingService: QuizAttemptingService) {
    this.quizAttemptingService.questions$.subscribe((questions) => {
      this.questions.next(questions);
    });
    this.quizAttemptingService.currentQuestionId$.subscribe((id) => {
      this.currentQuestionId.next(id);
    });
    this.quizAttemptingService.showAnswer$.subscribe((show) => {
      this.showAnswer.next(show);
    });
    this.quizAttemptingService.answerRecord$.subscribe((record) => {
      this.answerRecord.next(record);
    });
  }

  isMultipleChoice(question: Question): boolean {
    return this.quizAttemptingService.isMultipleChoice(question);
  }

  findQuestion(questionId: string): Question | undefined {
    return this.quizAttemptingService.findQuestion(questionId);
  }

  changeQuestion(questionId: string) {
    this.quizAttemptingService.setCurrentQuestionId(questionId);
  }

  finishQuiz() {
    this.quizAttemptingService.finishQuiz();
  }

  isQuestionAnswered(questionId: string): boolean {
    return this.quizAttemptingService.isAnswered(questionId);
  }

  getQuestionResult(questionId: string): QuestionResult {
    return this.quizAttemptingService.getQuestionResult(questionId);
  }

  isFlagged(questionId: string): boolean {
    return this.quizAttemptingService.isFlagged(questionId);
  }

  hasAnsweredAll(): boolean {
    return this.quizAttemptingService.hasAnsweredAll();
  }
}
