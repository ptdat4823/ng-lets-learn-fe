import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabService<T> {
  private tabs = new BehaviorSubject<T[]>([]);
  public tabs$ = this.tabs.asObservable();

  private selectedTab = new BehaviorSubject<T | null>(null);
  public selectedTab$ = this.selectedTab.asObservable();

  constructor() {}

  selectTab(tab: T) {
    this.selectedTab.next(tab);
  }

  setTabs(tabs: T[]) {
    this.tabs.next(tabs);
  }
}
