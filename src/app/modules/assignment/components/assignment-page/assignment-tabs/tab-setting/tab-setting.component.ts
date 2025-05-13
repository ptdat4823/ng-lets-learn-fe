import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { formatDateString } from '@shared/helper/date.helper';
import { AssignmentTopic } from '@shared/models/topic';
import {
  assignmentAvailabilitySettingFormControls,
  assignmentGeneralSettingFormControls,
  assignmentSettingFormSchema,
  assignmentSubmissionSettingFormControls,
} from './assignment-setting-form.config';

@Component({
  selector: 'tab-setting',
  standalone: false,
  templateUrl: './tab-setting.component.html',
  styleUrl: './tab-setting.component.scss',
  providers: [CollapsibleListService],
})
export class TabSettingComponent {
  @Input({ required: true }) topic!: AssignmentTopic;
  sectionIds: string[] = ['general', 'availability', 'submission'];
  showPassword = false;
  form!: FormGroup;
  generalFormControls = assignmentGeneralSettingFormControls;
  availabilityFormControls = assignmentAvailabilitySettingFormControls;
  submissionFormControls = assignmentSubmissionSettingFormControls;

  constructor(
    private fb: FormBuilder,
    private collapsibleListService: CollapsibleListService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(assignmentSettingFormSchema, {
      updateOn: 'submit',
    });
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false); // disable edit UI in collapsible list
    this.collapsibleListService.expandAll();
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
    } else if (controlName === 'hasMaximumFileUpload') {
      if (isChecked) this.form.get('maximumFile')?.enable();
      else this.form.get('maximumFile')?.disable();
    } else if (controlName === 'hasMaximumFileSize') {
      if (isChecked) this.form.get('maximumFileSize')?.enable();
      else this.form.get('maximumFileSize')?.disable();
    }
  }

  getDisabled(controlName: string): boolean {
    const control = this.form.get(controlName);
    console.log(controlName, control);
    return control ? control.disabled : false;
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
}
