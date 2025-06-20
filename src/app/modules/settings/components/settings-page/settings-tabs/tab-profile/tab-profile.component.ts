import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@shared/models/user';
import { profileFormConfig } from '../settings-form.config';
import { scrollToFirstInvalidField } from '@shared/helper/common.helper';

@Component({
  selector: 'tab-profile',
  standalone: false,
  templateUrl: './tab-profile.component.html',
  styleUrl: './tab-profile.component.scss',
})
export class TabProfileComponent implements OnChanges {
  @Input() user: User | null = null;
  profileForm: FormGroup;
  formConfig = profileFormConfig;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group(this.formConfig.schema);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.profileForm.patchValue({
        username: this.user.username || '',
        email: this.user.email || ''
      });
      this.profileForm.get('email')?.disable();
    }
  }

  saveProfile(e: Event): void {
    e.preventDefault();
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      scrollToFirstInvalidField();
      return;
    }
    this.loading = true;
    
    console.log('Profile save attempt with:', this.profileForm.value);
    this.loading = false;
  }
}
