import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutService } from '@shared/components/layout/layout.service';

@Component({
  selector: 'sidebar-item-collapse',
  standalone: false,
  templateUrl: './sidebar-item-collapse.component.html',
  styleUrl: './sidebar-item-collapse.component.scss',
})
export class SidebarItemCollapseComponent implements OnInit {
  @Input({ required: true }) label!: string;
  clicked = signal(false);
  layoutService = inject(LayoutService);
  isCollapsed = false;

  ngOnInit() {
    this.layoutService.isCollapsed$.subscribe((value) => {
      this.isCollapsed = value;
    });
  }
}
