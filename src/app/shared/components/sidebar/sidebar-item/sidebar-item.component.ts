import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutService } from '@shared/components/layout/layout.service';

@Component({
  selector: 'sidebar-item',
  standalone: true,
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  imports: [MatExpansionModule],
})
export class SidebarItemComponent {
  @Input({ required: true }) label!: string;
  @Input() description: string | null = null;
  @Input() type: 'default' | 'list-item' = 'default';

  layoutService = inject(LayoutService);
  isCollapsed = false;

  ngOnInit() {
    this.layoutService.isCollapsed$.subscribe((value) => {
      this.isCollapsed = value;
    });
  }
}
