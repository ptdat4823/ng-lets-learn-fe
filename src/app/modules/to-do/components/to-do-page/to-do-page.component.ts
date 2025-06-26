import { Component, OnInit, signal } from '@angular/core';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { ComboboxService } from '@shared/components/combobox/combobox.service';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { ToDoService } from './to-do.service';
import { ToDoItem, ToDoItemsCategories, ToDoItemsByDueDate } from '../../constants/to-do.constants';
import { UserService } from '@shared/services/user.service';
import { GetPublicCourses } from '@modules/courses/api/courses.api';

@Component({
  selector: 'to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss'],
  standalone: false,
  providers: [ComboboxService, TabService],
})
export class ToDoPageComponent implements OnInit {
  courseOptions: ComboboxOption[] = [
    { value: 'all', label: 'All courses' }
  ];
  
  selectedCourse = signal<string>('all');
  toDoItems = signal<ToDoItem[]>([]);
  categorizedItems = signal<ToDoItemsCategories>({ assigned: [], overdue: [], done: [] });
  itemsByDueDate = signal<ToDoItemsByDueDate>({ noDueDate: [], thisWeek: [], nextWeek: [], later: [] });
  
  // Tab configuration
  tabs = ['Assigned', 'Overdue', 'Done'];
  selectedTab = 'Assigned';
  
  isLoading = false;
  courses: any[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private comboboxService: ComboboxService,
    private tabService: TabService<string>,
    private toDoService: ToDoService,
    private userService: UserService
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {
        label: 'To Do',
        url: '/to-do',
        active: true,
      },
    ]);
  }

  async ngOnInit(): Promise<void> {
    // Set up tabs
    this.tabService.setTabs(this.tabs);
    this.tabService.selectTab(this.tabs[0]);
    
    // Subscribe to tab changes
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) {
        this.selectedTab = tab;
      }
    });
    
    // Load courses first
    await this.loadCourses();
    
    // Set the default combobox selection to "All courses"
    const defaultOption = this.courseOptions.find(option => option.value === 'all');
    if (defaultOption) {
      this.comboboxService.selectOption(defaultOption);
    }
    
    // Load initial data
    await this.loadToDoItems();
  }

  private async loadCourses(): Promise<void> {
    try {
      const user = this.userService.getUser();
      if (user) {
        const allCourses = await GetPublicCourses();
        this.courses = allCourses.filter((course: any) => 
          course.students?.some((student: any) => student.id === user.id)
        );
        
        this.courseOptions = [
          { value: 'all', label: 'All courses' },
          ...this.courses.map((course: any) => ({
            value: course.id,
            label: course.title,
          }))
        ];
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      // Keep default options if error occurs
    }
  }

  async onSelectOption(option: ComboboxOption): Promise<void> {
    this.selectedCourse.set(option.value);
    await this.loadToDoItems();
  }
  
  private async loadToDoItems(): Promise<void> {
    this.isLoading = true;
    
    try {
      const courseId = this.selectedCourse() === 'all' ? undefined : this.selectedCourse();
      const items = await this.toDoService.getToDoItems(courseId);
      
      this.toDoItems.set(items);
      this.categorizedItems.set(this.toDoService.categorizeToDoItems(items));
      this.itemsByDueDate.set(this.toDoService.categorizeByDueDate(items));
    } catch (error) {
      console.error('Error loading to-do items:', error);
      this.toDoItems.set([]);
      this.categorizedItems.set({ assigned: [], overdue: [], done: [] });
      this.itemsByDueDate.set({ noDueDate: [], thisWeek: [], nextWeek: [], later: [] });
    } finally {
      this.isLoading = false;
    }
  }
  
  async refreshData(): Promise<void> {
    await this.loadToDoItems();
  }
}
