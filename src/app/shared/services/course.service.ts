import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Section } from '@shared/models/course';

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
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  createSection(request: CreateSectionRequest): Observable<CreateSectionResponse> {
    const section: Section = {
      id: Date.now().toString(),
      courseId: request.courseId,
      title: request.title || 'New Section',
      description: request.description || null,
      position: request.position || 1,
      topics: []
    };
    return of({
      section,
      success: true,
      message: 'Section created successfully'
    });
  }
  updateSection(sectionId: string, updates: Partial<Section>): Observable<CreateSectionResponse> {
    return of({
      section: { ...updates } as Section,
      success: true,
      message: 'Section updated successfully'
    });
  }
  deleteSection(sectionId: string): Observable<{ success: boolean; message: string }> {
    return of({
      success: true,
      message: 'Section deleted successfully'
    });
  }
  saveCourse(course: Course): Observable<UpdateCourseResponse> {
    return of({
      course,
      success: true,
      message: 'Course saved successfully'
    });
  }

  getCourseById(courseId: string): Observable<Course> {
    return of({} as Course);
  }

  getSectionsByCourse(courseId: string): Observable<Section[]> {
    return of([]);
  }

  updateCourseImage(request: UpdateCourseImageRequest): Observable<UpdateCourseImageResponse> {
    
    const imageUrl = request.imageUrl || (request.imageFile ? URL.createObjectURL(request.imageFile) : '');
    
    return of({
      imageUrl,
      success: true,
      message: 'Course image updated successfully'
    });
  }
}
