import { Component, OnInit } from '@angular/core';
import { questionIconMap } from '@modules/quiz/constants/quiz.constant';
import { mockQuestions } from '@shared/mocks/question';
import {
  Question,
  QuestionStatus,
  QuestionType,
} from '@shared/models/question';
import { User } from '@shared/models/user';
import { format } from 'date-fns';

export type QuestionElement = {
  index: number;
  type: QuestionType;
  name: string;
  defaultMark: number;
  status: QuestionStatus;
  usage: number;
  modifiedBy: User;
  modifiedAt: Date;
};

@Component({
  selector: 'question-bank-table',
  standalone: false,
  templateUrl: './question-bank-table.component.html',
  styleUrl: './question-bank-table.component.scss',
})
export class QuestionBankTableComponent implements OnInit {
  questions = mockQuestions;
  displayedColumns: string[] = [
    'index',
    'type',
    'name',
    'defaultMark',
    'status',
    'usage',
    'modifiedBy',
    'modifiedAt',
    'actions',
  ];
  dataSource: QuestionElement[] = [];

  ngOnInit(): void {
    this.dataSource = this.convertQuestionsToQuestionElements(this.questions);
  }

  convertQuestionsToQuestionElements(questions: Question[]): QuestionElement[] {
    return questions.map((question, index) => {
      return {
        index: index + 1,
        type: question.type,
        name: question.questionName,
        defaultMark: question.defaultMark,
        status: question.status,
        usage: question.usage,
        modifiedBy: question.modifiedBy,
        modifiedAt: new Date(question.modifiedAt),
      };
    });
  }

  getQuestionIconType(type: QuestionType): string {
    return questionIconMap[type];
  }

  formatDate(date: Date): string {
    const pattern = 'MM/dd/yyyy';
    return format(date, pattern);
  }
}
