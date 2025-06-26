import { Component, Input, OnInit } from '@angular/core';
import { ToDoService } from '../../to-do.service';
import { ToDoItem, ToDoItemsByDueDate } from '../../../../constants/to-do.constants';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';

@Component({
  selector: 'tab-assigned',
  standalone: false,
  templateUrl: './tab-assigned.component.html',
  styleUrl: './tab-assigned.component.scss',
  providers: [CollapsibleListService, ToDoService],
})
export class TabAssignedComponent implements OnInit {
  @Input() items: ToDoItem[] = [];
  @Input() itemsByDueDate: ToDoItemsByDueDate = { noDueDate: [], thisWeek: [], nextWeek: [], later: [] };
  
  sectionIds: string[] = ['no-due-date', 'this-week', 'next-week', 'later'];
  
  collapsedSections: { [key: string]: boolean } = {
    noDueDate: true,
    thisWeek: false, 
    nextWeek: true,
    later: true
  };

  constructor(
    private collapsibleListService: CollapsibleListService,
    private toDoService: ToDoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
    
    await this.loadToDoItems();
  }

  private async loadToDoItems(): Promise<void> {
    try {
      const allItems = await this.toDoService.getToDoItems();
      
      const assignedItems = allItems.filter(item => item.status === 'assigned');
      
      this.itemsByDueDate = this.toDoService.categorizeByDueDate(assignedItems);
      
      this.itemsByDueDate.thisWeek = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.thisWeek);
      this.itemsByDueDate.nextWeek = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.nextWeek);
      this.itemsByDueDate.later = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.later);
    } catch (error) {
      console.error('Error loading to-do items:', error);
      this.itemsByDueDate = { noDueDate: [], thisWeek: [], nextWeek: [], later: [] };
    }
  }

  toggleSection(sectionKey: string): void {
    this.collapsedSections[sectionKey] = !this.collapsedSections[sectionKey];
  }

  isSectionCollapsed(sectionKey: string): boolean {
    return this.collapsedSections[sectionKey];
  }

  navigateToItem(item: ToDoItem): void {
    this.toDoService.navigateToItem(item);
  }
}
