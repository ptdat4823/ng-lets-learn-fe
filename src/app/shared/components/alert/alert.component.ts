import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Output() closed = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title?: string;
      message?: string;
      confirmText?: string;
      cancelText?: string;
      showCancel?: boolean;
    },
    private dialogRef: MatDialogRef<AlertComponent>
  ) {}

  get title() {
    return this.data.title || 'Alert';
  }
  get message() {
    return this.data.message || '';
  }
  get confirmText() {
    return this.data.confirmText || 'OK';
  }
  get cancelText() {
    return this.data.cancelText || 'Cancel';
  }
  get showCancel() {
    return this.data.showCancel !== false;
  }

  onConfirm() {
    this.closed.emit(true);
    this.dialogRef.close(true);
  }

  onCancel() {
    this.closed.emit(false);
    this.dialogRef.close(false);
  }
}
