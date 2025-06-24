import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from '../../to-do.service';
import { ToDoItem, OverdueItemsByTime } from '../../../../constants/to-do.constants';
import { mockCourses } from '@shared/mocks/course';
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
    private router: Router,
    private collapsibleListService: CollapsibleListService,
    private toDoService: ToDoService
  ) {}

  ngOnInit(): void {
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
    
    this.loadOverdueItems();
  }

  private loadOverdueItems(): void {
    const allItems = this.toDoService.getToDoItems();
    
    const overdueItems = allItems.filter(item => item.status === 'overdue');
    
    this.itemsByTime = this.toDoService.categorizeOverdueItems(overdueItems);
    
    this.itemsByTime.thisWeek = this.toDoService.sortItemsByDueDate(this.itemsByTime.thisWeek);
    this.itemsByTime.lastWeek = this.toDoService.sortItemsByDueDate(this.itemsByTime.lastWeek);
    this.itemsByTime.sooner = this.toDoService.sortItemsByDueDate(this.itemsByTime.sooner);
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
