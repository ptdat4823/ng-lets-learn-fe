import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetCourseById } from '@modules/courses/api/courses.api';
import { GetTopic } from '@modules/courses/api/topic.api';
import { getCharacter } from '@shared/helper/string.helper';
import { Course } from '@shared/models/course';
import { Question, QuestionType } from '@shared/models/question';
import { getSecondFromTimeLimitType } from '@shared/models/quiz';
import { QuizTopic } from '@shared/models/topic';
import { debounceTime } from 'rxjs';
import { QuizAttemptingService } from './quiz-attempting.service';

@Component({
  selector: 'quiz-attempting',
  standalone: false,
  templateUrl: './quiz-attempting.component.html',
  styleUrl: './quiz-attempting.component.scss',
  providers: [QuizAttemptingService],
})
export class QuizAttemptingComponent implements OnInit {
  constructor(
    private quizAttemptingService: QuizAttemptingService,
    private activedRoute: ActivatedRoute
  ) {}
  topic: QuizTopic | null = null;
  course: Course | null = null;
  questions: Question[] = [];
  questionTypes = QuestionType;

  answerRecord: Record<string, string> = {};
  flaggedQuestions: string[] = [];

  isReviewMode = false;
  currentQuestionId = '';
  showAnswer = false;

  ngOnInit(): void {
    this.InitData();
    this.quizAttemptingService.questions$.subscribe((questions) => {
      this.questions = questions;
    });
    this.quizAttemptingService.currentQuestionId$.subscribe((id) => {
      this.currentQuestionId = id;
    });
    this.quizAttemptingService.answerRecord$
      .pipe(debounceTime(200))
      .subscribe((answers) => {
        this.answerRecord = answers;
      });
    this.quizAttemptingService.showAnswer$.subscribe((show) => {
      this.showAnswer = show;
    });
    this.quizAttemptingService.flaggedQuestions$.subscribe((flagged) => {
      this.flaggedQuestions = flagged;
    });
  }

  async InitData() {
    const topicId = this.activedRoute.snapshot.paramMap.get('topicId');
    const courseId = this.activedRoute.snapshot.paramMap.get('courseId');
    if (topicId && courseId) await this.FetchData(courseId, topicId);
  }

  async FetchData(courseId: string, topicId: string) {
    return await GetCourseById(courseId).then(async (course) => {
      this.course = course;
      return await GetTopic(topicId, courseId).then((topic) => {
        this.topic = topic as QuizTopic;
        const quiz = topic as QuizTopic;
        this.quizAttemptingService.setQuestions(this.topic.data.questions);
        this.quizAttemptingService.setCurrentQuestionId(this.questions[0].id);
        if (this.hasLimitTime(quiz)) {
          const countDown = this.getCountDown(quiz);
          this.quizAttemptingService.startQuiz(topicId, countDown);
        } else this.quizAttemptingService.startQuiz(topicId);
      });
    });
  }

  hasLimitTime(quiz: QuizTopic): boolean {
    return !!quiz.data.timeLimit;
  }

  getCountDown(quiz: QuizTopic): number {
    const timeLimit = quiz.data.timeLimit;
    if (!timeLimit) return 0;

    const timeLimitUnit = quiz.data.timeLimitUnit;
    return getSecondFromTimeLimitType(timeLimit, timeLimitUnit);
  }

  isMultipleChoice(question: Question): boolean {
    return this.quizAttemptingService.isMultipleChoice(question);
  }

  getChoices(question: Question) {
    return this.quizAttemptingService.getChoices(question);
  }

  getCharacter(index: number): string {
    return getCharacter(index);
  }

  flagQuestion(question: Question) {
    this.quizAttemptingService.flagQuestion(question.id);
  }
}
