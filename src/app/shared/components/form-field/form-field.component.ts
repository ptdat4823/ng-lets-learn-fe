import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormControlField } from '@shared/helper/form.helper';
import { ComboboxService } from '../combobox/combobox.service';

@Component({
  selector: 'app-form-field',
  standalone: false,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  providers: [ComboboxService],
})
export class FormFieldComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) control!: FormControlField;
  @Input({ required: true }) controlName!: string;

  @Input() descriptionOptionKey: any = 'default';
  @Input() showLabel = true;
  @Input() labelPosition: 'left' | 'top' = 'left';

  @Output() onCheckChange = new EventEmitter<MatCheckboxChange>();

  onCheckboxChange(event: MatCheckboxChange): void {
    this.onCheckChange.emit(event);
  }
}
