import { Component, inject, Input, OnInit } from '@angular/core';
import { QuestionResult } from '@modules/courses/constants/quiz.constant';
import { Question, QuestionChoice } from '@shared/models/question';
import { QuizChoiceAnswerService } from './quiz-choice-answer.service';

type Variant =
  | 'default'
  | 'selected'
  | 'correct'
  | 'incorrect'
  | 'missing'
  | 'not-selected';

@Component({
  selector: 'quiz-choice-answer',
  standalone: false,
  templateUrl: './quiz-choice-answer.component.html',
  styleUrl: './quiz-choice-answer.component.scss',
  providers: [QuizChoiceAnswerService],
})
export class QuizChoiceAnswerComponent implements OnInit {
  @Input({ required: true }) question!: Question;
  @Input({ required: true }) choice!: QuestionChoice;
  @Input() answer: string = 'A';
  showAnswer: boolean = false;
  quizChoiceAnswerService = inject(QuizChoiceAnswerService);
  questionResults = QuestionResult;

  variant: Variant = 'default';

  ngOnInit(): void {
    this.quizChoiceAnswerService.setQuestion(this.question);
    this.quizChoiceAnswerService.setChoice(this.choice);
    this.quizChoiceAnswerService.showAnswer$.subscribe((show) => {
      this.showAnswer = show;
    });
  }

  getVariant(): Variant {
    if (this.showAnswer) {
      if (this.quizChoiceAnswerService.isCorrectChoice()) return 'correct';
      if (this.quizChoiceAnswerService.isIncorrectChoice()) return 'incorrect';
      if (this.quizChoiceAnswerService.isMissingChoice()) return 'missing';
      if (this.quizChoiceAnswerService.isNotSelectedChoice())
        return 'not-selected';
    }
    return this.quizChoiceAnswerService.isSelectedChoice()
      ? 'selected'
      : 'default';
  }

  handleClick() {
    if (this.showAnswer) return;
    this.quizChoiceAnswerService.answerTheQuestion(
      this.question.id,
      this.choice.id
    );
  }

  getAnswerText() {
    return this.choice.text.replace(/<[^>]+>/g, '');
  }

  isMultipleChoice(): boolean {
    return this.quizChoiceAnswerService.isMultipleChoice();
  }

  isSelectedChoice(): boolean {
    return this.quizChoiceAnswerService.isSelectedChoice();
  }
}
