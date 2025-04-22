import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComboboxOption } from './combobox.type';

@Injectable({ providedIn: 'root' })
export class ComboboxService {
  private selectedOption = new BehaviorSubject<ComboboxOption | null>(null);
  public selectedOption$ = this.selectedOption.asObservable();

  private isOpen = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpen.asObservable();

  private disabled = new BehaviorSubject<boolean>(false);
  public disabled$ = this.disabled.asObservable();

  toggleDropdown(): void {
    if (!this.disabled.value) {
      this.isOpen.next(!this.isOpen.value);
    }
  }
  selectOption(option: ComboboxOption): void {
    this.selectedOption.next(option);
    this.isOpen.next(false);
  }
}
