import { FormControlField } from '@shared/helper/form.helper';
import { QuestionStatus } from '@shared/models/question';

export const createTrueFalseQuestionGeneralFormControls: FormControlField[] = [
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
];
export const createTrueFalseQuestionAnswerFormControls: FormControlField[] = [
  {
    id: 'correctAnswer',
    label: 'Correct answer',
    type: 'text',
    componentType: 'select',
    placeholder: '',
    options: [
      { label: 'True', value: true },
      { label: 'False', value: false },
    ],
    validationMessages: {},
  },
  {
    id: 'feedbackOfTrue',
    label: 'Feedback for True',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Correct! The sky is blue.',
    validationMessages: {},
  },
  {
    id: 'feedbackOfFalse',
    label: 'Feedback for False',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Incorrect! The sky is blue.',
    validationMessages: {},
  },
];
