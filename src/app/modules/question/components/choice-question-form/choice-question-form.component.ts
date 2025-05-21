import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { QuestionChoice } from '@shared/models/question';
import { Editor } from 'tinymce';
import {
  choiceQuestionFormSchema,
  choiceQuestionGeneralFormControls,
  createChoiceAnswerSettingGroup,
} from './choice-question-form.config';

@Component({
  selector: 'choice-question-form',
  standalone: false,
  templateUrl: './choice-question-form.component.html',
  styleUrl: './choice-question-form.component.scss',
})
export class ChoiceQuestionFormComponent {
  sectionIds: string[] = ['general', 'answer'];
  form!: FormGroup;
  generalFormControls = choiceQuestionGeneralFormControls;

  constructor(
    private fb: FormBuilder,
    private collapsibleListService: CollapsibleListService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(choiceQuestionFormSchema, {
      updateOn: 'submit',
    });
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false); // disable edit UI in collapsible list
    this.collapsibleListService.setExpandedSectionIds(['general']);
  }

  get answersFormArray(): FormArray<FormGroup> {
    return this.form.get('answers') as FormArray;
  }

  addAnswer() {
    const answerLength = this.answersFormArray.length;
    this.answersFormArray.push(createChoiceAnswerSettingGroup(answerLength));
  }

  removeAnswer(index: number) {
    this.answersFormArray.removeAt(index);
  }

  onSubmit(e: Event): void {
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

    // Here you would typically call your authentication service
    console.log('submit attempt with:', this.form.value);

    // Navigate to dashboard or home page after successful login
    // this.router.navigate(['/dashboard']);
  }

  onEditorInit(editor: Editor): void {
    console.log('Editor initialized', editor);
  }

  onContentChange(content: string): void {
    console.log('Content changed', content);
  }
}
