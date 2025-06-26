import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Role } from '@shared/models/user';
import { ToDoItem, ToDoItemsCategories, ToDoItemsByDueDate } from '@modules/to-do/constants/to-do.constants';
import { ReviewItem, ReviewItemsCategories } from '@modules/to-review/constants/to-review.constants';
import { GetCourseReports } from '@shared/api/report.api';
import { GetTeacherCourses, GetPublicCourses } from '@modules/courses/api/courses.api';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(
    private toastService: ToastrService,
    private userService: UserService
  ) {}

  // ===========================================
  // TO-DO SERVICE METHODS (Student Perspective)
  // ===========================================

  getToDoItems(courseId?: string): Promise<ToDoItem[]> {
    const user = this.userService.getUser();
    if (!user) {
      return Promise.reject(new Error('User not found'));
    }

    if (courseId && courseId !== 'all') {
      return this.getToDoItemsForCourse(courseId);
    } else {
      return this.getToDoItemsForAllCourses();
    }
  }

  private getToDoItemsForCourse(courseId: string): Promise<ToDoItem[]> {
    return GetCourseReports(courseId)
      .then(({ assignmentReport, quizReport }) => {
        return this.convertReportsToToDoItems(assignmentReport, quizReport);
      })
      .catch((error) => {
        this.toastService.error('Failed to load to-do items for course');
        throw error;
      });
  }

  private async getToDoItemsForAllCourses(): Promise<ToDoItem[]> {
    try {
      console.log('ReportService: Loading courses for to-do items...');
      const user = this.userService.getUser();
      if (!user) {
        throw new Error('User not found');
      }

      let courses: any[] = [];
      if (user.role === Role.TEACHER) {
        courses = await GetTeacherCourses(user.id);
      } else {
        courses = await GetPublicCourses();
        courses = courses.filter((course: any) => 
          course.students?.some((student: any) => student.id === user.id)
        );
      }
      
      if (!courses || courses.length === 0) {
        console.warn('ReportService: No courses found for user');
        return [];
      }

      const allReports = await Promise.all(
        courses.map((course: any) => 
          GetCourseReports(course.id)
            .then((reports: any) => {
              console.log(`ReportService: Reports for course ${course.title}:`, reports);
              return { courseName: course.title, ...reports };
            })
            .catch((error: any) => {
              console.error(`ReportService: Failed to load reports for course ${course.title}:`, error);
              return { 
                courseName: course.title, 
                assignmentReport: { assignments: [] }, 
                quizReport: { quizzes: [] } 
              };
            })
        )
      );

      const toDoItems = allReports.flatMap(({ courseName, assignmentReport, quizReport }: any) => 
        this.convertReportsToToDoItems(assignmentReport, quizReport, courseName)
      );
      
      console.log('ReportService: Generated to-do items:', toDoItems);
      return toDoItems;
    } catch (error) {
      console.error('ReportService: Error in getToDoItemsForAllCourses:', error);
      this.toastService.error('Failed to load to-do items');
      throw error;
    }
  }

  private convertReportsToToDoItems(
    assignmentReport: any, 
    quizReport: any, 
    courseName?: string
  ): ToDoItem[] {
    const user = this.userService.getUser()!;
    const toDoItems: ToDoItem[] = [];

    try {
      // Process assignments
      if (assignmentReport?.assignments) {
        assignmentReport.assignments.forEach((assignment: any) => {
          try {
            const userSubmission = assignment.submissions?.find((s: any) => s.studentId === user.id);
            const isSubmitted = !!userSubmission;
            const isGraded = userSubmission?.isGraded || false;
            
            toDoItems.push({
              id: assignment.topicId || assignment.id,
              title: assignment.title || 'Untitled Assignment',
              course: courseName || assignmentReport.courseName || 'Unknown Course',
              type: 'assignment',
              status: this.getToDoStatus(assignment.dueDate, isSubmitted),
              dueDate: assignment.dueDate,
              submitted: isSubmitted,
              graded: isGraded,
              icon: 'assignment',
              topic: assignment,
              ...this.formatDueDate(assignment.dueDate)
            });
          } catch (error) {
            console.error('Error processing assignment:', assignment, error);
          }
        });
      }

      // Process quizzes
      if (quizReport?.quizzes) {
        quizReport.quizzes.forEach((quiz: any) => {
          try {
            const userAttempt = quiz.attempts?.find((a: any) => a.studentId === user.id);
            const isCompleted = userAttempt?.status === 'FINISHED';
            
            toDoItems.push({
              id: quiz.topicId || quiz.id,
              title: quiz.title || 'Untitled Quiz',
              course: courseName || quizReport.courseName || 'Unknown Course',
              type: 'quiz',
              status: this.getToDoStatus(quiz.dueDate, isCompleted),
              dueDate: quiz.dueDate,
              submitted: isCompleted,
              graded: isCompleted, // For quizzes, completed = graded
              icon: 'quiz',
              topic: quiz,
              ...this.formatDueDate(quiz.dueDate)
            });
          } catch (error) {
            console.error('Error processing quiz:', quiz, error);
          }
        });
      }
    } catch (error) {
      console.error('Error converting reports to to-do items:', error);
    }

    return toDoItems;
  }

  categorizeToDoItems(items: ToDoItem[]): ToDoItemsCategories {
    return {
      assigned: items.filter(item => item.status === 'assigned'),
      overdue: items.filter(item => item.status === 'overdue'),
      done: items.filter(item => item.status === 'done')
    };
  }

  categorizeToDoByDueDate(items: ToDoItem[]): ToDoItemsByDueDate {
    const now = new Date();
    const thisWeekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextWeekEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    return {
      noDueDate: items.filter(item => !item.dueDate),
      thisWeek: items.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate >= now && dueDate <= thisWeekEnd;
      }),
      nextWeek: items.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate > thisWeekEnd && dueDate <= nextWeekEnd;
      }),
      later: items.filter(item => {
        if (!item.dueDate) return false;
        const dueDate = new Date(item.dueDate);
        return dueDate > nextWeekEnd;
      })
    };
  }

  // =============================================
  // TO-REVIEW SERVICE METHODS (Teacher Perspective)
  // =============================================

  getReviewItems(courseId?: string): Promise<ReviewItem[]> {
    const user = this.userService.getUser();
    if (!user || user.role !== Role.TEACHER) {
      return Promise.reject(new Error('Only teachers can access review items'));
    }

    if (courseId && courseId !== 'all') {
      return this.getReviewItemsForCourse(courseId);
    } else {
      return this.getReviewItemsForAllCourses();
    }
  }

  private getReviewItemsForCourse(courseId: string): Promise<ReviewItem[]> {
    return GetCourseReports(courseId)
      .then(({ assignmentReport, quizReport }: any) => {
        return this.convertReportsToReviewItems(assignmentReport, quizReport);
      })
      .catch((error: any) => {
        this.toastService.error('Failed to load review items for course');
        throw error;
      });
  }

  private async getReviewItemsForAllCourses(): Promise<ReviewItem[]> {
    try {
      console.log('ReportService: Loading teacher courses for review items...');
      const user = this.userService.getUser()!;
      const courses = await GetTeacherCourses(user.id);
      console.log('ReportService: Loaded teacher courses:', courses);
      
      if (!courses || courses.length === 0) {
        console.warn('ReportService: No courses found for teacher');
        return [];
      }

      console.log('ReportService: Loading course reports for review...');
      const allReports = await Promise.all(
        courses.map((course: any) => 
          GetCourseReports(course.id)
            .then((reports: any) => {
              console.log(`ReportService: Review reports for course ${course.title}:`, reports);
              return { courseName: course.title, ...reports };
            })
            .catch((error: any) => {
              console.error(`ReportService: Failed to load review reports for course ${course.title}:`, error);
              return { 
                courseName: course.title, 
                assignmentReport: { assignments: [] }, 
                quizReport: { quizzes: [] } 
              };
            })
        )
      );

      const reviewItems = allReports.flatMap(({ courseName, assignmentReport, quizReport }: any) => 
        this.convertReportsToReviewItems(assignmentReport, quizReport, courseName)
      );
      
      console.log('ReportService: Generated review items:', reviewItems);
      return reviewItems;
    } catch (error) {
      console.error('ReportService: Error in getReviewItemsForAllCourses:', error);
      this.toastService.error('Failed to load review items');
      throw error;
    }
  }

  private convertReportsToReviewItems(
    assignmentReport: any, 
    quizReport: any, 
    courseName?: string
  ): ReviewItem[] {
    const reviewItems: ReviewItem[] = [];

    try {
      // Convert assignments
      if (assignmentReport?.assignments) {
        assignmentReport.assignments.forEach((assignment: any) => {
          try {
            reviewItems.push({
              id: assignment.topicId || assignment.id,
              title: assignment.title || 'Untitled Assignment',
              course: courseName || assignmentReport.courseName || 'Unknown Course',
              type: 'assignment',
              status: this.getReviewStatus(assignment.dueDate),
              assigned: assignment.totalStudents || 0,
              submitted: assignment.submittedStudents || 0,
              graded: assignment.gradedStudents || 0,
              icon: 'assignment',
              topic: assignment
            });
          } catch (error) {
            console.error('Error processing assignment for review:', assignment, error);
          }
        });
      }

      // Convert quizzes
      if (quizReport?.quizzes) {
        quizReport.quizzes.forEach((quiz: any) => {
          try {
            reviewItems.push({
              id: quiz.topicId || quiz.id,
              title: quiz.title || 'Untitled Quiz',
              course: courseName || quizReport.courseName || 'Unknown Course',
              type: 'quiz',
              status: this.getReviewStatus(quiz.dueDate),
              assigned: quiz.totalStudents || 0,
              submitted: quiz.attemptedStudents || 0, // For quizzes: attempted = submitted
              attempted: quiz.attemptedStudents || 0,
              graded: quiz.completedStudents || 0,   // For quizzes: completed = graded
              icon: 'quiz',
              topic: quiz
            });
          } catch (error) {
            console.error('Error processing quiz for review:', quiz, error);
          }
        });
      }
    } catch (error) {
      console.error('Error converting reports to review items:', error);
    }

    return reviewItems;
  }

  categorizeReviewItems(items: ReviewItem[]): ReviewItemsCategories {
    return {
      workInProgress: items.filter(item => item.status === 'work-in-progress'),
      closed: items.filter(item => item.status === 'closed'),
      noDueDate: items.filter(item => item.status === 'no-due-date')
    };
  }

  getOverallReviewStats(items: ReviewItem[]) {
    const totalAssigned = items.reduce((sum, item) => sum + item.assigned, 0);
    const totalSubmitted = items.reduce((sum, item) => sum + (item.submitted || 0), 0);
    const totalGraded = items.reduce((sum, item) => sum + item.graded, 0);
    const totalAttempted = items.reduce((sum, item) => sum + (item.attempted || 0), 0);

    return {
      totalAssigned,
      totalSubmitted,
      totalGraded,
      totalAttempted,
      pendingGrading: totalSubmitted - totalGraded
    };
  }

  // ===========================================
  // SHARED UTILITY METHODS
  // ===========================================

  private getToDoStatus(dueDate: string | null, isCompleted: boolean): 'assigned' | 'overdue' | 'done' {
    if (isCompleted) return 'done';
    if (!dueDate) return 'assigned';
    
    const now = new Date();
    const due = new Date(dueDate);
    return now > due ? 'overdue' : 'assigned';
  }

  private getReviewStatus(dueDate: string | null): 'work-in-progress' | 'closed' | 'no-due-date' {
    if (!dueDate) return 'no-due-date';
    const now = new Date();
    const due = new Date(dueDate);
    return now > due ? 'closed' : 'work-in-progress';
  }

  private formatDueDate(dueDate: string | null): { dueDateFormatted: string; dueStatus: string } {
    if (!dueDate) {
      return { dueDateFormatted: 'No due date', dueStatus: 'no-due-date' };
    }

    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let dueDateFormatted = due.toLocaleDateString();
    let dueStatus = 'upcoming';

    if (diffDays < 0) {
      dueStatus = 'overdue';
      dueDateFormatted = `Overdue by ${Math.abs(diffDays)} day(s)`;
    } else if (diffDays === 0) {
      dueStatus = 'today';
      dueDateFormatted = 'Due today';
    } else if (diffDays === 1) {
      dueStatus = 'tomorrow';
      dueDateFormatted = 'Due tomorrow';
    } else if (diffDays <= 7) {
      dueStatus = 'this-week';
      dueDateFormatted = `Due in ${diffDays} day(s)`;
    }

    return { dueDateFormatted, dueStatus };
  }
}
