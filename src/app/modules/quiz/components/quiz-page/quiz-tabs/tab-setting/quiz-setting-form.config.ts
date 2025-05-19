import { FormControl, Validators } from '@angular/forms';
import { FormControlField } from '@shared/helper/form.helper';
import {
  attemptsAllowedOptions,
  GradingMethod,
  TimeLimitType,
} from '@shared/models/quiz';
import {
  arrayStringToComboboxOption,
  getGradingMethodOptions,
  getTimeLimitUnitOptions,
} from './quiz-setting-form.util';

export const quizSettingFormSchema = {
  name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  description: new FormControl(''),
  hasOpenTime: new FormControl(false),
  hasCloseTime: new FormControl(false),
  hasTimeLimit: new FormControl(false),
  open: new FormControl({ value: new Date(), disabled: true }),
  close: new FormControl({ value: new Date(), disabled: true }),
  timeLimit: new FormControl({ value: 1, disabled: true }, [Validators.min(1)]),
  timeLimitUnit: new FormControl({
    value: TimeLimitType.HOURS,
    disabled: true,
  }),
  gradeToPass: new FormControl(5),
  attemptAllowed: new FormControl(attemptsAllowedOptions[3]),
  gradingMethod: new FormControl(GradingMethod.HIGHEST_GRADE),
};

export const quizGeneralSettingFormControls: FormControlField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Math Quiz',
    validationMessages: {
      required: 'Quiz name is required',
      minlength: 'Quiz name must be at least 2 characters',
    },
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. This is a math quiz',
    validationMessages: {},
  },
];
export const quizTimingSettingFormControls: FormControlField[][] = [
  [
    {
      id: 'hasOpenTime',
      label: 'Open the quiz',
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
      label: 'Close the quiz',
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
  [
    {
      id: 'hasTimeLimit',
      label: 'Time limit',
      type: '',
      componentType: 'checkbox',
      placeholder: '',
      validationMessages: {},
    },
    {
      id: 'timeLimit',
      label: '',
      type: 'number',
      componentType: 'input',
      placeholder: '',
      validationMessages: {},
    },
    {
      id: 'timeLimitUnit',
      label: '',
      type: '',
      componentType: 'select',
      options: getTimeLimitUnitOptions(),
      placeholder: '',
      validationMessages: {},
    },
  ],
];
export const quizGradeSettingFormControls: FormControlField[] = [
  {
    id: 'attemptAllowed',
    label: 'Attempts allowed',
    type: '',
    componentType: 'select',
    options: arrayStringToComboboxOption(attemptsAllowedOptions),
    placeholder: '',
    validationMessages: {},
  },
  {
    id: 'gradingMethod',
    label: 'Grading method',
    type: '',
    componentType: 'select',
    options: getGradingMethodOptions(),
    placeholder: '',
    validationMessages: {},
  },
];
