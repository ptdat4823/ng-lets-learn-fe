import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from '../../to-do.service';
import { ToDoItem, ToDoItemsByDueDate } from '../../../../constants/to-do.constants';
import { mockCourses } from '@shared/mocks/course';
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
    private router: Router,
    private collapsibleListService: CollapsibleListService,
    private toDoService: ToDoService
  ) {}

  ngOnInit(): void {
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
    
    this.loadToDoItems();
  }

  private loadToDoItems(): void {
    const allItems = this.toDoService.getToDoItems();
    
    const assignedItems = allItems.filter(item => item.status === 'assigned');
    
    this.itemsByDueDate = this.toDoService.categorizeByDueDate(assignedItems);
    
    this.itemsByDueDate.thisWeek = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.thisWeek);
    this.itemsByDueDate.nextWeek = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.nextWeek);
    this.itemsByDueDate.later = this.toDoService.sortItemsByDueDate(this.itemsByDueDate.later);
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
