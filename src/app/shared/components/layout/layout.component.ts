import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { mockUsers } from '@shared/mocks/user';
import { UserService } from '@shared/services/user.service';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  private responsive = inject(BreakpointObserver);
  private layoutService = inject(LayoutService);
  private userService = inject(UserService);

  // XSmall (max-width: 599.98px)
  // Small (min-width: 600px) and (max-width: 959.98px)
  // Medium (min-width: 960px) and (max-width: 1279.98px)
  // Large (min-width: 1280px) and (max-width: 1919.98px)
  // XLarge (min-width: 1920px)

  ngOnInit() {
    this.userService.setUser(mockUsers[0]);
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
