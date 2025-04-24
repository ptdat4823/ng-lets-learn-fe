import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabService {
  private selectedTab = new BehaviorSubject<string>('');
  public selectedTab$ = this.selectedTab.asObservable();

  constructor() {}

  selectTab(tab: string) {
    this.selectedTab.next(tab);
  }
}
