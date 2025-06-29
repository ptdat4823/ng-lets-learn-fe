import { Component, OnInit, signal } from '@angular/core';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { ComboboxService } from '@shared/components/combobox/combobox.service';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { ToDoService } from './to-do.service';
import { ToDoItem, ToDoItemsCategories, ToDoItemsByDueDate } from '../../constants/to-do.constants';
import { GetPublicCourses } from '@modules/courses/api/courses.api';
import { UserService } from '@shared/services/user.service';
import { Role } from '@shared/models/user';

@Component({
  selector: 'to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss'],
  standalone: false,
  providers: [ComboboxService, TabService],
})
export class ToDoPageComponent implements OnInit {
  tabs: string[] = ['Assigned', 'Overdue', 'Done'];
  selectedTab: string = 'Assigned';
  
  courseOptions: ComboboxOption[] = [
    { value: 'all', label: 'All courses' }
  ];
  
  selectedCourse = signal<string>('all');
  courses: any[] = [];

  allItems: ToDoItem[] = [];
  categorizedItems = signal<ToDoItemsCategories>({
    assigned: [],
    overdue: [],
    done: []
  });
  
  itemsByDueDate = signal<ToDoItemsByDueDate>({
    noDueDate: [],
    thisWeek: [],
    nextWeek: [],
    later: []
  });
  
  overallStats: any = {};
  isLoading = false;

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
    
    const user = this.userService.getUser();
    if (user) {
      const allCourses = await GetPublicCourses();
      this.courses = allCourses.filter((course: any) =>
        Array.isArray(course.students) && course.students.some((student: any) => student.id === user.id)
      );
      
      this.courseOptions = [
        { value: 'all', label: 'All courses' },
        ...this.courses.map((course: any) => ({
          value: course.id,
          label: course.title,
        })),
      ];
    }
    
    // Set the default combobox selection to "All courses"
    const defaultOption = this.courseOptions.find(option => option.value === 'all');
    if (defaultOption) {
      this.comboboxService.selectOption(defaultOption);
    }
    
    // Load initial data
    await this.loadToDoItems();
  }

  async onSelectOption(option: ComboboxOption): Promise<void> {
    this.selectedCourse.set(option.value);
    await this.loadToDoItems();
  }

  private async loadToDoItems(): Promise<void> {
    this.isLoading = true;
    
    try {
      const selectedCourseId = this.selectedCourse();
      const toDoItems = await this.toDoService.getToDoItems(selectedCourseId);
      
      this.allItems = toDoItems;
      this.categorizedItems.set(this.toDoService.categorizeToDoItems(toDoItems));
      this.itemsByDueDate.set(this.toDoService.categorizeByDueDate(toDoItems));
      this.overallStats = this.toDoService.getOverallStats(toDoItems);
      
    } catch (error) {
      this.allItems = [];
      this.categorizedItems.set({
        assigned: [],
        overdue: [],
        done: []
      });
      this.itemsByDueDate.set({
        noDueDate: [],
        thisWeek: [],
        nextWeek: [],
        later: []
      });
      this.overallStats = {};
    } finally {
      this.isLoading = false;
    }
  }

  refreshData(): void {
    this.loadToDoItems();
  }
}
