import { Injectable } from '@angular/core';
import { BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<BreadcrumbItem[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  setBreadcrumbs(breadcrumbs: BreadcrumbItem[]) {
    this.breadcrumbs.next(breadcrumbs);
  }

  getCurrentBreadcrumbs() {
    return this.breadcrumbs;
  }
}
