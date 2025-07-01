import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import {
  courseGeneralSettingFormControls,
  courseDangerZoneSettingFormControls,
  courseSettingFormSchema,
} from './course-setting-form.config';
import { Course } from '@shared/models/course';

@Component({
  selector: 'tab-setting',
  standalone: false,
  templateUrl: './tab-setting.component.html',
  styleUrl: './tab-setting.component.scss',
  providers: [CollapsibleListService],
})
export class TabSettingComponent implements OnInit {
  @Input({ required: true }) course!: Course;
  sectionIds: string[] = ['general', 'danger-zone'];
  showPassword = false;
  form!: FormGroup;
  generalFormControls = courseGeneralSettingFormControls;
  dangerZoneFormControls = courseDangerZoneSettingFormControls;

  constructor(
    private fb: FormBuilder,
    private collapsibleListService: CollapsibleListService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(courseSettingFormSchema, { updateOn: 'submit' });
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false); // disable edit UI in collapsible list
    this.collapsibleListService.expandAll();
    if (this.course) {
      this.form.patchValue(this.getFormValuesFromCourse(this.course));
    }
  }

  private getFormValuesFromCourse(course: Course) {
    return {
      name: course.title || '',
      category: course.category || '',
      level: course.level || 'beginner',
      price: course.price ?? '',
    };
  }

  getDisabled(controlName: string): boolean {
    const control = this.form.get(controlName);
    console.log(controlName, control);
    return control ? control.disabled : false;
  }

  onSubmit(e: Event): void {
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
    console.log('submit attempt with:', this.form.value);
  }
}
