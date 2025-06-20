import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { passwordFormConfig } from '../settings-form.config';
import { scrollToFirstInvalidField } from '@shared/helper/common.helper';
import { confirmPasswordMatchValidator } from '@shared/validation/confirm-password-match.validator';

@Component({
  selector: 'tab-password',
  standalone: false,
  templateUrl: './tab-password.component.html',
  styleUrl: './tab-password.component.scss',
})
export class TabPasswordComponent {
  passwordForm!: FormGroup;
  formConfig = passwordFormConfig;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(this.formConfig.schema, {
      validators: confirmPasswordMatchValidator,
    });
  }

  changePassword(e: Event): void {
    e.preventDefault();
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      scrollToFirstInvalidField();
      return;
    }
    this.loading = true;
    
    console.log('Password change attempt with:', this.passwordForm.value);
    this.loading = false;
  }
}
