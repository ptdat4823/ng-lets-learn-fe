import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from '../../to-do.service';
import { ToDoItem, OverdueItemsByTime } from '../../../../constants/to-do.constants';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tab-overdue',
  standalone: false,
  templateUrl: './tab-overdue.component.html',
  styleUrl: './tab-overdue.component.scss',
  providers: [CollapsibleListService]
})
export class TabOverdueComponent implements OnInit, OnDestroy, OnChanges {
  @Input() items: ToDoItem[] = [];
  
  itemsByTime: OverdueItemsByTime = { 
    thisWeek: [], 
    lastWeek: [], 
    sooner: [] 
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
    const sectionIds = ['this-week', 'last-week', 'sooner'];
    this.collapsibleListService.setSectionIds(sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
  }

  private updateCategorizedItems() {
    const overdueItems = this.items.filter((item: ToDoItem) => item.status === 'overdue');
    this.itemsByTime = this.toDoService.categorizeOverdueItems(overdueItems);
    
    this.itemsByTime.thisWeek = this.toDoService.sortItemsByDueDate(this.itemsByTime.thisWeek);
    this.itemsByTime.lastWeek = this.toDoService.sortItemsByDueDate(this.itemsByTime.lastWeek);
    this.itemsByTime.sooner = this.toDoService.sortItemsByDueDate(this.itemsByTime.sooner);
  }

  getSectionItems(sectionId: string): ToDoItem[] {
    switch (sectionId) {
      case 'this-week':
        return this.itemsByTime.thisWeek;
      case 'last-week':
        return this.itemsByTime.lastWeek;
      case 'sooner':
        return this.itemsByTime.sooner;
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
