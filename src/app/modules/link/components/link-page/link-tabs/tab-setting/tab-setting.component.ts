import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { linkGeneralSettingFormControls, linkSettingFormSchema } from './link-setting-form.config';
import { CloudinaryFile } from '@shared/models/cloudinary-file';
import { LinkTabService } from '../link-tab.service';
@Component({
  selector: 'tab-setting',
  templateUrl: './tab-setting.component.html',
  styleUrls: ['./tab-setting.component.scss'],
  standalone:false,
  providers: [CollapsibleListService],
})
export class TabSettingComponent implements OnInit {
  @Input({ required: true }) topic!: any;
  uploadedFileUrl: string | null = null;
  uploadedFileName: string | null = null;
  form!: FormGroup;
  sectionIds: string[] = ['general'];
  generalFormControls = linkGeneralSettingFormControls;
  constructor(
    private fb: FormBuilder,
    private collapsibleListService: CollapsibleListService,
    private linkTabService: LinkTabService 
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(linkSettingFormSchema, { updateOn: 'submit' });
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false); 
    this.collapsibleListService.expandAll();
    this.uploadedFileName="Something";
    this.linkTabService.updateFileInfo(this.uploadedFileUrl, this.uploadedFileName);
  }
  getDisabled(controlName: string): boolean {
    const control = this.form.get(controlName);
    console.log(controlName, control);
    return control ? control.disabled : false;
  }
  onFileUpload(event: any): void {
      const files = event?.files;
      if (files && files.length > 0) {
        const file = files[0];
        
        // Store file information
        this.uploadedFileName = file.name || file.originalname || 'File';
        
        this.uploadedFileUrl = file.url || file.secure_url || file.path;
        
        // Update form values
        this.form.patchValue({
          additionalFile: files,
        });

        this.linkTabService.updateFileInfo(this.uploadedFileUrl, this.uploadedFileName);

        console.log('File uploaded:', this.uploadedFileName, this.uploadedFileUrl);
      }
  }
  onSubmit(e: Event): void {
    e.preventDefault(); // Prevent default form submission
    // Stop here if form is invalid
    if (this.form.invalid) {
      this.form.markAllAsTouched();

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
    // Get form values
  const formValues = this.form.value;
  
  // Update the topic with form values
  if (this.topic) {
    this.topic.title = formValues.name;
    
    // Create/update the topic data object
    if (!this.topic.data) {
      this.topic.data = {};
    }
    
    this.topic.data.description = formValues.description;
    // Save the file URL in the topic data
    this.topic.data.fileUrl = this.uploadedFileUrl;
    this.topic.data.fileName = this.uploadedFileName;
    
    console.log('Saving topic with file URL:', this.topic);
  }

    this.linkTabService.updateFileInfo(this.uploadedFileUrl, this.uploadedFileName);

  }
}
