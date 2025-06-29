import { FormControlField } from '@shared/helper/form.helper';
import { QuestionStatus } from '@shared/models/question';
import { getGradePercentComboboxOption } from './create-choice-question-form.util';

export const createChoiceQuestionGeneralFormControls: FormControlField[] = [
  {
    id: 'questionName',
    label: 'Question name',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Is the sky blue?',
    validationMessages: {
      required: 'Question name is required',
      minlength: 'Question name must be at least 2 characters',
    },
  },
  {
    id: 'questionText',
    label: 'Question text',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Is the sky blue?',
    validationMessages: {
      required: 'Question text is required',
      minlength: 'Question text must be at least 2 characters',
    },
  },
  {
    id: 'status',
    label: 'Question status',
    type: 'text',
    componentType: 'select',
    placeholder: '',
    options: [
      { label: QuestionStatus.READY, value: QuestionStatus.READY },
      { label: QuestionStatus.DRAFT, value: QuestionStatus.DRAFT },
    ],
    descriptionOnOption: {
      [QuestionStatus.READY]: 'Ready to use in quizzes',
      [QuestionStatus.DRAFT]: 'Draft, not ready to use in quizzes',
    },
    validationMessages: {},
  },
  {
    id: 'defaultMark',
    label: 'Default mark',
    type: 'number',
    componentType: 'input',
    placeholder: 'E.g. 1',
    validationMessages: {
      required: 'Default mark is required',
      min: 'Default mark must be at least 0',
    },
  },
  {
    id: 'multiple',
    label: 'Is multiple choice?',
    type: 'text',
    componentType: 'select',
    placeholder: '',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    validationMessages: {},
  },
];
export const getChoiceQuestionAnswerFormControls = (
  index: number
): FormControlField[] => {
  return [
    {
      id: 'text',
      label: `Choice ${index + 1}`,
      type: 'text',
      componentType: 'input',
      placeholder: 'E.g. Blue',
      validationMessages: {
        required: 'Choice text is required',
        minlength: 'Choice text must be at least 1 character',
      },
    },
    {
      id: 'gradePercent',
      label: 'Grade percent',
      type: 'text',
      componentType: 'select',
      placeholder: '',
      options: getGradePercentComboboxOption(),
      validationMessages: {},
    },
    {
      id: 'feedback',
      label: 'Feedback',
      type: 'text',
      componentType: 'input',
      placeholder: 'E.g. Good choice',
      validationMessages: {},
    },
  ];
};

export const getChoiceQuestionAnswersFormControls = (
  numberOfChoices: number
): FormControlField[][] => {
  return Array.from({ length: numberOfChoices }, (_, index) =>
    getChoiceQuestionAnswerFormControls(index)
  );
};
