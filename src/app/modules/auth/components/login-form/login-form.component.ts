import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from '@modules/auth/api/auth.api';
import { ToastrService } from 'ngx-toastr';
import { loginFormConfig } from './login-form.config';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  showPassword = false;
  form!: FormGroup;
  formConfig = loginFormConfig;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(this.formConfig.schema);
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
    this.loading = true; // Set loading state to true
    const { email, password } = this.form.value;

    await Login(email, password)
      .then((res) => {
        this.toastService.success(res.message);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.toastService.error(error.message);
      })
      .finally(() => {
        this.loading = false;
      });

    console.log('Login attempt with:', this.form.value);
  }
}
