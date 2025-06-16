import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from '@shared/models/user';
import { profileFormSchema, profileFormControls } from '../settings-form.config';
import { FormControlField } from '@shared/helper/form.helper';
import { TabService } from '@shared/components/tab-list/tab-list.service';

@Component({
  selector: 'tab-profile',
  standalone: false,
  templateUrl: './tab-profile.component.html',
  styleUrl: './tab-profile.component.scss',
})
export class TabProfileComponent implements OnChanges {
  @Input() user: User | null = null;
  profileForm: FormGroup;
  profileFormControls: FormControlField[] = profileFormControls;
  usernameControl: FormControlField;
  emailControl: FormControlField;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group(profileFormSchema);
    
    this.usernameControl = this.profileFormControls.find(control => control.id === 'username')!;
    this.emailControl = this.profileFormControls.find(control => control.id === 'email')!;
  }  ngOnChanges(changes: SimpleChanges): void {
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
    
    if (this.profileForm.valid) {
      console.log('Profile save attempt with:', this.profileForm.value);
      return;
    }

    this.profileForm.markAllAsTouched();
    this.scrollToFirstInvalidField();
  }

  private scrollToFirstInvalidField(): void {
    const firstInvalidControl = document.querySelector('form .ng-invalid') as HTMLElement;
    
    if (!firstInvalidControl) return;
    
    firstInvalidControl.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
}
