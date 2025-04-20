import { Component, Input, type OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  type FormControl,
  type FormGroup,
} from '@angular/forms';
import { FormWarningComponent } from '../form-warning/form-warning.component';

@Component({
  selector: 'form-input',
  standalone: true,
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  imports: [FormWarningComponent, ReactiveFormsModule],
})
export class FormInputComponent {
  // Form control inputs
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() validationMessages: Record<string, string> | null = null;

  // Input properties
  @Input() id = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() min: number | undefined = undefined;
  @Input() max: number | undefined = undefined;
  @Input() step: number | undefined = undefined;
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;

  // Internal state
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getInputType(): string {
    if (this.type === 'password' && this.showPassword) {
      return 'text';
    }
    return this.type;
  }

  get isInvalid(): boolean {
    const control = this.form.get(this.controlName) as FormControl;
    return control?.invalid && (control?.dirty || control?.touched);
  }
}
