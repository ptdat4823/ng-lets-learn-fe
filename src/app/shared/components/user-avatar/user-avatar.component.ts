import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-avatar',
  standalone: true,
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  @Input() src: string | null = null;
}
