import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { questionIconMap } from '@modules/quiz/constants/quiz.constant';
import { Question } from '@shared/models/question';

@Component({
  selector: 'question-item',
  standalone: false,
  templateUrl: './question-item.component.html',
  styleUrl: './question-item.component.scss',
})
export class QuestionItemComponent implements OnInit, OnChanges {
  @Input({ required: true }) question!: Question;
  @Input({ required: true }) index!: number;
  iconKey: string = '';

  ngOnInit() {
    if (this.question) this.updateIconKey(this.question);
  }

  ngOnChanges(changes: SimpleChanges) {
    const questionChange = changes['question'];
    if (questionChange) this.updateIconKey(questionChange.currentValue);
  }

  updateIconKey(question: Question) {
    this.iconKey = questionIconMap[question.type];
  }
}
