import { FormControlField } from '@shared/helper/form.helper';
import { getGradePercentComboboxOptions } from './choice-answer-setting.util';

export const getChoiceAnswerSettingControls = (
  index: number
): FormControlField[] => {
  return [
    {
      id: 'answer',
      label: 'Answer ' + index,
      type: '',
      componentType: 'editor',
      placeholder: 'Enter answer',
      validationMessages: {
        required: 'Answer is required',
        minlength: 'Answer must be at least 1 character',
      },
    },
    {
      id: 'gradePercent',
      label: 'Grade percent',
      type: 'number',
      componentType: 'select',
      options: getGradePercentComboboxOptions(),
      placeholder: 'Enter grade percent',
      validationMessages: {
        required: 'Grade percent is required',
        min: 'Grade percent must be at least 0',
        max: 'Grade percent must be at most 100',
      },
    },
    {
      id: 'feedback',
      label: 'Feedback',
      type: '',
      componentType: 'editor',
      placeholder: 'Enter feedback',
      validationMessages: {},
    },
  ];
};
