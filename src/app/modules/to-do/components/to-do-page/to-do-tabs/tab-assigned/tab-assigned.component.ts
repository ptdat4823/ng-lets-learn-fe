import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from '../../to-do.service';
import { ToDoItem, ToDoItemsByDueDate } from '../../../../constants/to-do.constants';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tab-assigned',
  standalone: false,
  templateUrl: './tab-assigned.component.html',
  styleUrl: './tab-assigned.component.scss',
  providers: [CollapsibleListService]
})
export class TabAssignedComponent implements OnInit, OnDestroy, OnChanges {
  @Input() items: ToDoItem[] = [];
  
  itemsByDueDate: ToDoItemsByDueDate = { 
    noDueDate: [], 
    thisWeek: [], 
    nextWeek: [], 
    later: [] 
  };
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private router: Router,
    private toDoService: ToDoService,
    public collapsibleListService: CollapsibleListService
  ) {}

  ngOnInit() {
    this.initializeCollapsibleSections();
    this.updateCategorizedItems();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges() {
    this.updateCategorizedItems();
  }

  private initializeCollapsibleSections() {
    const sectionIds = ['no-due-date', 'this-week', 'next-week', 'later'];
    this.collapsibleListService.setSectionIds(sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
  }

  private updateCategorizedItems() {
    const assignedItems = this.items.filter((item: ToDoItem) => item.status === 'assigned');
    this.itemsByDueDate = this.toDoService.categorizeByDueDate(assignedItems);
    
    this.itemsByDueDate.thisWeek = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.thisWeek);
    this.itemsByDueDate.nextWeek = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.nextWeek);
    this.itemsByDueDate.later = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.later);
  }

  getSectionItems(sectionId: string): ToDoItem[] {
    switch (sectionId) {
      case 'no-due-date':
        return this.itemsByDueDate.noDueDate;
      case 'this-week':
        return this.itemsByDueDate.thisWeek;
      case 'next-week':
        return this.itemsByDueDate.nextWeek;
      case 'later':
        return this.itemsByDueDate.later;
      default:
        return [];
    }
  }

  getSectionCount(sectionId: string): number {
    return this.getSectionItems(sectionId).length;
  }

  navigateToItem(item: ToDoItem): void {
    if (item.type === 'assignment') {
      this.router.navigate(['/courses', this.getCourseIdFromItem(item), 'assignment', item.id]);
    } else if (item.type === 'quiz') {
      this.router.navigate(['/courses', this.getCourseIdFromItem(item), 'quiz', item.id]);
    }
  }

  private getCourseIdFromItem(item: ToDoItem): string {
    return item.courseId || '1';
  }
}
