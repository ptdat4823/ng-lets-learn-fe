import { Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loginFormConfig } from './login-form.config';

@Component({
  selector: 'login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  showPassword = false;
  form!: FormGroup;
  formConfig = loginFormConfig;

  ngOnInit(): void {
    this.form = this.fb.group(this.formConfig.schema);
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
    console.log('Login attempt with:', this.form.value);

    // Navigate to dashboard or home page after successful login
    // this.router.navigate(['/dashboard']);
  }
}
