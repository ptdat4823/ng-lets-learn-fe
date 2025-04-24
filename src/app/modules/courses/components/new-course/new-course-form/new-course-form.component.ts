import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  newCourseFormControls,
  newCourseFormSchema,
} from './new-course-form.config';
import { ComboboxService } from '@shared/components/combobox/combobox.service';

@Component({
  selector: 'new-course-form',
  standalone: false,
  templateUrl: './new-course-form.component.html',
  styleUrl: './new-course-form.component.scss',
  providers: [ComboboxService],
})
export class NewCourseFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private comboboxService = inject(ComboboxService);

  showPassword = false;
  form!: FormGroup;
  formControls = newCourseFormControls;

  visibilityValue = '0';

  ngOnInit(): void {
    this.form = this.fb.group(newCourseFormSchema);
    this.comboboxService.selectedOption$.subscribe((option) => {
      this.visibilityValue = option?.value || 'default';
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(e: Event): void {
    e.preventDefault(); // Prevent default form submission
    // Stop here if form is invalid
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all controls as touched to show validation errors
      return;
    }

    // Here you would typically call your authentication service
    console.log('submit attempt with:', this.form.value);

    // Navigate to dashboard or home page after successful login
    // this.router.navigate(['/dashboard']);
  }
}
