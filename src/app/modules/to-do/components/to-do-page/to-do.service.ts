import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '@shared/services/report.service';
import { 
  ToDoItem, 
  ToDoItemsCategories, 
  ToDoItemsByDueDate, 
  DoneItemsByCompletion,
  OverdueItemsByTime 
} from '../../constants/to-do.constants';



@Injectable()
export class ToDoService {
  constructor(
    private reportService: ReportService,
    private router: Router
  ) {}

  async getToDoItems(courseId?: string): Promise<ToDoItem[]> {
    return await this.reportService.getToDoItems(courseId);
  }

  categorizeToDoItems(items: ToDoItem[]): ToDoItemsCategories {
    return this.reportService.categorizeToDoItems(items);
  }

  categorizeByDueDate(items: ToDoItem[]): ToDoItemsByDueDate {
    return this.reportService.categorizeToDoByDueDate(items);
  }

  sortItemsByDueDate(items: ToDoItem[]): ToDoItem[] {
    return items.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }
  
  getOverallStats(items: ToDoItem[]) {
    const total = items.length;
    const assigned = items.filter(item => item.status === 'assigned').length;
    const overdue = items.filter(item => item.status === 'overdue').length;
    const done = items.filter(item => item.status === 'done').length;
    
    return {
      total,
      assigned,
      overdue,
      done,      
      completionRate: total > 0 ? (done / total) * 100 : 0
    };
  }

  categorizeDoneItems(items: ToDoItem[]): DoneItemsByCompletion {
    // Filter only done items
    const doneItems = items.filter(item => item.status === 'done');
    
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay()); // Start of this week (Sunday)
    
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7); // Start of last week
    
    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setDate(startOfThisWeek.getDate() - 1); // End of last week (Saturday)
    
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6); // End of this week (Saturday)

    return {
      noDueDate: doneItems.filter(item => !item.dueDate),
      completeEarly: doneItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        // Completed early means the due date is in the future
        return dueDate > now;
      }),
      thisWeek: doneItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        // Due this week but completed
        return dueDate >= startOfThisWeek && dueDate <= endOfThisWeek;
      }),
      lastWeek: doneItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        // Due last week but completed
        return dueDate >= startOfLastWeek && dueDate <= endOfLastWeek;
      }),      sooner: doneItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        // Due before last week but completed
        return dueDate < startOfLastWeek;
      })
    };
  }

  categorizeOverdueItems(items: ToDoItem[]): OverdueItemsByTime {
    // Filter only overdue items
    const overdueItems = items.filter(item => item.status === 'overdue');
    
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay()); // Start of this week (Sunday)
    
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7); // Start of last week
    
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6); // End of this week (Saturday)

    return {
      thisWeek: overdueItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate >= startOfThisWeek && dueDate <= endOfThisWeek;
      }),
      lastWeek: overdueItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        const endOfLastWeek = new Date(startOfThisWeek);
        endOfLastWeek.setDate(startOfThisWeek.getDate() - 1); // End of last week (Saturday)
        return dueDate >= startOfLastWeek && dueDate <= endOfLastWeek;
      }),
      sooner: overdueItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate < startOfLastWeek;
      })
    };
  }

  getCourseIdFromItem(item: ToDoItem): string {
    // Try to extract course ID from item.id or use a fallback
    if (item.id) {
      const parts = item.id.split('-');
      if (parts.length >= 2 && parts[0] === 'course') {
        return parts[1];
      }
      // Try to extract from the first part of the ID
      return parts[0] || '1';
    }
    return '1'; // fallback course ID
  }

  navigateToItem(item: ToDoItem): void {
    if (item.type === 'assignment') {
      this.router.navigate(['/courses', this.getCourseIdFromItem(item), 'assignment', item.id]);
    } else if (item.type === 'quiz') {
      this.router.navigate(['/courses', this.getCourseIdFromItem(item), 'quiz', item.id]);
    }
  }
}
