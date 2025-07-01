import { Injectable } from '@angular/core';
import { Question, QuestionChoice } from '@shared/models/question';
import { BehaviorSubject } from 'rxjs';
import { QuizAttemptingService } from '../quiz-attempting.service';

@Injectable()
export class QuizChoiceAnswerService {
  private choice: QuestionChoice | null = null;
  private question: Question | null = null;

  private showAnswer = new BehaviorSubject<boolean>(false);
  public showAnswer$ = this.showAnswer.asObservable();

  private answerRecord = new BehaviorSubject<Record<string, any>>({});
  public answerRecord$ = this.answerRecord.asObservable();

  constructor(private quizAttemptingService: QuizAttemptingService) {
    this.quizAttemptingService.showAnswer$.subscribe((show) => {
      this.showAnswer.next(show);
    });
    this.quizAttemptingService.answerRecord$.subscribe((record) => {
      this.answerRecord.next(record);
    });
  }

  setChoice(choice: QuestionChoice) {
    this.choice = choice;
  }

  setQuestion(question: Question) {
    this.question = question;
  }

  isMultipleChoice(): boolean {
    if (!this.question) return false;
    return this.quizAttemptingService.isMultipleChoice(this.question);
  }

  isChoiceCorrect(): boolean {
    if (!this.choice) return false;
    return this.choice.gradePercent > 0;
  }

  isSelectedChoice(): boolean {
    if (!this.choice) return false;
    if (!this.question) return false;
    const questionId = this.question.id;
    const choiceId = this.choice.id;
    return this.quizAttemptingService.isSelectedChoice(questionId, choiceId);
  }

  isCorrectChoice(): boolean {
    if (!this.choice) return false;
    const isSelected = this.isSelectedChoice();
    const isChoiceCorrect = this.isChoiceCorrect();
    return isSelected && isChoiceCorrect;
  }

  isIncorrectChoice(): boolean {
    if (!this.choice) return false;
    const isSelected = this.isSelectedChoice();
    const isChoiceCorrect = this.isChoiceCorrect();
    return isSelected && !isChoiceCorrect;
  }

  isMissingChoice() {
    if (!this.choice) return false;
    const isSelected = this.isSelectedChoice();
    const isChoiceCorrect = this.isChoiceCorrect();
    return !isSelected && isChoiceCorrect;
  }

  isNotSelectedChoice() {
    if (!this.choice) return false;
    const isSelected = this.isSelectedChoice();
    const isChoiceCorrect = this.isChoiceCorrect();
    return !isSelected && !isChoiceCorrect;
  }

  answerTheQuestion(questionId: string, answer: string): void {
    this.quizAttemptingService.answerTheQuestion(questionId, answer);
  }
}
