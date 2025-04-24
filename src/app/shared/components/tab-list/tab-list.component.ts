import { Component, inject, Input, OnInit } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { TabService } from './tab-list.service';

@Component({
  selector: 'app-tab-list',
  imports: [TabComponent],
  templateUrl: './tab-list.component.html',
  styleUrl: './tab-list.component.scss',
})
export class TabListComponent implements OnInit {
  @Input() tabs: string[] = [];
  @Input() variant: 'default' | 'white' = 'default';
  @Input() selectedTab: string = '';

  tabService = inject(TabService);

  ngOnInit(): void {
    if (this.tabs.length > 0) {
      this.tabService.selectTab(this.tabs[0]);
    }

    this.tabService.selectedTab$.subscribe((tab) => {
      this.selectedTab = tab;
    });
    this.tabService.tabs$.subscribe((tabs) => {
      this.tabs = tabs;
    });
  }

  onTabClick(tab: string): void {
    this.tabService.selectTab(tab);
  }
}
