import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CollapsibleSectionService {
  private sectionId = new BehaviorSubject<string | null>('');
  public sectionId$ = this.sectionId.asObservable();

  setSectionId(id: string): void {
    this.sectionId.next(id);
  }
}
