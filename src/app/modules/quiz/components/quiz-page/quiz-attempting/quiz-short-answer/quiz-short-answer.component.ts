import { Component, inject, Input, OnInit } from '@angular/core';
import { QuestionResult } from '@modules/quiz/constants/quiz.constant';
import { Question, ShortAnswerQuestion } from '@shared/models/question';
import { QuizShortAnswerService } from './quiz-short-answer.service';

type Variant =
  | 'default'
  | 'selected'
  | 'correct'
  | 'incorrect'
  | 'missing'
  | 'not-selected';

@Component({
  selector: 'quiz-short-answer',
  standalone: false,
  templateUrl: './quiz-short-answer.component.html',
  styleUrl: './quiz-short-answer.component.scss',
  providers: [QuizShortAnswerService],
})
export class QuizShortAnswerComponent implements OnInit {
  @Input({ required: true }) question!: Question;
  answer: string = '';
  showAnswer: boolean = false;
  quizShortAnswerService = inject(QuizShortAnswerService);
  questionResults = QuestionResult;

  variant: Variant = 'default';

  ngOnInit(): void {
    const data = this.question.data as ShortAnswerQuestion;
    this.quizShortAnswerService.setCorrectAnswers(data.choices);
    this.quizShortAnswerService.setQuestion(this.question);
    this.answer = this.quizShortAnswerService.getAnswer(this.question.id);
    this.quizShortAnswerService.showAnswer$.subscribe((show) => {
      this.showAnswer = show;
      if (show) this.variant = this.getVariant();
    });
  }

  onAnswerChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.answer = target.value;
    this.quizShortAnswerService.answerTheQuestion(
      this.question.id,
      target.value
    );
  }

  getVariant(): Variant {
    if (this.showAnswer) {
      if (!this.answer) return 'missing';
      const isCorrect = this.quizShortAnswerService.isCorrectAnswer(
        this.answer
      );
      return isCorrect ? 'correct' : 'incorrect';
    }
    return 'default';
  }
}
