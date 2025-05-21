import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormControlField } from '@shared/helper/form.helper';
import { ComboboxService } from '../combobox/combobox.service';
import { ComboboxOption } from '../combobox/combobox.type';
import { CloudinaryFile } from '@shared/models/cloudinary-file';

@Component({
  selector: 'app-form-field',
  standalone: false,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  providers: [ComboboxService],
})
export class FormFieldComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input({ required: true }) control!: FormControlField;

  @Input() descriptionOptionKey: any = 'default';
  @Input() showLabel = true;

  @Output() onCheckChange = new EventEmitter<MatCheckboxChange>();
  onCheckboxChange(event: MatCheckboxChange): void {
    this.onCheckChange.emit(event);
    this.form.get(this.controlName)?.setValue(event.checked);
  }

  @Output() editorChange = new EventEmitter<string>();
  onEditorChange(content: string): void {
    this.editorChange.emit(content);
    this.form.get(this.controlName)?.setValue(content);
  }

  @Output() inputChange = new EventEmitter<string>();
  onInputChange(value: string): void {
    this.inputChange.emit(value);
    this.form.get(this.controlName)?.setValue(value);
  }

  @Output() comboboxChange = new EventEmitter<ComboboxOption>();
  onComboboxChange(option: ComboboxOption): void {
    this.comboboxChange.emit(option);
    this.form.get(this.controlName)?.setValue(option.value);
  }

  @Output() dateChange = new EventEmitter<Date>();
  onDateChange(date: Date): void {
    this.dateChange.emit(date);
    this.form.get(this.controlName)?.setValue(date);
  }

  @Output() fileUploaded = new EventEmitter<CloudinaryFile[]>();
  onFileUpload(file: CloudinaryFile[]): void {
    this.fileUploaded.emit(file);
    this.form.get(this.controlName)?.setValue(file);
  }
}
