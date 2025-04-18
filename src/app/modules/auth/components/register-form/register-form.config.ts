import { Validators } from '@angular/forms';

export const registerFormConfig = {
  schema: {
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      },
    ],
    username: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'submit',
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'submit',
      },
    ],
    confirmPassword: [
      '',
      {
        validators: [Validators.required],
        updateOn: 'submit',
      },
    ],
    isTeacher: [false],
  },
  validationMessages: {
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
    username: {
      required: 'Username is required',
      minlength: 'Username must be at least 3 characters',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters',
    },
    confirmPassword: {
      required: 'Confirm password is required',
      confirmPasswordMismatch: 'Confirm password does not match',
    },
  },
};
