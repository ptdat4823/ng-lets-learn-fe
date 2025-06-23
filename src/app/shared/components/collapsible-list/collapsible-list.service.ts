import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CollapsibleListService {
  private sectionIds = new BehaviorSubject<string[]>([]);
  public sectionIds$ = this.sectionIds.asObservable();

  private canEdit = new BehaviorSubject<boolean>(true);
  public canEdit$ = this.canEdit.asObservable();

  private editingSectionIds = new BehaviorSubject<string[]>([]);
  public editingSectionIds$ = this.editingSectionIds.asObservable();

  private expandedSectionIds = new BehaviorSubject<string[]>([]);
  public expandedSectionIds$ = this.expandedSectionIds.asObservable();

  constructor() {}

  toggleExpand(sectionId: string): void {
    const current = this.expandedSectionIds.value;
    if (current.includes(sectionId)) {
      this.expandedSectionIds.next(current.filter((id) => id !== sectionId));
    } else {
      this.expandedSectionIds.next([...current, sectionId]);
    }
  }

  collapseAll(): void {
    this.expandedSectionIds.next([]);
  }

  expandAll(): void {
    const current = this.sectionIds.value;
    this.expandedSectionIds.next(current);
  }

  isAllCollapsed() {
    const current = this.expandedSectionIds.value;
    return current.length === 0;
  }

  toggleAllSectionStates(): void {
    const current = this.expandedSectionIds.value;
    if (current.length === 0) this.expandAll();
    else this.collapseAll();
  }

  toggleEdit(sectionId: string): void {
    const current = this.editingSectionIds.value;
    if (current.includes(sectionId)) {
      this.editingSectionIds.next(current.filter((id) => id !== sectionId));
    } else {
      this.editingSectionIds.next([...current, sectionId]);
    }
  }

  addEditingSectionId(id: string): void {
    const current = this.editingSectionIds.value;
    if (!current.includes(id)) {
      this.editingSectionIds.next([...current, id]);
    }
  }

  removeEditingSectionId(id: string): void {
    const current = this.editingSectionIds.value;
    if (current.includes(id)) {
      this.editingSectionIds.next(
        current.filter((sectionId) => sectionId !== id)
      );
    }
  }

  setSectionIds(ids: string[]): void {
    this.sectionIds.next([...ids]);
  }

  setCanEdit(value: boolean): void {
    this.canEdit.next(value);
  }

  setExpandedSectionIds(ids: string[]): void {
    this.expandedSectionIds.next([...ids]);
  }

  setEditingSectionIds(ids: string[]): void {
    this.editingSectionIds.next([...ids]);
  }

  addSection(id: string): void {
    const current = this.sectionIds.value;
    this.sectionIds.next([...current, id]);
  }
  removeSection(idToRemove: string): void {
    const current = this.sectionIds.value;
    const updated = current.filter((id) => id !== idToRemove);
    this.sectionIds.next(updated);
  }

  getSectionExpandState(sectionId: string) {
    const current = this.expandedSectionIds.value;
    return current.includes(sectionId);
  }

  getSectionEditingState(sectionId: string) {
    const current = this.editingSectionIds.value;
    return current.includes(sectionId);
  }

  getAllStates() {
    return {
      sectionIds: this.sectionIds.value,
      canEdit: this.canEdit.value,
      editingSectionIds: this.editingSectionIds.value,
      expandedSectionIds: this.expandedSectionIds.value,
    };
  }

  isEditingSection(id: string): boolean {
    const current = this.editingSectionIds.value;
    return current.includes(id);
  }
}
