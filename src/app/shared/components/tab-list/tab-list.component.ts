import { Component, inject, Input, OnInit } from '@angular/core';
import { TabService } from './tab-list.service';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '@shared/helper/local-storage.helper';

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

    const storedTab = getLocalStorageData(this.localStorageKey, this.tabs[0]);
    console.log('Stored tab from local storage:', storedTab);
    this.tabService.selectTab(storedTab);
    console.log('Selected tab initialized:', this.selectedTab);
  }

  onTabClick(tab: string): void {
    if (this.localStorageKey) setLocalStorageData(this.localStorageKey, tab);
    this.tabService.selectTab(tab);
  }
}
