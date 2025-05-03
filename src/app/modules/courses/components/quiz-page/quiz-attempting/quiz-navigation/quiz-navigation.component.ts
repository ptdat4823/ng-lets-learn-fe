import { Component, OnInit } from '@angular/core';
import { QuestionResult } from '@modules/courses/constants/quiz.constant';
import { Question } from '@shared/models/question';
import { QuizNavigationService } from './quiz-navigation.service';
import { Location } from '@angular/common';

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

  constructor(
    private quizNavigationService: QuizNavigationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.calculateQuestionResult();
    this.updateAnsweredMap();
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
      this.updateAnsweredMap();
    });
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
  }

  changeQuestion(questionId: string) {
    this.quizNavigationService.changeQuestion(questionId);
  }

  finishQuiz() {
    if (this.showAnswer) return;
    this.quizNavigationService.finishQuiz();
    this.calculateQuestionResult();
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
