import { FormControl, Validators } from '@angular/forms';
import { FormControlField } from '@shared/helper/form.helper';

export const linkSettingFormSchema = {
  name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  externalUrl: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\//)]),
  description: new FormControl(''),
};

export const linkGeneralSettingFormControls: FormControlField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    componentType: 'input',
    placeholder: 'Astronomy conception',
    validationMessages: {
      required: 'Name is required',
      minlength: 'Name must be at least 2 characters',
    },
  },
  {
    id: 'externalUrl',
    label: 'External URL',
    type: 'url',
    componentType: 'input',
    placeholder: 'URL here',
    validationMessages: {
      required: 'External URL is required',
      pattern: 'Please enter a valid URL starting with http:// or https://',
    },
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    componentType: 'input',
    placeholder: 'Description for URL here',
    validationMessages: {},
  },
];

export const linkValidationMessages = {
  name: {
    required: 'Name is required',
    minlength: 'Name must be at least 2 characters',
  },
  externalUrl: {
    required: 'External URL is required',
    pattern: 'Please enter a valid URL starting with http:// or https://',
  },
  description: {},
};