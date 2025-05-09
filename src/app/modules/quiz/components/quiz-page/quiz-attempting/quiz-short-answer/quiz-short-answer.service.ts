import { Injectable } from '@angular/core';
import { Question, QuestionChoice } from '@shared/models/question';
import { BehaviorSubject } from 'rxjs';
import { QuizAttemptingService } from '../quiz-attempting.service';

@Injectable()
export class QuizShortAnswerService {
  private correctAnswers: QuestionChoice[] = [];
  private question: Question | null = null;

  private showAnswer = new BehaviorSubject<boolean>(false);
  public showAnswer$ = this.showAnswer.asObservable();

  private isSeleted = new BehaviorSubject<boolean>(false);
  public isSelected$ = this.isSeleted.asObservable();

  constructor(private quizAttemptingService: QuizAttemptingService) {
    this.quizAttemptingService.showAnswer$.subscribe((show) => {
      this.showAnswer.next(show);
    });
  }

  setCorrectAnswers(correctAnswers: QuestionChoice[]) {
    this.correctAnswers = correctAnswers;
  }

  setQuestion(question: Question) {
    this.question = question;
  }

  isMultipleChoice(): boolean {
    if (!this.question) return false;
    return this.quizAttemptingService.isMultipleChoice(this.question);
  }

  isCorrectAnswer(userAnswer: string): boolean {
    return this.correctAnswers.some((answer) => answer.text === userAnswer);
  }

  answerTheQuestion(questionId: string, answer: string): void {
    this.quizAttemptingService.answerTheQuestion(questionId, answer);
  }

  getAnswer(questionId: string): string {
    return this.quizAttemptingService.getAnswer(questionId);
  }
}
