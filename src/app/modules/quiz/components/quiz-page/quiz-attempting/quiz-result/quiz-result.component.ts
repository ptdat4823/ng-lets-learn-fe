import { Component, inject, Input, OnInit } from '@angular/core';
import { StudentResponse } from '@shared/models/student-response';
import { QuizResultService } from './quiz-result.service';
import { QuizAttemptingService } from '../quiz-attempting.service';
import {
  QuestionResult,
  QuizResult,
} from '@modules/quiz/constants/quiz.constant';

@Component({
  selector: 'quiz-result',
  standalone: false,
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss',
  providers: [QuizResultService],
})
export class QuizResultComponent implements OnInit {
  studentResponse: StudentResponse | null = null;
  score: number = 0;
  totalScore: number = 0;
  strDuration: string = '';
  quizResult: QuizResult = QuizResult.DEFAULT;
  quizResults = QuizResult;

  constructor(
    private quizResultService: QuizResultService,
    private quizAttemptingService: QuizAttemptingService
  ) {}

  ngOnInit(): void {
    this.quizAttemptingService.studentResponse$.subscribe((response) => {
      this.studentResponse = response;
      if (response) {
        this.score = this.quizResultService.getScore(response);
        this.totalScore = this.quizResultService.getTotalScore(response);
        this.strDuration = this.quizResultService.getDurationString(response);
        this.quizResult = this.quizResultService.getQuizResult(response);
      }
    });
  }
}
