import { Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { registerFormConfig } from './register-form.config';
import { confirmPasswordMatchValidator } from '@shared/validation/confirm-password-match.validator';

@Component({
  selector: 'register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  showPassword = false;
  form!: FormGroup;
  formConfig = registerFormConfig;

  ngOnInit(): void {
    this.form = this.fb.group(this.formConfig.schema, {
      validators: confirmPasswordMatchValidator,
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(e: Event): void {
    e.preventDefault(); // Prevent default form submission
    // Stop here if form is invalid
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all controls as touched to show validation errors
      return;
    }

    // Here you would typically call your authentication service
    console.log('Register:', this.form.value);

    // Navigate to dashboard or home page after successful login
    // this.router.navigate(['/dashboard']);
  }
}
