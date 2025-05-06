import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ButtonComponent, ButtonVariant } from '../../button/button.component';
import {
  ConfirmMessageData,
  ConfirmMessageService,
} from '../confirm-message.service';

@Component({
  selector: 'app-confirm-message-content',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ButtonComponent,
  ],
  templateUrl: './confirm-message-content.component.html',
  styleUrl: './confirm-message-content.component.scss',
})
export class ConfirmMessageContentComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmMessageContentComponent>);
  private confirmMessageService = inject(ConfirmMessageService);

  buttonVariant: ButtonVariant = 'primary';
  data: ConfirmMessageData = {
    title: 'Confirm action',
    message: 'Are you sure you want to proceed with this action?',
    variant: 'info',
  };

  constructor() {
    const data = this.confirmMessageService.getData();
    if (data) {
      this.data = data;
      this.buttonVariant = data.variant === 'info' ? 'primary' : 'warning';
    }

    this.confirmMessageService.isClosed$.subscribe((isClosed) => {
      if (isClosed) this.closeDialog('');
    });
  }

  closeDialog(result: any) {
    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.confirmMessageService.onCancel();
  }

  onConfirm(): void {
    this.confirmMessageService.onConfirm();
  }
}
