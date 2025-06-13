import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { linkGeneralSettingFormControls, linkSettingFormSchema } from './link-setting-form.config';
import { LinkTopic } from '@shared/models/topic';

@Component({
  selector: 'tab-setting',
  templateUrl: './tab-setting.component.html',
  styleUrls: ['./tab-setting.component.scss'],
  standalone: false,
  providers: [CollapsibleListService],
})
export class TabSettingComponent implements OnInit {
  @Input({ required: true }) topic!: LinkTopic;
  form!: FormGroup;
  sectionIds: string[] = ['general'];
  generalFormControls = linkGeneralSettingFormControls;

  constructor(
    private fb: FormBuilder,
    private collapsibleListService: CollapsibleListService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group(linkSettingFormSchema, { updateOn: 'submit' });
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
    
    // Initialize form with existing topic data
    if (this.topic) {
      this.form.patchValue({
        name: this.topic.title || '',
        description: this.topic.data?.description || ''
      });
    }
  }

  getDisabled(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control ? control.disabled : false;
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    
    // Stop here if form is invalid
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

    if (!this.topic) {
      return;
    }    const formValues = this.form.value;
    // Ensure topic data exists
    this.topic.data = this.topic.data || {};
    
    // Update topic data
    this.topic.data.description = formValues.description;
    
    // Extract URL from uploaded files and store in topic data
    if (formValues.additionalFile && formValues.additionalFile.length > 0) {
      const uploadedFile = formValues.additionalFile[0];
      this.topic.data.url = uploadedFile.downloadUrl || uploadedFile.displayUrl || uploadedFile.url;
    }
    
    console.log('Submit attempt with:', this.form.value);
    console.log('Saving topic:', this.topic);
  }
}
