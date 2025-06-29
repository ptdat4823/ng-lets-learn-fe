import { Component, OnInit, signal } from '@angular/core';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { ComboboxService } from '@shared/components/combobox/combobox.service';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { mockCourses } from '@shared/mocks/course';
import { ToReviewService } from './to-review.service';
import { ReviewItem, ReviewItemsCategories } from '../../constants/to-review.constants';
import { Router } from '@angular/router';
import { GetTeacherCourses } from '@modules/courses/api/courses.api';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'to-review-page',
  templateUrl: './to-review-page.component.html',
  styleUrls: ['./to-review-page.component.scss'],
  standalone: false,
  providers: [ComboboxService, CollapsibleListService],
})
export class ToReviewPageComponent implements OnInit {  
  courseOptions: ComboboxOption[] = [
    { value: 'all', label: 'All courses' }
  ];
  
  selectedCourse = signal<string>('all');
  sectionIds: string[] = ['work-in-progress', 'closed', 'no-due-date'];

  workInProgressItems: ReviewItem[] = [];
  closedItems: ReviewItem[] = [];
  noDueDateItems: ReviewItem[] = [];

  allItems: ReviewItem[] = [];
  overallStats: any = {};
  isLoading = false;
  courses: any[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private collapsibleListService: CollapsibleListService,
    private comboboxService: ComboboxService,
    private toReviewService: ToReviewService,
    private router: Router,
    private userService: UserService
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {
        label: 'To Review',
        url: '/to-review',
        active: true,
      },
    ]);
  }

  async ngOnInit(): Promise<void> {
    this.collapsibleListService.setSectionIds(this.sectionIds);
    this.collapsibleListService.setCanEdit(false);
    this.collapsibleListService.expandAll();
    
    const user = this.userService.getUser();
    if (user) {
      const courses = await GetTeacherCourses(user.id);
      this.courses = courses;
      this.courseOptions = [
        { value: 'all', label: 'All courses' },
        ...courses.map((course: any) => ({
          value: course.id,
          label: course.title,
        })),
      ];
    }
    
    const defaultOption = this.courseOptions.find(option => option.value === 'all');
    if (defaultOption) {
      this.comboboxService.selectOption(defaultOption);
    }
    
    await this.loadReviewItems();
  }

  async onSelectOption(option: ComboboxOption): Promise<void> {
    this.selectedCourse.set(option.value);
    await this.loadReviewItems();
  }  
  
  private async loadReviewItems(): Promise<void> {
    this.isLoading = true;
    
    try {
      const selectedCourseId = this.selectedCourse();
      const reviewItems = await this.toReviewService.getReviewItems(selectedCourseId);
      
      const sortedItems = this.toReviewService.sortItemsByDueDate(reviewItems);
      
      this.allItems = sortedItems;

      const categorizedItems = this.toReviewService.categorizeReviewItems(sortedItems);
      this.workInProgressItems = categorizedItems.workInProgress;
      this.closedItems = categorizedItems.closed;
      this.noDueDateItems = categorizedItems.noDueDate;

      this.overallStats = this.toReviewService.getOverallStats(reviewItems);
      
    } catch (error) {
      this.workInProgressItems = [];
      this.closedItems = [];
      this.noDueDateItems = [];
      this.allItems = [];
      this.overallStats = {};
    } finally {
      this.isLoading = false;
    }
  }

  navigateToItem(item: ReviewItem): void {
    if (item.type === 'assignment') {
      this.router.navigate(['/courses', this.getCourseIdFromItem(item), 'assignment', item.id]);
    } else if (item.type === 'quiz') {
      this.router.navigate(['/courses', this.getCourseIdFromItem(item), 'quiz', item.id]);
    }
  }

  private getCourseIdFromItem(item: ReviewItem): string {
    const course = this.courses.find((c: any) => c.title === item.course);
    return course?.id || ''; 
  }
  refreshData(): void {
    this.loadReviewItems();
  }
}
