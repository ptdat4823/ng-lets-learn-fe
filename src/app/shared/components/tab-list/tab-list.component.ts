import { Component, inject, Input, OnInit } from '@angular/core';
import { TabService } from './tab-list.service';

@Component({
  selector: 'app-tab-list',
  standalone: false,
  templateUrl: './tab-list.component.html',
  styleUrl: './tab-list.component.scss',
})
export class TabListComponent implements OnInit {
  @Input() tabs: string[] = [];
  @Input() variant: 'default' | 'white' = 'default';
  @Input() selectedTab: string = '';
  @Input() localStorageKey: string = '';

  tabService = inject(TabService);

  ngOnInit(): void {
    this.tabService.selectedTab$.subscribe((tab) => {
      this.selectedTab = tab;
    });
    this.tabService.tabs$.subscribe((tabs) => {
      this.tabs = tabs;
    });
    if (this.localStorageKey) {
      const storedTab = localStorage.getItem(this.localStorageKey);
      if (storedTab && this.tabs.includes(storedTab)) {
        this.tabService.selectTab(storedTab);
      }
    } else if (this.tabs.length > 0) {
      this.tabService.selectTab(this.tabs[0]);
    }
  }

  onTabClick(tab: string): void {
    if (this.localStorageKey) localStorage.setItem(this.localStorageKey, tab);
    this.tabService.selectTab(tab);
  }
}
