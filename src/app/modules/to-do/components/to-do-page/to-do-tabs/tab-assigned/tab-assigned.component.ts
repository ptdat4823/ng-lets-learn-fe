import { Component, Input } from '@angular/core';
import { ToDoItem, ToDoItemsByDueDate } from '../../to-do.service';

@Component({
  selector: 'tab-assigned',
  standalone: false,
  templateUrl: './tab-assigned.component.html',
  styleUrl: './tab-assigned.component.scss'
})
export class TabAssignedComponent {
  @Input() items: ToDoItem[] = [];
  @Input() itemsByDueDate: ToDoItemsByDueDate = { noDueDate: [], thisWeek: [], nextWeek: [], later: [] };
  
  collapsedSections: { [key: string]: boolean } = {
    noDueDate: true,
    thisWeek: false, 
    nextWeek: true,
    later: true
  };

  toggleSection(sectionKey: string): void {
    this.collapsedSections[sectionKey] = !this.collapsedSections[sectionKey];
  }

  isSectionCollapsed(sectionKey: string): boolean {
    return this.collapsedSections[sectionKey];
  }
}
