import { Injectable } from '@angular/core';
// TODO: BACKEND INTEGRATION - Replace these mock imports with actual API service imports
import { mockTopics } from '@shared/mocks/topic';
import { mockCourses } from '@shared/mocks/course';
import { mockSections } from '@shared/mocks/section';
import { mockAssignmentResponses, mockStudentResponses } from '@shared/mocks/student-response';
import { AssignmentTopic, QuizTopic, Topic, TopicType } from '@shared/models/topic';
import { StudentResponse, AssignmentResponseData, QuizResponseData, QuizStatus } from '@shared/models/student-response';
import { Course } from '@shared/models/course';
import { ReviewItem, ReviewItemsCategories } from '../../constants/to-review.constants';

@Injectable()
export class ToReviewService {

  // TODO: BACKEND INTEGRATION - Replace with Promise.all() API calls:
  // For all courses: Promise.all([
  //   fetch('/course'), // Get instructor's courses
  //   ...courses.map(course => fetch(`/course/${course.id}/assignment-report`)),
  //   ...courses.map(course => fetch(`/course/${course.id}/quiz-report`))
  // ]) - Combine course list + multiple course reports
  // For specific course: Promise.all([
  //   fetch(`/course/${courseId}/assignment-report`),
  //   fetch(`/course/${courseId}/quiz-report`)
  // ])
  getReviewItems(courseId?: string): ReviewItem[] {
    const filteredTopics = courseId && courseId !== 'all' 
      ? this.getTopicsForCourse(courseId)
      : mockTopics.filter(topic => 
          topic.type === TopicType.ASSIGNMENT || topic.type === TopicType.QUIZ
        );    return filteredTopics.map(topic => this.convertTopicToReviewItem(topic));
  }  
  // TODO: BACKEND INTEGRATION - Replace with Promise.all() API calls:
  // Promise.all([
  //   fetch(`/course/${courseId}/assignment-report`),
  //   fetch(`/course/${courseId}/quiz-report`),
  //   fetch(`/course/${courseId}`) // For course information
  // ]) - Combine course reports + course information
  private getTopicsForCourse(courseId: string): Topic[] {
    const courseSections = mockSections.filter(section => section.courseId === courseId);
    const sectionIds = courseSections.map(section => section.id);
    
    return mockTopics.filter(topic => 
      sectionIds.includes(topic.sectionId) && 
      (topic.type === TopicType.ASSIGNMENT || topic.type === TopicType.QUIZ)    );
  }  
  // TODO: BACKEND INTEGRATION - Replace with Promise.all() API calls:
  // Promise.all([
  //   fetch(`/course/${courseId}/topic/${topicId}`),
  //   fetch(`/course/${courseId}`),
  //   fetch(`/section/${sectionId}`)
  // ]) - Combine topic + course + section data
  private getCourseForTopic(topic: Topic): Course | null {
    const section = mockSections.find(section => section.id === topic.sectionId);
    if (!section) return null;

    return mockCourses.find(course => course.id === section.courseId) || null;
  }

