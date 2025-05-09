import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'form-warning',
  templateUrl: './form-warning.component.html',
  styleUrl: './form-warning.component.scss',
})
export class FormWarningComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() messages: Record<string, string> | null = null;
  @Input({ required: true }) controlName!: string;

  get errorMessage() {
    if (!this.messages) return '';
    const defaultMessage = 'Invalid input';
    const control = this.form.get(this.controlName);
    if (!control) return '';

    const errors = control?.errors;
    if (!errors) return '';
    for (const errorKey in errors) {
      const message = this.messages[errorKey];
      if (message) return message;
    }

    return defaultMessage;
  }

  get shouldShowError() {
    const control = this.form.get(this.controlName);
    return control?.touched && control?.invalid;
  }
}
