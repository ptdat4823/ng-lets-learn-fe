import { Component, inject } from '@angular/core';
import { CircleImageComponent } from '../circle-image/circle-image.component';
import { LayoutService } from '../layout/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CircleImageComponent],
})
export class HeaderComponent {
  router = inject(Router);
  layoutService = inject(LayoutService);
  onMenuClick() {
    this.layoutService.toggleSidebar();
  }
  onCreateCourse() {
    this.router.navigate(['/courses/new-course']);
  }
}
