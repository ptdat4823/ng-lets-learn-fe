import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@shared/constants/routes';
import { UserService } from '@shared/services/user.service';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  constructor(
    private responsive: BreakpointObserver,
    private layoutService: LayoutService
  ) {}

  // XSmall (max-width: 599.98px)
  // Small (min-width: 600px) and (max-width: 959.98px)
  // Medium (min-width: 960px) and (max-width: 1279.98px)
  // Large (min-width: 1280px) and (max-width: 1919.98px)
  // XLarge (min-width: 1920px)

  ngOnInit() {
    this.responsive
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((state) => {
        if (
          state.breakpoints[Breakpoints.XSmall] ||
          state.breakpoints[Breakpoints.Small]
        ) {
          this.layoutService.collapseSidebar();
        } else {
          this.layoutService.expandSidebar();
        }
      });
  }
}
