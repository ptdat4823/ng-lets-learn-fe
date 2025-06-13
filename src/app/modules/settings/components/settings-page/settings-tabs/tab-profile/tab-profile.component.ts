import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@shared/models/user';

@Component({
  selector: 'tab-profile',
  standalone: false,
  templateUrl: './tab-profile.component.html',
  styleUrl: './tab-profile.component.scss',
})
export class TabProfileComponent implements OnChanges {
  @Input() user: User | null = null;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: [''],
      email: ['']
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.profileForm.patchValue({
        username: this.user.username || '',
        email: this.user.email || ''
      });
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}
