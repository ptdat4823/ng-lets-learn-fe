import { Validators } from '@angular/forms';

export const loginFormConfig = {
  schema: {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  },
  validationMessages: {
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
    },
  },
};
