import { Validators } from '@angular/forms';
import { createControl, FormControlField } from '@shared/helper/form.helper';

export const newCourseFormSchema = {
  title: createControl('', [Validators.required, Validators.minLength(3)]),
  category: createControl('Academic', [
    Validators.required,
    Validators.minLength(3),
  ]),
  level: createControl('Beginner', [Validators.required]),
  visibility: createControl(null, [Validators.required]),
};

export const newCourseFormControls: FormControlField[] = [
  {
    id: 'title',
    label: 'Name',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Introduction to Astronomy',
    description: 'What will you teach in this course?',
    validationMessages: {
      required: 'Course name is required',
      minlength: 'Course name must be at least 3 characters',
    },
  },
  {
    id: 'category',
    label: 'Category',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Academic',
    description: 'What subject area best describes your course?',
    validationMessages: {
      required: 'Course category is required',
      minlength: 'Course category must be at least 3 characters',
    },
  },
  {
    id: 'level',
    label: 'Level',
    type: 'text',
    componentType: 'input',
    placeholder: 'E.g. Beginner',
    description: 'What level is your course?',
    validationMessages: {
      required: 'Course level is required',
    },
  },
  {
    id: 'visibility',
    label: 'Visibility',
    type: 'select',
    componentType: 'select',
    placeholder: 'Select visibility',
    options: [
      { value: '1', label: 'Public' },
      { value: '0', label: 'Private' },
    ],
    descriptionOnOption: {
      '1': 'Anyone can access the course',
      '0': 'Only participants can access the course',
    },
    validationMessages: {
      required: 'Course visibility is required',
    },
  },
];
