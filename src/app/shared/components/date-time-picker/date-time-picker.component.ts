import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-date-time-picker',
  standalone: false,
  templateUrl: './date-time-picker.component.html',
  styleUrl: './date-time-picker.component.scss',
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { dateInput: 'DD/MM/YYYY, hh:mm A' },
        display: {
          dateInput: 'DD/MM/YYYY, hh:mm A',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class DateTimePickerComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() validationMessages: Record<string, string> | null = null;
  @Input() placeholder = 'Choose a date and time';

  @Output() dateChange = new EventEmitter<Date>();
  value: Date = new Date();

  ngOnInit(): void {
    const initialValue: Date = this.form.get(this.controlName)?.value;
    if (initialValue) this.value = initialValue;
  }

  onDateChange(event: any): void {
    const date = event.value;
    this.dateChange.emit(date);
    this.form.get(this.controlName)?.setValue(date);
  }

  getDisabledState(): boolean {
    const control = this.form.get(this.controlName);
    return control?.disabled || false;
  }
}
