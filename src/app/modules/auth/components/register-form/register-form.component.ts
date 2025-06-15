import { Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { registerFormConfig } from './register-form.config';
import { confirmPasswordMatchValidator } from '@shared/validation/confirm-password-match.validator';
import { ToastrService } from 'ngx-toastr';
import { SignUp } from '@modules/auth/api/auth.api';
import { Role } from '@shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnInit {
  showPassword = false;
  form!: FormGroup;
  formConfig = registerFormConfig;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(this.formConfig.schema, {
      validators: confirmPasswordMatchValidator,
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(e: Event): Promise<void> {
    e.preventDefault(); // Prevent default form submission
    // Stop here if form is invalid
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all controls as touched to show validation errors
      return;
    }

    this.loading = true;
    const { email, password, username, isTeacher } = this.form.value;
    await SignUp(
      username,
      email,
      password,
      isTeacher ? Role.TEACHER : Role.STUDENT
    )
      .then((res) => {
        this.toastService.success(res.message);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.toastService.error(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
    console.log('Register:', this.form.value);
  }
}
