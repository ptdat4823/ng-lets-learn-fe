import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService<T> {
  private data: T | null = null;

  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  private isClosed = new BehaviorSubject<boolean>(false);
  isClosed$ = this.isClosed.asObservable();

  private cancelAction = () => {};
  private confirmAction = () => {};

  constructor() {}

  getData() {
    return this.data;
  }

  setData(data: T): void {
    this.data = data;
  }

  resetVisibilityState(): void {
    this.isOpen.next(false);
    this.isClosed.next(false);
  }

  openDialog(): void {
    this.isOpen.next(true);
  }

  closeDialog(): void {
    this.isClosed.next(true);
    this.resetVisibilityState();
  }

  toggleOpenDialog(): void {
    this.isOpen.next(!this.isOpen.getValue());
  }

  setCancelAction(action: () => void): void {
    this.cancelAction = action;
  }

  setConfirmAction(action: () => void): void {
    this.confirmAction = action;
  }

  onCancel(): void {
    this.cancelAction();
  }

  onConfirm(): void {
    this.confirmAction();
  }
}
