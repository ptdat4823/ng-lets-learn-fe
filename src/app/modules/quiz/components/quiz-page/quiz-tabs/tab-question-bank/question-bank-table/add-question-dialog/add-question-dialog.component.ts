import { Component, inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { questionIconMap } from '@modules/quiz/constants/quiz.constant';
import { QuestionType } from '@shared/models/question';

interface DialogData {
  onCancelAction: () => void;
  onAddAction: (questionType: QuestionType) => void;
}

interface QuestionTypeElement {
  id: QuestionType;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'add-question-dialog',
  standalone: false,
  templateUrl: './add-question-dialog.component.html',
  styleUrl: './add-question-dialog.component.scss',
})
export class AddQuestionDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddQuestionDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly onCancelAction = this.data.onCancelAction;
  readonly onAddAction = this.data.onAddAction;

  dialogTitle = 'Choose a question type to add';
  questionTypes: QuestionTypeElement[] = [
    {
      id: QuestionType.TRUE_FALSE,
      name: QuestionType.TRUE_FALSE,
      icon: questionIconMap[QuestionType.TRUE_FALSE],
      description:
        "A simple form of multiple choice question with just the two choices 'True' and 'False'.",
    },
    {
      id: QuestionType.SHORT_ANSWER,
      name: QuestionType.SHORT_ANSWER,
      icon: questionIconMap[QuestionType.SHORT_ANSWER],
      description:
        'A question that requires students to write a short text response, typically a few words or a sentence.',
    },
    {
      id: QuestionType.CHOICE,
      name: QuestionType.CHOICE,
      icon: questionIconMap[QuestionType.CHOICE],
      description:
        'A multiple choice question where students select one or more answers from a predefined list of options.',
    },
  ];
  selectedType = this.questionTypes[0];

  selectType(type: QuestionTypeElement): void {
    this.selectedType = type;
  }

  closeDialog(result: any) {
    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.onCancelAction();
    this.closeDialog('');
  }

  onConfirm(): void {
    this.onAddAction(this.selectedType.id);
    this.closeDialog('');
  }
}
