import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { linkGeneralSettingFormControls, linkSettingFormSchema, linkValidationMessages } from './link-setting-form.config';
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
  validationMessages = linkValidationMessages;

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
        externalUrl: this.topic.data?.url || '',
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
    }
    
    const formValues = this.form.value;
    
    // Update topic title with name field
    this.topic.title = formValues.name;
    
    // Ensure topic data exists
    this.topic.data = this.topic.data || {};
    
    // Update topic data with form values
    this.topic.data.url = formValues.externalUrl;
    this.topic.data.description = formValues.description;
    
    console.log('Submit attempt with:', this.form.value);
    console.log('Saving topic:', this.topic);
  }
}
