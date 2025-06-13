import { FormControl, Validators } from '@angular/forms';
import { FormControlField } from '@shared/helper/form.helper';
import { CloudinaryFile } from '@shared/models/cloudinary-file';
export const linkSettingFormSchema = {
  name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  description: new FormControl(''),
  additionalFile: new FormControl([] as CloudinaryFile[]),
};

export const linkGeneralSettingFormControls: FormControlField[] = [
  {
    id: 'name',
    label: 'Link name',
    type: 'text',
    componentType: 'input',
    placeholder: 'Enter link name',
    validationMessages: {
      required: 'Link name is required',
      minlength: 'Link name must be at least 2 characters',
    },
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    componentType: 'input',
    placeholder: 'Description for file here',
    validationMessages: {},
  },
  {
    id: 'additionalFile',
    label: 'File upload',
    type: '',
    componentType: 'file-upload',
    placeholder: '',
    validationMessages: {},
  },
];