import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { passwordFormSchema, passwordFormControls } from '../settings-form.config';
import { FormControlField } from '@shared/helper/form.helper';

@Component({
  selector: 'tab-password',
  standalone: false,
  templateUrl: './tab-password.component.html',
  styleUrl: './tab-password.component.scss'
})
export class TabPasswordComponent {
  passwordForm: FormGroup;
  passwordFormControls: FormControlField[] = passwordFormControls;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(passwordFormSchema);
  }

  changePassword(e: Event): void {
    e.preventDefault(); 
    
    if (this.passwordForm.valid) {
      console.log('Password change attempt with:', this.passwordForm.value);
      return;
    }

    this.passwordForm.markAllAsTouched();
    this.scrollToFirstInvalidField();
  }

  private scrollToFirstInvalidField(): void {
    const firstInvalidControl = document.querySelector('form .ng-invalid') as HTMLElement;
    
    if (!firstInvalidControl) return;
    
    firstInvalidControl.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    firstInvalidControl.focus();
  }
}
