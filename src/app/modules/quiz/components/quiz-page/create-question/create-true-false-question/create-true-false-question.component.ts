import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import {
  Question,
  QuestionStatus,
  QuestionType,
  TrueFalseQuestion,
} from '@shared/models/question';
import {
  createTrueFalseQuestionAnswerFormControls,
  createTrueFalseQuestionGeneralFormControls,
} from './create-true-false-question-form.config';
import { CreateQuestion } from '@modules/quiz/api/question.api';
import { ActivatedRoute, Router } from '@angular/router';
import { generateId } from '@shared/helper/string.helper';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

export interface ICreateFormSchema {
  title: FormControl<string>;
  category: FormControl<string>;
  level: FormControl<string>;
  visibility: FormControl<'0' | '1' | null>;
}

@Component({
  selector: 'create-true-false-question',
  standalone: false,
  templateUrl: './create-true-false-question.component.html',
  styleUrl: './create-true-false-question.component.scss',
  providers: [CollapsibleListService],
})
export class CreateTrueFalseQuestionComponent {
  question: Question | null = null;
  courseId: string = '';
  sectionIds: string[] = ['general', 'answer'];
  showPassword = false;
  form!: FormGroup;
  generalFormControls = createTrueFalseQuestionGeneralFormControls;
  answerFormControls = createTrueFalseQuestionAnswerFormControls;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private collapsibleListService: CollapsibleListService,
    private activedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private location: Location
  ) {}

  initForm(question: Question | null): void {
    const questionData = question ? (question.data as TrueFalseQuestion) : null;
    this.form = this.fb.group(
      {
        questionName: new FormControl<string>(question?.questionName ?? '', [
          Validators.required,
          Validators.minLength(2),
        ]),
        questionText: new FormControl<string>(question?.questionText ?? '', [
          Validators.required,
          Validators.minLength(2),
        ]),
        status: new FormControl<QuestionStatus>(
          question?.status ?? QuestionStatus.READY,
          [Validators.required]
        ),
        defaultMark: new FormControl<number>(question?.defaultMark ?? 1, [
          Validators.required,
          Validators.min(0),
        ]),
        correctAnswer: new FormControl<boolean>(
          questionData?.correctAnswer ?? true,
          []
        ),
        feedbackOfTrue: new FormControl<string>(
          questionData?.feedbackOfTrue ?? '',
          []
        ),
        feedbackOfFalse: new FormControl<string>(
          questionData?.feedbackOfFalse ?? '',
          []
        ),
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.courseId = this.activedRoute.snapshot.paramMap.get('courseId') ?? '';
    this.initForm(this.question);
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false); // disable edit UI in collapsible list
    this.collapsibleListService.expandAll();
  }

  async onSubmit(e: Event) {
    e.preventDefault(); // Prevent default form submission
    // Stop here if form is invalid
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all controls as touched to show validation errors

      // Find first invalid control and scroll to it
      const firstInvalidControl: HTMLElement = document.querySelector(
        'form .ng-invalid'
      ) as HTMLElement;

      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        firstInvalidControl.focus();
      }

      return;
    }

    const newQuestion: Question = {
      id: this.question?.id ?? generateId(4),
      type: QuestionType.TRUE_FALSE,
      questionName: this.form.get('questionName')?.value ?? '',
      questionText: this.form.get('questionText')?.value ?? '',
      status: this.form.get('status')?.value ?? QuestionStatus.READY,
      defaultMark: this.form.get('defaultMark')?.value ?? 0,
      data: {
        correctAnswer: this.form.get('correctAnswer')?.value ?? true,
        feedbackOfTrue: this.form.get('feedbackOfTrue')?.value ?? '',
        feedbackOfFalse: this.form.get('feedbackOfFalse')?.value ?? '',
      },
      createdBy: null,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      modifiedBy: null,
      usage: 0,
    };
    console.log('submit attempt with:', this.form.value);
    console.log('new question:', newQuestion);

    this.loading = true;
    await CreateQuestion(newQuestion, this.courseId)
      .then((question) => {
        console.log('Question created successfully:', question);
        this.toastrService.success('Question created successfully!');
        this.location.back(); // Navigate back to the previous page
      })
      .catch((error) => {
        console.error('Error creating question:', error);
        this.toastrService.error(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
