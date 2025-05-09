import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CircleImageComponent } from '../circle-image/circle-image.component';
import { LayoutService } from '../layout/layout.service';
import { SidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { SidebarItemCollapseComponent } from './sidebar-item-collapse/sidebar-item-collapse.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { mockCourses } from '@shared/mocks/course';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  layoutService = inject(LayoutService);
  isCollapsed = false;
  courses = mockCourses;

  ngOnInit() {
    this.layoutService.isCollapsed$.subscribe((value) => {
      this.isCollapsed = value;
    });
  }
}
