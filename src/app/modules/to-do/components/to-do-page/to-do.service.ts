import { Injectable } from '@angular/core';
import { mockTopics } from '@shared/mocks/topic';
import { mockCourses } from '@shared/mocks/course';
import { mockSections } from '@shared/mocks/section';
import { mockAssignmentResponses, mockStudentResponses } from '@shared/mocks/student-response';
import { AssignmentTopic, QuizTopic, Topic, TopicType } from '@shared/models/topic';
import { StudentResponse, AssignmentResponseData, QuizResponseData, QuizStatus } from '@shared/models/student-response';
import { Course } from '@shared/models/course';

export interface ToDoItem {
  id: string;
  title: string;
  course: string;
  type: string;
  status: 'assigned' | 'overdue' | 'done';
  dueDate: string | null;
  submitted: boolean;
  graded: boolean;
  icon: string;
  topic: Topic;
  dueDateFormatted?: string;
  dueStatus?: string;
}

export interface ToDoItemsCategories {
  assigned: ToDoItem[];
  overdue: ToDoItem[];
  done: ToDoItem[];
}

export interface ToDoItemsByDueDate {
  noDueDate: ToDoItem[];
  thisWeek: ToDoItem[];
  nextWeek: ToDoItem[];
  later: ToDoItem[];
}

@Injectable()
export class ToDoService {

  getToDoItems(courseId?: string): ToDoItem[] {
    const filteredTopics = courseId && courseId !== 'all' 
      ? this.getTopicsForCourse(courseId)
      : mockTopics.filter(topic => 
          topic.type === TopicType.ASSIGNMENT || topic.type === TopicType.QUIZ
        );

    return filteredTopics.map(topic => this.convertTopicToToDoItem(topic));
  }

  private getTopicsForCourse(courseId: string): Topic[] {
    const courseSections = mockSections.filter(section => section.courseId === courseId);
    const sectionIds = courseSections.map(section => section.id);
    
    return mockTopics.filter(topic => 
      sectionIds.includes(topic.sectionId) && 
      (topic.type === TopicType.ASSIGNMENT || topic.type === TopicType.QUIZ)
    );
  }

  private getCourseForTopic(topic: Topic): Course | null {
    const section = mockSections.find(section => section.id === topic.sectionId);
    if (!section) return null;
    
    return mockCourses.find(course => course.id === section.courseId) || null;
  }

  private convertTopicToToDoItem(topic: Topic): ToDoItem {
    const course = this.getCourseForTopic(topic);
    const courseTitle = course?.title || 'Unknown Course';
    
    if (topic.type === TopicType.ASSIGNMENT) {
      return this.convertAssignmentToToDoItem(topic as AssignmentTopic, courseTitle);
    } else if (topic.type === TopicType.QUIZ) {
      return this.convertQuizToToDoItem(topic as QuizTopic, courseTitle);
    }
    
    return {
      id: topic.id,
      title: topic.title,
      course: courseTitle,
      type: topic.type,
      status: 'assigned',
      dueDate: null,
      submitted: false,
      graded: false,
      icon: 'assignment',
      topic: topic
    };
  }  
  private convertAssignmentToToDoItem(topic: AssignmentTopic, courseTitle: string): ToDoItem {
    // Check if current user has submitted this assignment
    const userResponse = mockAssignmentResponses.find(r => r.topicId === topic.id && r.student.id === 'current-user');
    const isSubmitted = !!userResponse;
    const isGraded = userResponse && (userResponse.data as AssignmentResponseData).mark !== undefined;
    
    const status = this.getToDoStatus(topic.data.close, isSubmitted);
    const { dueDateFormatted, dueStatus } = this.formatDueDate(topic.data.close);
    
    return {
      id: topic.id,
      title: topic.title,
      course: courseTitle,
      type: 'assignment',
      status: status,
      dueDate: topic.data.close,
      submitted: isSubmitted,
      graded: !!isGraded,
      icon: 'assignment',
      topic: topic,
      dueDateFormatted,
      dueStatus
    };
  }

  private convertQuizToToDoItem(topic: QuizTopic, courseTitle: string): ToDoItem {
    // Check if current user has completed this quiz
    const userResponse = mockStudentResponses.find(r => r.topicId === topic.id && r.student.id === 'current-user');
    const isCompleted = userResponse && (userResponse.data as QuizResponseData).status === QuizStatus.FINISHED;
    
    const status = this.getToDoStatus(topic.data.close, !!isCompleted);
    const { dueDateFormatted, dueStatus } = this.formatDueDate(topic.data.close);
    
    return {
      id: topic.id,
      title: topic.title,
      course: courseTitle,
      type: 'quiz',
      status: status,
      dueDate: topic.data.close,
      submitted: !!isCompleted,
      graded: !!isCompleted, // Quizzes are auto-graded
      icon: 'quiz',
      topic: topic,
      dueDateFormatted,
      dueStatus
    };
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

    // Format the date
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    const dueDateFormatted = `Due ${due.toLocaleDateString('en-US', options)}`;

    // Determine status
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
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start of this week (Sunday)
    
    const endOfThisWeek = new Date(startOfWeek);
    endOfThisWeek.setDate(startOfWeek.getDate() + 6); // End of this week (Saturday)
    
    const endOfNextWeek = new Date(endOfThisWeek);
    endOfNextWeek.setDate(endOfThisWeek.getDate() + 7); // End of next week

    return {
      noDueDate: items.filter(item => !item.dueDate),
      thisWeek: items.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate >= now && dueDate <= endOfThisWeek;
      }),
      nextWeek: items.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate > endOfThisWeek && dueDate <= endOfNextWeek;
      }),
      later: items.filter(item => {
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
}
