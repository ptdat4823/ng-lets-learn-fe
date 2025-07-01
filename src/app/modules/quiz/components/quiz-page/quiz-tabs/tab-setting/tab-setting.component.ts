import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { formatDateString } from '@shared/helper/date.helper';
import { StudentResponseService } from '@shared/services/student-response.service';
import {
  quizGeneralSettingFormControls,
  quizGradeSettingFormControls,
  quizSettingFormSchema,
  quizTimingSettingFormControls,
} from './quiz-setting-form.config';
import { TabQuizSettingService } from './tab-setting.service';
import { QuizTopic } from '@shared/models/topic';
import { UpdateTopic } from '@modules/courses/api/topic.api';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tab-setting',
  standalone: false,
  templateUrl: './tab-setting.component.html',
  styleUrl: './tab-setting.component.scss',
  providers: [
    TabQuizSettingService,
    StudentResponseService,
    CollapsibleListService,
  ],
})
export class TabSettingComponent implements OnInit {
  @Input({ required: true }) topic!: QuizTopic;
  sectionIds: string[] = ['general', 'timing', 'grade'];
  showPassword = false;
  form!: FormGroup;
  generalFormControls = quizGeneralSettingFormControls;
  timingFormControls = quizTimingSettingFormControls;
  gradeFormControls = quizGradeSettingFormControls;

  constructor(
    private fb: FormBuilder,
    private collapsibleListService: CollapsibleListService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(quizSettingFormSchema, { updateOn: 'submit' });
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false); // disable edit UI in collapsible list
    this.collapsibleListService.expandAll();
    if (this.topic) {
      this.form.patchValue(this.getFormValuesFromTopic(this.topic));
    }
  }

  private getFormValuesFromTopic(topic: QuizTopic) {
    return {
      name: topic.title || '',
      description: topic.data?.description || '',
      hasOpenTime: !!topic.data?.open,
      hasCloseTime: !!topic.data?.close,
      hasTimeLimit: !!topic.data?.timeLimit,
      open: topic.data?.open ? new Date(topic.data.open) : null,
      close: topic.data?.close ? new Date(topic.data.close) : null,
      timeLimit: topic.data?.timeLimit || 1,
      timeLimitUnit: topic.data?.timeLimitUnit || 'Hours',
      gradeToPass: topic.data?.gradeToPass || 5,
      attemptAllowed: topic.data?.attemptAllowed || 'Unlimited',
      gradingMethod: topic.data?.gradingMethod || 'Highest Grade',
    };
  }

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }

  onCheckboxChange(event: MatCheckboxChange) {
    const controlName = event.source.name;
    const isChecked = event.checked;
    if (controlName === 'hasOpenTime') {
      if (isChecked) this.form.get('open')?.enable();
      else this.form.get('open')?.disable();
    } else if (controlName === 'hasCloseTime') {
      if (isChecked) this.form.get('close')?.enable();
      else this.form.get('close')?.disable();
    } else if (controlName === 'hasTimeLimit') {
      if (isChecked) {
        this.form.get('timeLimit')?.enable();
        this.form.get('timeLimitUnit')?.enable();
      } else {
        this.form.get('timeLimit')?.disable();
        this.form.get('timeLimitUnit')?.disable();
      }
    }
  }

  getDisabled(controlName: string): boolean {
    const control = this.form.get(controlName);
    console.log(controlName, control);
    return control ? control.disabled : false;
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
    const formValue = this.form.value;
    const updatedTopic: QuizTopic = {
      ...this.topic,
      title: formValue.name,
      data: {
        ...this.topic.data,
        description: formValue.description,
        open: this.form.get('hasOpenTime')?.dirty
          ? (formValue.hasOpenTime ? formValue.open : null)
          : this.topic.data.open,
        close: this.form.get('hasCloseTime')?.dirty
          ? (formValue.hasCloseTime ? formValue.close : null)
          : this.topic.data.close,
        timeLimit: this.form.get('hasTimeLimit')?.dirty
          ? (formValue.hasTimeLimit ? formValue.timeLimit : null)
          : this.topic.data.timeLimit,
        timeLimitUnit: this.form.get('hasTimeLimit')?.dirty
          ? (formValue.hasTimeLimit ? formValue.timeLimitUnit : null)
          : this.topic.data.timeLimitUnit,
        gradeToPass: formValue.gradeToPass,
        attemptAllowed: formValue.attemptAllowed,
        gradingMethod: formValue.gradingMethod,
      },
    };
    const courseId = this.route.snapshot.paramMap.get('courseId') || this.topic.course?.id || '';
    try {
      await UpdateTopic(updatedTopic, courseId);
      this.toastr.success('Quiz settings updated successfully');
    } catch (err) {
      this.toastr.error('Failed to update quiz settings');
    }
  }
}
