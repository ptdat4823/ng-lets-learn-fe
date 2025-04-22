import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComboboxOption } from './combobox.type';

@Injectable()
export class ComboboxService {
  private selectedOption = new BehaviorSubject<ComboboxOption | null>(null);
  public selectedOption$ = this.selectedOption.asObservable();

  private isOpen = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpen.asObservable();

  toggleDropdown(): void {
    this.isOpen.next(!this.isOpen.value);
  }
  selectOption(option: ComboboxOption | null): void {
    this.selectedOption.next(option);
    this.isOpen.next(false);
  }
}
