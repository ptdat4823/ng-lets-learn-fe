import { FormControl, Validators } from '@angular/forms';
import { FormControlField } from '@shared/helper/form.helper';
import { FileSizeOption } from '@shared/models/assignment';
import { getFileSizeOptions } from './assignment-setting-form.util';
import { CloudinaryFile } from '@shared/models/cloudinary-file';

export const assignmentSettingFormSchema = {
  name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  description: new FormControl(''),
  additionalFile: new FormControl([] as CloudinaryFile[]),
  hasOpenTime: new FormControl(false),
  hasCloseTime: new FormControl(false),
  hasMaximumFileUpload: new FormControl(false),
  hasMaximumFileSize: new FormControl(false),
  open: new FormControl({ value: new Date(), disabled: true }),
  close: new FormControl({ value: new Date(), disabled: true }),
  maximumFile: new FormControl({ value: 1, disabled: true }),
  maximumFileSize: new FormControl({
    value: FileSizeOption['1MB'],
    disabled: true,
  }),
};

export const assignmentGeneralSettingFormControls: FormControlField[] = [
  {
    id: 'name',
    label: 'Assignment name',
    type: 'text',
    componentType: 'input',
    placeholder: 'Enter assignment name',
    validationMessages: {
      required: 'Assignment name is required',
      minlength: 'Assignment name must be at least 2 characters',
    },
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. This is an assignment',
    validationMessages: {},
  },
  {
    id: 'additionalFile',
    label: 'Additional file(s)',
    type: '',
    componentType: 'file-upload',
    placeholder: '',
    validationMessages: {},
  },
];
export const assignmentAvailabilitySettingFormControls: FormControlField[][] = [
  [
    {
      id: 'hasOpenTime',
      label: 'Open from',
      type: '',
      componentType: 'checkbox',
      placeholder: '',
      validationMessages: {},
    },
    {
      id: 'open',
      label: '',
      type: 'date',
      componentType: 'datetime',
      placeholder: '',
      validationMessages: {},
    },
  ],
  [
    {
      id: 'hasCloseTime',
      label: 'Close assignment',
      type: '',
      componentType: 'checkbox',
      placeholder: '',
      validationMessages: {},
    },
    {
      id: 'close',
      label: '',
      type: 'date',
      componentType: 'datetime',
      placeholder: '',
      validationMessages: {},
    },
  ],
];
export const assignmentSubmissionSettingFormControls: FormControlField[][] = [
  [
    {
      id: 'hasMaximumFileUpload',
      label: 'Maximum file upload',
      type: '',
      componentType: 'checkbox',
      placeholder: '',
      validationMessages: {},
    },
    {
      id: 'maximumFile',
      label: '',
      type: 'number',
      componentType: 'input',
      placeholder: '',
      validationMessages: {},
    },
  ],
  [
    {
      id: 'hasMaximumFileSize',
      label: 'Maximum file size',
      type: '',
      componentType: 'checkbox',
      placeholder: '',
      validationMessages: {},
    },
    {
      id: 'maximumFileSize',
      label: '',
      type: '',
      componentType: 'select',
      options: getFileSizeOptions(),
      placeholder: '',
      validationMessages: {},
    },
  ],
];
