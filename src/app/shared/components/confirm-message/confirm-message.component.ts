import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageContentComponent } from './confirm-message-content/confirm-message-content.component';
import { ConfirmMessageService } from './confirm-message.service';

@Component({
  selector: 'app-confirm-message',
  standalone: false,
  templateUrl: './confirm-message.component.html',
  styleUrl: './confirm-message.component.scss',
})
export class ConfirmMessageComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(private confirmMessageService: ConfirmMessageService) {}

  ngOnInit(): void {
    this.confirmMessageService.isOpen$.subscribe((isOpen) => {
      if (isOpen) this.openDialog();
    });
  }

  openDialog(): void {
    this.dialog.open(ConfirmMessageContentComponent);
  }
}
