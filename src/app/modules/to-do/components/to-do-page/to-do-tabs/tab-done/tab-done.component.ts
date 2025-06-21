import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from '../../to-do.service';
import { ToDoItem, DoneItemsByCompletion } from '../../../../constants/to-do.constants';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { mockCourses } from '@shared/mocks/course';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tab-done',
  standalone: false,
  templateUrl: './tab-done.component.html',
  styleUrl: './tab-done.component.scss',
  providers: [CollapsibleListService]
})
export class TabDoneComponent implements OnInit, OnDestroy, OnChanges {
  @Input() items: ToDoItem[] = [];
  
  categorizedItems: DoneItemsByCompletion = {
    noDueDate: [],
    completeEarly: [],
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
    const sectionIds = ['no-due-date', 'complete-early', 'this-week', 'last-week', 'sooner'];
    this.collapsibleListService.setSectionIds(sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
  }

  private updateCategorizedItems() {
    this.categorizedItems = this.toDoService.categorizeDoneItems(this.items);
  }

  getSectionItems(sectionId: string): ToDoItem[] {
    switch (sectionId) {
      case 'no-due-date':
        return this.categorizedItems.noDueDate;
      case 'complete-early':
        return this.categorizedItems.completeEarly;
      case 'this-week':
        return this.categorizedItems.thisWeek;
      case 'last-week':
        return this.categorizedItems.lastWeek;
      case 'sooner':
        return this.categorizedItems.sooner;
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
    const course = mockCourses.find(c => c.title === item.course);
    return course?.id || '1'; 
  }
}
