import { Component, Input, OnInit } from '@angular/core';
import { ToDoService } from '../../to-do.service';
import { ToDoItem, OverdueItemsByTime } from '../../../../constants/to-do.constants';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';

@Component({
  selector: 'tab-overdue',
  standalone: false,
  templateUrl: './tab-overdue.component.html',
  styleUrl: './tab-overdue.component.scss',
  providers: [CollapsibleListService, ToDoService],
})
export class TabOverdueComponent implements OnInit {
  @Input() items: ToDoItem[] = [];
  @Input() itemsByTime: OverdueItemsByTime = { thisWeek: [], lastWeek: [], sooner: [] };
  
  sectionIds: string[] = ['this-week', 'last-week', 'sooner'];
  
  collapsedSections: { [key: string]: boolean } = {
    thisWeek: false,
    lastWeek: true,
    sooner: true
  };

  constructor(
    private collapsibleListService: CollapsibleListService,
    private toDoService: ToDoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
    
    await this.loadOverdueItems();
  }

  private async loadOverdueItems(): Promise<void> {
    try {
      const allItems = await this.toDoService.getToDoItems();
      
      const overdueItems = allItems.filter(item => item.status === 'overdue');
      
      this.itemsByTime = this.toDoService.categorizeOverdueItems(overdueItems);
      
      this.itemsByTime.thisWeek = this.toDoService.sortItemsByDueDate(this.itemsByTime.thisWeek);
      this.itemsByTime.lastWeek = this.toDoService.sortItemsByDueDate(this.itemsByTime.lastWeek);
      this.itemsByTime.sooner = this.toDoService.sortItemsByDueDate(this.itemsByTime.sooner);
    } catch (error) {
      console.error('Error loading overdue items:', error);
      this.itemsByTime = { thisWeek: [], lastWeek: [], sooner: [] };
    }
  }

  getSectionCount(section: string): number {
    switch (section) {
      case 'this-week': return this.itemsByTime.thisWeek.length;
      case 'last-week': return this.itemsByTime.lastWeek.length;
      case 'sooner': return this.itemsByTime.sooner.length;
      default: return 0;
    }
  }

  getSectionItems(section: string): ToDoItem[] {
    switch (section) {
      case 'this-week': return this.itemsByTime.thisWeek;
      case 'last-week': return this.itemsByTime.lastWeek;
      case 'sooner': return this.itemsByTime.sooner;
      default: return [];
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
