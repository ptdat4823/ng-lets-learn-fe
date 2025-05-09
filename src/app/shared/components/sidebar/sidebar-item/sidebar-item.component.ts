import { Component, inject, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutService } from '@shared/components/layout/layout.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'sidebar-item',
  standalone: false,
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
})
export class SidebarItemComponent implements OnInit {
  @Input({ required: true }) label!: string;
  @Input() description: string | null = null;
  @Input() type: 'default' | 'list-item' = 'default';
  @Input() href: string | null = null;

  private router = inject(Router);
  private layoutService = inject(LayoutService);
  isCollapsed = false;
  currentUrl = this.router.url;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.currentUrl = event.url;
    });

    this.layoutService.isCollapsed$.subscribe((value) => {
      this.isCollapsed = value;
    });
  }

  onClick(): void {
    if (this.href) this.router.navigate([this.href]);
  }
}
