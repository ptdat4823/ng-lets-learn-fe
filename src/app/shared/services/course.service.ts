import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Section } from '@shared/models/course';
import { generateId } from '@shared/helper/string.helper';
import { Topic } from '@shared/models/topic';
import { ToastrService } from 'ngx-toastr';
import { 
  CreateCourse, 
  GetCourseById, 
  GetPublicCourses, 
  GetTeacherCourses, 
  GetUserCourses,
  UpdateCourse, 
  JoinCourse,
  GetCourseWork,
  GetCourseAssignmentReport,
  GetCourseQuizReport,
  GetCourseReports
} from '@modules/courses/api/courses.api';
import { INewCourseFormData } from '@modules/courses/components/new-course/new-course-form/new-course-form.config';
import { UserService } from './user.service';

export interface CreateSectionRequest {
  courseId: string;
  title?: string;
  description?: string;
  position?: number;
}

export interface CreateSectionResponse {
  section: Section;
  success: boolean;
  message: string;
}

export interface UpdateCourseResponse {
  course: Course;
  success: boolean;
  message: string;
}

export interface UpdateCourseImageRequest {
  courseId: string;
  imageFile?: File;
  imageUrl?: string;
}

export interface UpdateCourseImageResponse {
  imageUrl: string;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private toastService: ToastrService,
    private userService: UserService
  ) {}

  createCourse(newCourseFormData: INewCourseFormData) {
    return CreateCourse(newCourseFormData)
      .then((course) => {
        this.toastService.success('Course created successfully');
        return course;
      })
      .catch((error) => {
        this.toastService.error(error.message);
        throw error;
      });
  }

  getCourseById(courseId: string) {
    return GetCourseById(courseId)
      .then((course) => {
        return course;
      })
      .catch((error) => {
        this.toastService.error('Failed to load course');
        throw error;
      });
  }

  getPublicCourses() {
    return GetPublicCourses()
      .then((courses) => {
        return courses;
      })
      .catch((error) => {
        this.toastService.error('Failed to load courses');
        throw error;
      });
  }

  getTeacherCourses(userId: string) {
    return GetTeacherCourses(userId)
      .then((courses) => {
        return courses;
      })
      .catch((error) => {
        this.toastService.error('Failed to load teacher courses');
        throw error;
      });
  }

  updateCourse(course: Course) {
    return UpdateCourse(course)
      .then((updatedCourse) => {
        this.toastService.success('Course updated successfully');
        return updatedCourse;
      })
      .catch((error) => {
        this.toastService.error(error.message);
        throw error;
      });
  }

  joinCourse(courseId: string) {
    return JoinCourse(courseId)
      .then(() => {
        this.toastService.success('Successfully joined course');
      })
      .catch((error) => {
        this.toastService.error(error.message);
        throw error;
      });
  }

  getCourseWork(courseId: string, type?: 'quiz' | 'assignment' | 'meeting') {
    return GetCourseWork(courseId, type || null)
      .then((topics) => {
        return topics;
      })
      .catch((error) => {
        this.toastService.error('Failed to load course work');
        throw error;
      });
  }

  // Course Report Methods for to-review service
  getCourseAssignmentReport(courseId: string) {
    return GetCourseAssignmentReport(courseId)
      .then((report) => {
        return report;
      })
      .catch((error) => {
        this.toastService.error('Failed to load assignment report');
        throw error;
      });
  }

  getCourseQuizReport(courseId: string) {
    return GetCourseQuizReport(courseId)
      .then((report) => {
        return report;
      })
      .catch((error) => {
        this.toastService.error('Failed to load quiz report');
        throw error;
      });
  }

  getCourseReports(courseId: string) {
    return GetCourseReports(courseId)
      .then((reports) => {
        return reports;
      })
      .catch((error) => {
        this.toastService.error('Failed to load course reports');
        throw error;
      });
  }

  getUserCourses(): Promise<Course[]> {
    const user = this.userService.getUser();
    if (!user) {
      return Promise.reject(new Error('User not found'));
    }
    return GetUserCourses(user.id)
      .then((courses) => {
        return courses;
      })
      .catch((error) => {
        this.toastService.error('Failed to load user courses');
        throw error;
      });
  }

  updateSectionListByUpdatingSection(
    course: Course,
    section: Section
  ): Section[] {
    const updatedSections = course.sections.map((s) =>
      s.id === section.id ? section : s
    );
    return updatedSections;
  }

  updateSectionListByDeletingSection(
    course: Course,
    sectionId: string
  ): Section[] {
    const updatedSections = course.sections.filter((s) => s.id !== sectionId);
    return updatedSections;
  }

  getNewSection(course: Course): Section {
    return {
      id: generateId(4),
      courseId: course.id,
      title: 'New Section',
      description: '',
      position: course.sections.length + 1,
      topics: [],
    };
  }

  updateSectionByAddingTopic(section: Section, topic: Topic) {
    const updatedSection: Section = {
      ...section,
      topics: [...section.topics, topic],
    };
    return updatedSection;
  }

  updateSectionByUpdatingTopic(section: Section, topic: Topic): Section {
    const updatedTopics = section.topics.map((t) =>
      t.id === topic.id ? topic : t
    );
    return {
      ...section,
      topics: updatedTopics,
    };
  }

  updateSectionByDeletingTopic(section: Section, topicId: string): Section {
    const updatedTopics = section.topics.filter((t) => t.id !== topicId);
    return {
      ...section,
      topics: updatedTopics,
    };
  }

  updateCourseImage(
    request: UpdateCourseImageRequest
  ): Observable<UpdateCourseImageResponse> {
    const imageUrl =
      request.imageUrl ||
      (request.imageFile ? URL.createObjectURL(request.imageFile) : '');

    return of({
      imageUrl,
      success: true,
      message: 'Course image updated successfully',
    });
  }
}
