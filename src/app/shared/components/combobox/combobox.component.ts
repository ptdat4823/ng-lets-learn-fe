import { Component, inject, Input, OnInit } from '@angular/core';
import { ComboboxOption } from './combobox.type';
import { ComboboxService } from './combobox.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormWarningComponent } from '../form-warning/form-warning.component';

@Component({
  selector: 'app-combobox',
  standalone: true,
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
  imports: [ReactiveFormsModule, FormWarningComponent],
})
export class ComboboxComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() validationMessages: Record<string, string> | null = null;

  @Input() options: ComboboxOption[] = [];
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;
  comboboxService = inject(ComboboxService);

  isOpen = false;
  selectedOption: ComboboxOption | null = null;

  findOptionByValue(value: string): ComboboxOption | null {
    if (!value) return null;
    return this.options.find((option) => option.value === value) || null;
  }

  ngOnInit(): void {
    const initValue = this.form.get(this.controlName)?.value;
    const initOption = this.findOptionByValue(initValue);
    this.comboboxService.selectOption(initOption);

    this.comboboxService.selectedOption$.subscribe((option) => {
      this.selectedOption = option;
    });

    this.comboboxService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  toggleDropdown(): void {
    this.comboboxService.toggleDropdown();
  }

  selectOption(option: ComboboxOption): void {
    this.comboboxService.selectOption(option);
    this.form.get(this.controlName)?.setValue(option.value);
  }
}
