import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { questionIconMap } from '@modules/quiz/constants/quiz.constant';
import { mockQuestions } from '@shared/mocks/question';
import {
  Question,
  QuestionStatus,
  QuestionType,
} from '@shared/models/question';
import { User } from '@shared/models/user';
import { format } from 'date-fns';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  courseId = '';
  topicId = '';
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

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.courseId = this.activedRoute.snapshot.params['courseId'];
    this.topicId = this.activedRoute.snapshot.params['topicId'];
  }

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

  openAddQuestionDialog() {
    this.dialog.open(AddQuestionDialogComponent, {
      data: {
        onCancelAction: () => {},
        onAddAction: (questionType: QuestionType) => {
          let type = '';
          if (questionType === QuestionType.TRUE_FALSE)
            type = 'true-false-question';
          else if (questionType === QuestionType.SHORT_ANSWER)
            type = 'short-answer-question';
          else if (questionType === QuestionType.CHOICE)
            type = 'choice-question';
          this.router.navigate([`courses/${this.courseId}/${type}/create`]);
        },
      },
    });
  }
}
