import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidebarItemCollapseComponent } from './sidebar-item-collapse/sidebar-item-collapse.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { SidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { LayoutService } from '../layout/layout.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    SidebarItemCollapseComponent,
    MatExpansionModule,
    SidebarItemComponent,
    SidebarGroupComponent,
  ],
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
  isCollapsed = false;

  ngOnInit() {
    this.layoutService.isCollapsed$.subscribe((value) => {
      this.isCollapsed = value;
    });
  }
}
