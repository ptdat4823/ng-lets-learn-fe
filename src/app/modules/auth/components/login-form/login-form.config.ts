import { Validators } from '@angular/forms';

export const loginFormConfig = {
  schema: {
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required],
        updateOn: 'submit',
      },
    ],
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
