import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CircleImageComponent } from '../circle-image/circle-image.component';
import { LayoutService } from '../layout/layout.service';
import { SidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { SidebarItemCollapseComponent } from './sidebar-item-collapse/sidebar-item-collapse.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { mockCourses } from '@shared/mocks/course';
import { UserService } from '@shared/services/user.service';
import { Role, User } from '@shared/models/user';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  layoutService = inject(LayoutService);
  userService = inject(UserService);
  isCollapsed = false;
  courses = mockCourses;
  currentUser: User | null = null;
  Role = Role;

  ngOnInit() {
    this.layoutService.isCollapsed$.subscribe((value) => {
      this.isCollapsed = value;
    });
    
    this.userService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }
}
