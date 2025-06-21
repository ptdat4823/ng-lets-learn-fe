import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private isCollapsed = new BehaviorSubject<boolean>(false);
  public isCollapsed$ = this.isCollapsed.asObservable();

  toggleSidebar() {
    this.isCollapsed.next(!this.isCollapsed.value);
  }
  collapseSidebar() {
    this.isCollapsed.next(true);
  }
  expandSidebar() {
    this.isCollapsed.next(false);
  }
}
