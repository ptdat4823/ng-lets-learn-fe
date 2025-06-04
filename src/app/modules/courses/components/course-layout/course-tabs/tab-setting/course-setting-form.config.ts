import { FormControl, Validators } from '@angular/forms';
import { FormControlField } from '@shared/helper/form.helper';

export const courseSettingFormSchema = {
  name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  description: new FormControl(''),
  content: new FormControl(''),
};

export const courseGeneralSettingFormControls: FormControlField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Introduct To Astronomy',
    validationMessages: {
      required: 'Page name is required',
      minlength: 'Page name must be at least 2 characters',
    },
  },
  {
    id: 'category',
    label: 'Category',
    type: 'text',
    componentType: 'input',
    placeholder: 'Astronomy',
    validationMessages: {
      required: 'Page name is required',
      minlength: 'Page name must be at least 2 characters',
    },
  },
];
export const pageDangerZoneSettingFormControls: FormControlField[] = [];
