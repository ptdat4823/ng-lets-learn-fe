import { Component, OnInit } from '@angular/core';
import { QuestionResult } from '@modules/quiz/constants/quiz.constant';
import { Question } from '@shared/models/question';
import { QuizNavigationService } from './quiz-navigation.service';
import { Location } from '@angular/common';
import {
  ConfirmMessageData,
  ConfirmMessageService,
} from '@shared/components/confirm-message/confirm-message.service';

@Component({
  selector: 'quiz-navigation',
  standalone: false,
  templateUrl: './quiz-navigation.component.html',
  styleUrl: './quiz-navigation.component.scss',
  providers: [QuizNavigationService],
})
export class QuizNavigationComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionId: string = '';
  showAnswer: boolean = false;
  answerRecord: Record<string, string> = {};
  questionResults = QuestionResult;
  questionResultMap: Record<string, QuestionResult> = {};
  answeredQuestionMap: Record<string, boolean> = {};

  confirmMessageSubmit: ConfirmMessageData = {
    title: 'Submit quiz',
    message: 'Are you sure you want to submit this quiz?',
    variant: 'info',
  };

  confirmMessageNotFulfilTheAnswer: ConfirmMessageData = {
    title: 'Missing answers',
    message:
      'You have not answered all questions. Do you want to submit anyway?',
    variant: 'warning',
  };

  constructor(
    private quizNavigationService: QuizNavigationService,
    private location: Location,
    private confirmMessageService: ConfirmMessageService
  ) {}

  ngOnInit(): void {
    this.quizNavigationService.questions$.subscribe((questions) => {
      this.questions = questions;
    });
    this.quizNavigationService.currentQuestionId$.subscribe((id) => {
      this.currentQuestionId = id;
    });
    this.quizNavigationService.showAnswer$.subscribe((show) => {
      this.showAnswer = show;
    });
    this.quizNavigationService.answerRecord$.subscribe((record) => {
      this.answerRecord = record;
      const answeredAll = this.quizNavigationService.hasAnsweredAll();
      if (answeredAll) {
        this.confirmMessageService.setData(this.confirmMessageSubmit);
      } else {
        this.confirmMessageService.setData(
          this.confirmMessageNotFulfilTheAnswer
        );
      }
      this.updateAnsweredMap();
    });

    this.updateAnsweredMap();
    this.confirmMessageService.setData(this.confirmMessageNotFulfilTheAnswer);
    this.confirmMessageService.setCancelAction(() =>
      this.onCancelConfirmMessage()
    );
    this.confirmMessageService.setConfirmAction(() =>
      this.onAcceptConfirmMessage()
    );
  }

  onCancelConfirmMessage() {
    this.confirmMessageService.closeDialog();
  }

  onAcceptConfirmMessage() {
    this.finishQuiz();
    this.confirmMessageService.closeDialog();
  }

  openConfirmMessage() {
    this.confirmMessageService.openDialog();
  }

  calculateQuestionResult() {
    this.questions.forEach((q) => {
      this.questionResultMap[q.id] = this.getQuestionResult(q.id);
    });
  }

  isQuestionAnswered(questionId: string): boolean {
    return this.quizNavigationService.isQuestionAnswered(questionId);
  }

  updateAnsweredMap() {
    this.questions.forEach((q) => {
      this.answeredQuestionMap[q.id] = this.isQuestionAnswered(q.id);
    });
    this.calculateQuestionResult();
  }

  changeQuestion(questionId: string) {
    this.quizNavigationService.changeQuestion(questionId);
  }

  finishQuiz() {
    if (this.showAnswer) return;
    this.quizNavigationService.finishQuiz();
    this.updateAnsweredMap();
  }

  finishReview() {
    this.location.back();
  }

  getQuestionResult(questionId: string) {
    return this.quizNavigationService.getQuestionResult(questionId);
  }

  isFlagged(questionId: string) {
    return this.quizNavigationService.isFlagged(questionId);
  }
}
