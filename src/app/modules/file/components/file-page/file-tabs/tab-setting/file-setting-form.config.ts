import { FormControl, Validators } from '@angular/forms';
import { FormControlField } from '@shared/helper/form.helper';
import { CloudinaryFile } from '@shared/models/cloudinary-file';
export const fileSettingFormSchema = {
  name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  description: new FormControl(''),
  additionalFile: new FormControl([] as CloudinaryFile[]),
};

export const fileGeneralSettingFormControls: FormControlField[] = [
  {
    id: 'name',
    label: 'File name',
    type: 'text',
    componentType: 'input',
    placeholder: 'Enter file name',
    validationMessages: {
      required: 'File name is required',
      minlength: 'File name must be at least 2 characters',
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
