import { Component, OnInit } from '@angular/core';
import { questionIconMap } from '@modules/quiz/constants/quiz.constant';
import { mockQuestions } from '@shared/mocks/question';
import {
  Question,
  QuestionStatus,
  QuestionType,
} from '@shared/models/question';
import { User } from '@shared/models/user';
import { DialogService } from '@shared/services/dialog.service';
import { format } from 'date-fns';
import { CreateQuestionDialogData } from '../create-question-dialog/create-question-dialog.component';
import { Router } from '@angular/router';

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
  courseId: string = '';
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
    private dialogService: DialogService<CreateQuestionDialogData>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId =
      this.router.routerState.snapshot.root.queryParams['courseId'];
    this.dataSource = this.convertQuestionsToQuestionElements(this.questions);
    this.dialogService.setCancelAction(() => this.onCancelCreateQuestion());
    this.dialogService.setConfirmAction(() => this.onConfirmCreateQuestion());
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

  onCreateQuestion(): void {
    this.dialogService.openDialog();
  }

  onCancelCreateQuestion(): void {
    this.dialogService.closeDialog();
  }

  onConfirmCreateQuestion(): void {
    const data = this.dialogService.getData();
    if (data) {
      let type = 'choice';
      if (data.questionType === QuestionType.SHORT_ANSWER)
        type = 'short-answer';
      else if (data.questionType === QuestionType.TRUE_FALSE)
        type = 'true-false';
      this.router.navigate([
        `courses/${this.courseId}/question/${type}/create`,
      ]);
    }
    this.dialogService.closeDialog();
  }
}
