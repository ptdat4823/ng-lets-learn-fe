import { Injectable } from '@angular/core';
import { Section } from '@shared/models/course';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CollapsibleListService {
  private sections = new BehaviorSubject<Section[]>([]);
  public sections$ = this.sections.asObservable();

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

  toggleEdit(sectionId: string): void {
    const current = this.editingSectionIds.value;
    if (current.includes(sectionId)) {
      this.editingSectionIds.next(current.filter((id) => id !== sectionId));
    } else {
      this.editingSectionIds.next([...current, sectionId]);
    }
  }

  setSections(sections: Section[]): void {
    this.sections.next([...sections]);
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

  addSection(section: Section): void {
    const current = this.sections.value;
    this.sections.next([...current, section]);
  }
  removeSection(id: string): void {
    const current = this.sections.value;
    const updated = current.filter((section) => section.id !== id);
    this.sections.next(updated);
  }
  updateSection(updatedSection: Section): void {
    const current = this.sections.value;
    const updated = current.map((section) =>
      section.id === updatedSection.id ? updatedSection : section
    );
    this.sections.next(updated);
  }
}
