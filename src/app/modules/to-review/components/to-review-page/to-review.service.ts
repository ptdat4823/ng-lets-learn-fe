import { Injectable } from '@angular/core';
import { AssignmentTopic, QuizTopic, Topic, TopicType } from '@shared/models/topic';
import { Course } from '@shared/models/course';
import { ReviewItem, ReviewItemsCategories } from '../../constants/to-review.constants';
import { GetCourseWork } from '@modules/courses/api/courses.api';
import { GetTeacherCourses } from '@modules/courses/api/courses.api';
import { UserService } from '@shared/services/user.service';

@Injectable()
export class ToReviewService {
  constructor(private userService: UserService) {}

  async getReviewItems(courseId?: string): Promise<ReviewItem[]> {
    const user = this.userService.getUser();
    if (!user) throw new Error('User not found');

    let topics: Topic[] = [];
    if (courseId && courseId !== 'all') {
      topics = await GetCourseWork(courseId, null);
      return topics
        .filter(topic => topic.type === TopicType.ASSIGNMENT || topic.type === TopicType.QUIZ)
        .map(topic => this.convertTopicToReviewItem(topic));
    } else {
      // All courses for teacher
      const courses: Course[] = await GetTeacherCourses(user.id);
      let allTopics: Topic[] = [];
      for (const course of courses) {
        const courseTopics = await GetCourseWork(course.id, null);
        allTopics = allTopics.concat(courseTopics);
      }
      return allTopics
        .filter(topic => topic.type === TopicType.ASSIGNMENT || topic.type === TopicType.QUIZ)
        .map(topic => this.convertTopicToReviewItem(topic));
    }
  }

  private convertTopicToReviewItem(topic: Topic): ReviewItem {
    const courseTitle = topic.course?.title || 'Unknown Course';
    // For now, we do not have submission/graded counts from the topic API, so set to 0 or unknown
    return {
      id: topic.id,
      title: topic.title,
      course: courseTitle,
      type: topic.type,
      status: this.getTopicStatus(this.getTopicDueDate(topic)),
      graded: 0, // Needs backend support for real data
      submitted: 0, // Needs backend support for real data
      assigned: topic.course?.students?.length || 0,
      icon: topic.type === TopicType.ASSIGNMENT ? 'assignment' : 'quiz',
      topic: topic
    };
  }

  private getTopicDueDate(topic: Topic): string | null {
    if (topic.type === TopicType.ASSIGNMENT) {
      return (topic as AssignmentTopic).data.close;
    } else if (topic.type === TopicType.QUIZ) {
      return (topic as QuizTopic).data.close;
    }
    return null;
  }

  private getTopicStatus(closeDate: string | null): 'work-in-progress' | 'closed' | 'no-due-date' {
    if (!closeDate) return 'no-due-date';
    const now = new Date();
    const close = new Date(closeDate);
    return now > close ? 'closed' : 'work-in-progress';
  }

  categorizeReviewItems(items: ReviewItem[]): ReviewItemsCategories {
    return {
      workInProgress: items.filter(item => item.status === 'work-in-progress'),
      closed: items.filter(item => item.status === 'closed'),
      noDueDate: items.filter(item => item.status === 'no-due-date')
    };
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

  getOverallStats(items: ReviewItem[]) {
    const total = items.length;
    const workInProgress = items.filter(item => item.status === 'work-in-progress').length;
    const closed = items.filter(item => item.status === 'closed').length;
    const noDueDate = items.filter(item => item.status === 'no-due-date').length;
    const totalAssigned = items.reduce((sum, item) => sum + item.assigned, 0);
    const totalSubmitted = items.reduce((sum, item) => sum + item.submitted, 0);
    const totalGraded = items.reduce((sum, item) => sum + item.graded, 0);
    return {
      total,
      workInProgress,
      closed,
      noDueDate,
      totalAssigned,
      totalSubmitted,
      totalGraded,
      completionRate: totalAssigned > 0 ? (totalSubmitted / totalAssigned) * 100 : 0,
      gradingRate: totalSubmitted > 0 ? (totalGraded / totalSubmitted) * 100 : 0
    };
  }
}
