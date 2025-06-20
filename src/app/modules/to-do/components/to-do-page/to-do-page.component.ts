import { Component, OnInit, signal } from '@angular/core';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { ComboboxService } from '@shared/components/combobox/combobox.service';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockCourses } from '@shared/mocks/course';
import { ToDoService, ToDoItem, ToDoItemsCategories, ToDoItemsByDueDate } from './to-do.service';

@Component({
  selector: 'to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss'],
  standalone: false,
  providers: [ComboboxService, TabService],
})
export class ToDoPageComponent implements OnInit {
  courseOptions: ComboboxOption[] = [
    { value: 'all', label: 'All courses' },
    ...mockCourses.map((course) => ({
      value: course.id,
      label: course.title,
    })),
  ];
  
  selectedCourse = signal<string>('all');
  toDoItems = signal<ToDoItem[]>([]);
  categorizedItems = signal<ToDoItemsCategories>({ assigned: [], overdue: [], done: [] });
  itemsByDueDate = signal<ToDoItemsByDueDate>({ noDueDate: [], thisWeek: [], nextWeek: [], later: [] });
  
  // Tab configuration
  tabs = ['Assigned', 'Overdue', 'Done'];
  selectedTab = 'Assigned';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private comboboxService: ComboboxService,
    private tabService: TabService<string>,
    private toDoService: ToDoService
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {
        label: 'To Do',
        url: '/to-do',
        active: true,
      },
    ]);
  }

  ngOnInit(): void {
    // Set up tabs
    this.tabService.setTabs(this.tabs);
    this.tabService.selectTab(this.tabs[0]);
    
    // Subscribe to tab changes
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) {
        this.selectedTab = tab;
      }
    });
    
    // Set the default combobox selection to "All courses"
    const defaultOption = this.courseOptions.find(option => option.value === 'all');
    if (defaultOption) {
      this.comboboxService.selectOption(defaultOption);
    }
    
    // Load initial data
    this.loadToDoItems();
  }

  onSelectOption(option: ComboboxOption): void {
    this.selectedCourse.set(option.value);
    this.loadToDoItems();
  }
  
  private loadToDoItems(): void {
    const courseId = this.selectedCourse() === 'all' ? undefined : this.selectedCourse();
    const items = this.toDoService.getToDoItems(courseId);
    
    this.toDoItems.set(items);
    this.categorizedItems.set(this.toDoService.categorizeToDoItems(items));
    this.itemsByDueDate.set(this.toDoService.categorizeByDueDate(items));
  }
}
