import { Injectable } from '@angular/core';
import { ReportService } from '@shared/services/report.service';
import { ReviewItem, ReviewItemsCategories } from '../../constants/to-review.constants';

@Injectable()
export class ToReviewService {

  constructor(private reportService: ReportService) {}

  async getReviewItems(courseId?: string): Promise<ReviewItem[]> {
    return await this.reportService.getReviewItems(courseId);
  }

  categorizeReviewItems(items: ReviewItem[]): ReviewItemsCategories {
    return this.reportService.categorizeReviewItems(items);
  }

  sortItemsByDueDate(items: ReviewItem[]): ReviewItem[] {
    return items.sort((a, b) => {
      const dateA = this.getTopicDueDate(a.topic);
      const dateB = this.getTopicDueDate(b.topic);
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
  }

  private getTopicDueDate(topic: any): string | null {
    if (topic?.dueDate) {
      return topic.dueDate;
    }
    if (topic?.data?.close) {
      return topic.data.close;
    }
    return null;
  }

  getOverallStats(items: ReviewItem[]) {
    const reportStats = this.reportService.getOverallReviewStats(items);
    
    const total = items.length;
    const workInProgress = items.filter(item => item.status === 'work-in-progress').length;
    const closed = items.filter(item => item.status === 'closed').length;
    const noDueDate = items.filter(item => item.status === 'no-due-date').length;
    
    return {
      ...reportStats,
      total,
      workInProgress,
      closed,
      noDueDate,
      completionRate: reportStats.totalAssigned > 0 ? (reportStats.totalSubmitted / reportStats.totalAssigned) * 100 : 0,
      gradingRate: reportStats.totalSubmitted > 0 ? (reportStats.totalGraded / reportStats.totalSubmitted) * 100 : 0
    };
  }
}
