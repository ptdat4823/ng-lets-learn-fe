import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword) return null;

  const isMatching = password.value === confirmPassword.value;

  if (!isMatching) {
    confirmPassword.setErrors({ confirmPasswordMismatch: true });
    return { confirmPasswordMismatch: true };
  }
  return null;
};
