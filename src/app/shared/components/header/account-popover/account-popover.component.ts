import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'account-popover',
  standalone: false,
  templateUrl: './account-popover.component.html',
  styleUrl: './account-popover.component.scss',
})
export class AccountPopoverComponent {
  @Output() close = new EventEmitter<void>();

  onProfileClick() {
    // Handle profile click logic here
    console.log('Profile clicked');
    this.close.emit();
  }
  onSettingsClick() {
    // Handle settings click logic here
    console.log('Settings clicked');
    this.close.emit();
  }
  onLogoutClick() {
    // Handle logout logic here
    console.log('Logout clicked');
    this.close.emit();
  }
}
