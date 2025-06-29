import { Injectable } from '@angular/core';
import { AssignmentTopic, QuizTopic, Topic, TopicType } from '@shared/models/topic';
import { Course } from '@shared/models/course';
import { ToDoItem, ToDoItemsCategories, ToDoItemsByDueDate, DoneItemsByCompletion, OverdueItemsByTime } from '../../constants/to-do.constants';
import { GetCourseWork, GetPublicCourses, GetTeacherCourses } from '@modules/courses/api/courses.api';
import { UserService } from '@shared/services/user.service';

@Injectable()
export class ToDoService {
  constructor(private userService: UserService) {}

  async getToDoItems(courseId?: string): Promise<ToDoItem[]> {
    const user = this.userService.getUser();
    if (!user) throw new Error('User not found');

    let topics: Topic[] = [];
    if (courseId && courseId !== 'all') {
      topics = await GetCourseWork(courseId, null);
      return topics
        .filter(topic => topic.type === TopicType.ASSIGNMENT || topic.type === TopicType.QUIZ)
        .map(topic => this.convertTopicToToDoItem(topic));
    } else {
      // All courses for student
      const allCourses: Course[] = await GetPublicCourses();
      const courses: Course[] = allCourses.filter((course: Course) =>
        Array.isArray(course.students) && course.students.some((student: any) => student.id === user.id)
      );
      let allTopics: Topic[] = [];
      for (const course of courses) {
        const courseTopics = await GetCourseWork(course.id, null);
        // Attach course info to each topic
        courseTopics.forEach(topic => {
          topic.course = {
            id: course.id,
            title: course.title,
            description: course.description || '',
            imageUrl: course.imageUrl || '',
            price: course.price || 0,
            category: course.category || '',
            level: course.level || '',
            students: course.students || [],
            creator: course.creator || { id: '', username: '', email: '', password: '', avatar: '', role: undefined, courses: [] },
            sections: course.sections || [],
            isPublished: course.isPublished || false
          };
        });
        allTopics = allTopics.concat(courseTopics);
      }
      return allTopics
        .filter(topic => topic.type === TopicType.ASSIGNMENT || topic.type === TopicType.QUIZ)
        .map(topic => this.convertTopicToToDoItem(topic));
    }
  }

  private convertTopicToToDoItem(topic: Topic): ToDoItem {
    const courseTitle = topic.course?.title || 'Unknown Course';
    const courseId = topic.course?.id || '';
    const dueDate = this.getTopicDueDate(topic);
    const status = this.getToDoStatus(dueDate, false); // No submission info from API
    const { dueDateFormatted, dueStatus } = this.formatDueDate(dueDate);
    return {
      id: topic.id,
      title: topic.title,
      course: courseTitle,
      courseId: courseId,
      type: topic.type,
      status: status,
      dueDate: dueDate,
      submitted: false, // No submission info from API
      graded: false, // No grading info from API
      icon: topic.type === TopicType.ASSIGNMENT ? 'assignment' : 'quiz',
      topic: topic,
      dueDateFormatted,
      dueStatus
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

  private getToDoStatus(dueDate: string | null, isCompleted: boolean): 'assigned' | 'overdue' | 'done' {
    if (isCompleted) return 'done';
    if (!dueDate) return 'assigned';
    const now = new Date();
    const due = new Date(dueDate);
    return now > due ? 'overdue' : 'assigned';
  }

  private formatDueDate(dueDate: string | null): { dueDateFormatted: string; dueStatus: string } {
    if (!dueDate) {
      return { dueDateFormatted: '', dueStatus: '' };
    }
    const due = new Date(dueDate);
    const now = new Date();
    const timeDiff = due.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const dueDateFormatted = `Due ${due.toLocaleDateString('en-US', options)}`;
    let dueStatus = '';
    if (daysDiff < 0) {
      dueStatus = `(${Math.abs(daysDiff)} day${Math.abs(daysDiff) !== 1 ? 's' : ''} late)`;
    } else if (daysDiff === 0) {
      dueStatus = '(Due today)';
    } else if (daysDiff === 1) {
      dueStatus = '(1 day left)';
    } else {
      dueStatus = `(${daysDiff} days left)`;
    }
    return { dueDateFormatted, dueStatus };
  }

  categorizeToDoItems(items: ToDoItem[]): ToDoItemsCategories {
    return {
      assigned: items.filter(item => item.status === 'assigned'),
      overdue: items.filter(item => item.status === 'overdue'),
      done: items.filter(item => item.status === 'done')
    };
  }

  categorizeByDueDate(items: ToDoItem[]): ToDoItemsByDueDate {
    const assignedItems = items.filter(item => item.status === 'assigned');
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfThisWeek = new Date(startOfWeek);
    endOfThisWeek.setDate(startOfWeek.getDate() + 6);
    const endOfNextWeek = new Date(endOfThisWeek);
    endOfNextWeek.setDate(endOfThisWeek.getDate() + 7);
    return {
      noDueDate: assignedItems.filter(item => !item.dueDate),
      thisWeek: assignedItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate >= now && dueDate <= endOfThisWeek;
      }),
      nextWeek: assignedItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate > endOfThisWeek && dueDate <= endOfNextWeek;
      }),
      later: assignedItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate > endOfNextWeek;
      })
    };
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
    const doneItems = items.filter(item => item.status === 'done');
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
    return {
      noDueDate: doneItems.filter(item => !item.dueDate),
      completeEarly: doneItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate > now;
      }),
      thisWeek: doneItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate >= startOfThisWeek && dueDate <= endOfThisWeek;
      }),
      lastWeek: doneItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate >= startOfLastWeek && dueDate <= endOfLastWeek;
      }),
      sooner: doneItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate < startOfLastWeek;
      })
    };
  }

  categorizeOverdueItems(items: ToDoItem[]): OverdueItemsByTime {
    const overdueItems = items.filter(item => item.status === 'overdue');
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
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
        endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);
        return dueDate >= startOfLastWeek && dueDate <= endOfLastWeek;
      }),
      sooner: overdueItems.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate < startOfLastWeek;
      })
    };
  }
}