  // TODO: BACKEND INTEGRATION - This conversion should not be needed if backend returns ReviewItem directly
  // GET /course/{courseId}/assignment-report and GET /course/{courseId}/quiz-report should return ReviewItem[]
  private convertTopicToReviewItem(topic: Topic): ReviewItem {
    const course = this.getCourseForTopic(topic);
    const courseTitle = course?.title || 'Unknown Course';
    
    if (topic.type === TopicType.ASSIGNMENT) {
      return this.convertAssignmentToReviewItem(topic as AssignmentTopic, courseTitle);
    } else if (topic.type === TopicType.QUIZ) {
      return this.convertQuizToReviewItem(topic as QuizTopic, courseTitle);
    }
    
    return {
      id: topic.id,
      title: topic.title,
      course: courseTitle,
      type: topic.type,
      status: this.getTopicStatus(null),
      graded: 0,
      submitted: 0,
      assigned: 0,
      icon: 'assignment',
      topic: topic    };
  }  
  // TODO: BACKEND INTEGRATION - Replace with Promise.all() API calls:
  // Promise.all([
  //   fetch(`/course/${courseId}/topic/${topicId}/assignment-report`),
  //   fetch(`/topic/${topicId}/assignment-response`),
  //   fetch(`/course/${courseId}`) // For course title and enrollment data
  // ]) - Get single assignment report + course information
  private convertAssignmentToReviewItem(topic: AssignmentTopic, courseTitle: string): ReviewItem {
    // TODO: Replace with backend API call to get assignment submission statistics
    // GET /topic/{topicId}/assignment-response (get all responses for this assignment)
    const responses = mockAssignmentResponses.filter((r: StudentResponse) => r.topicId === topic.id);
    const gradedCount = responses.filter((r: StudentResponse) => {
      const data = r.data as AssignmentResponseData;
      return data.mark !== undefined && data.mark !== null;
    }).length;
    
    const totalStudents = this.calculateTotalStudentsForTopic(topic.id);
    
    return {
      id: topic.id,
      title: topic.title,
      course: courseTitle,
      type: 'assignment',
      status: this.getTopicStatus(topic.data.close),
      graded: gradedCount,
      submitted: responses.length,
      assigned: totalStudents,
      icon: 'assignment',
      topic: topic
    };  }
  
  // TODO: BACKEND INTEGRATION - Replace with Promise.all() API calls:
  // Promise.all([
  //   fetch(`/course/${courseId}/topic/${topicId}/quiz-report`),
  //   fetch(`/topic/${topicId}/quiz-response`),
  //   fetch(`/course/${courseId}`) // For course title and enrollment data
  // ]) - Get single quiz report + course information
  private convertQuizToReviewItem(topic: QuizTopic, courseTitle: string): ReviewItem {
    // TODO: Replace with backend API call to get quiz attempt statistics
    // GET /topic/{topicId}/quiz-response (get all responses for this quiz)
    const responses = mockStudentResponses.filter((r: StudentResponse) => r.topicId === topic.id);
    const finishedResponses = responses.filter((r: StudentResponse) => {
      const data = r.data as QuizResponseData;
      return data.status === QuizStatus.FINISHED;
    });
    
    const totalStudents = this.calculateTotalStudentsForTopic(topic.id);
    
    return {
      id: topic.id,
      title: topic.title,
      course: courseTitle,
      type: 'quiz',
      status: this.getTopicStatus(topic.data.close),
      graded: finishedResponses.length, 
      submitted: 0, 
      assigned: totalStudents,
      attempted: responses.length,
      icon: 'quiz',
      topic: topic
    };
  }  
  // TODO: BACKEND INTEGRATION - Replace with Promise.all() API calls:
  // Promise.all([
  //   fetch(`/course/${courseId}/topic/${topicId}`),
  //   fetch(`/course/${courseId}`) // For enrollment data
  // ]) - Get topic + course enrollment data
  private calculateTotalStudentsForTopic(topicId: string): number {
    const topic = mockTopics.find(t => t.id === topicId);
    if (!topic) return 40;
    
    const course = this.getCourseForTopic(topic);
    if (course && course.students) {
      return course.students.length;
    }

    return 40;
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
      noDueDate: items.filter(item => item.status === 'no-due-date')    };
  }

  sortItemsByDueDate(items: ReviewItem[]): ReviewItem[] {
    return items.sort((a, b) => {
      const dateA = this.getTopicDueDate(a.topic);
      const dateB = this.getTopicDueDate(b.topic);
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      return new Date(dateA).getTime() - new Date(dateB).getTime();    });
  }

  private getTopicDueDate(topic: Topic): string | null {
    if (topic.type === TopicType.ASSIGNMENT) {
      return (topic as AssignmentTopic).data.close;
    } else if (topic.type === TopicType.QUIZ) {
      return (topic as QuizTopic).data.close;
    }    return null;
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
