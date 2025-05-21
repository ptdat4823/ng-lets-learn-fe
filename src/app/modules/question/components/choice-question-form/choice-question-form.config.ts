import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlField } from '@shared/helper/form.helper';
import { QuestionStatus } from '@shared/models/question';
import { getQuestionStatusOptions } from './choice-question-form.util';
import { generateRandomId } from '@shared/helper/string.helper';

export const createChoiceAnswerSettingGroup = (
  index: number,
  questionId: string = ''
): FormGroup => {
  return new FormGroup({
    id: new FormControl(generateRandomId()),
    text: new FormControl('Answer ' + (index + 1), [Validators.required]),
    gradePercent: new FormControl(100, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    feedback: new FormControl(''),
    questionId: new FormControl(questionId),
  });
};

export const choiceQuestionFormSchema = {
  questionName: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]),
  questionText: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]),
  questionStatus: new FormControl(QuestionStatus.READY),
  defaultMark: new FormControl(1),
  answers: new FormArray([
    createChoiceAnswerSettingGroup(0, ''),
    createChoiceAnswerSettingGroup(1, ''),
    createChoiceAnswerSettingGroup(2, ''),
    createChoiceAnswerSettingGroup(3, ''),
  ]),
};

export const choiceQuestionGeneralFormControls: FormControlField[] = [
  {
    id: 'questionName',
    label: 'Question name',
    type: 'text',
    componentType: 'input',
    placeholder: 'Enter question name',
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
    placeholder: 'Enter question text',
    validationMessages: {
      required: 'Question text is required',
      minlength: 'Question text must be at least 2 characters',
    },
  },
  {
    id: 'questionStatus',
    label: 'Question status',
    type: '',
    componentType: 'select',
    options: getQuestionStatusOptions(),
    placeholder: 'Select question status',
    validationMessages: {},
  },
  {
    id: 'defaultMark',
    label: 'Default mark',
    type: 'number',
    componentType: 'input',
    placeholder: 'Enter default mark',
    validationMessages: {},
  },
];
