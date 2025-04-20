import { Component, inject } from '@angular/core';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { LayoutService } from '../layout/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [UserAvatarComponent],
})
export class HeaderComponent {
  layoutService = inject(LayoutService);
  onMenuClick() {
    this.layoutService.toggleSidebar();
  }
}
