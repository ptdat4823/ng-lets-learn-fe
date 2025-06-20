import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../layout/layout.service';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  breadcrumbItems: BreadcrumbItem[] = [];
  showAccountPopover = false;

  constructor(
    private layoutService: LayoutService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.breadcrumbs$.subscribe((items) => {
      this.breadcrumbItems = items;
    });
  }

  ngOnInit(): void {}

  onMenuClick() {
    this.layoutService.toggleSidebar();
  }
  onCreateCourse() {
    this.router.navigate(['/courses/new-course']);
  }
  onAccoutPopoverVisibleChange(isVisible: boolean) {
    this.showAccountPopover = isVisible;
  }
}
