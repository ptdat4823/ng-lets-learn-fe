import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Section } from '@shared/models/course';
import { generateId } from '@shared/helper/string.helper';
import { Topic } from '@shared/models/topic';

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
  constructor() {}

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

  createSection(
    request: CreateSectionRequest
  ): Observable<CreateSectionResponse> {
    const section: Section = {
      id: Date.now().toString(),
      courseId: request.courseId,
      title: request.title || 'New Section',
      description: request.description || null,
      position: request.position || 1,
      topics: [],
    };
    return of({
      section,
      success: true,
      message: 'Section created successfully',
    });
  }
  updateSection(
    sectionId: string,
    updates: Partial<Section>
  ): Observable<CreateSectionResponse> {
    return of({
      section: { ...updates } as Section,
      success: true,
      message: 'Section updated successfully',
    });
  }
  deleteSection(
    sectionId: string
  ): Observable<{ success: boolean; message: string }> {
    return of({
      success: true,
      message: 'Section deleted successfully',
    });
  }

  getCourseById(courseId: string): Observable<Course> {
    return of({} as Course);
  }

  getSectionsByCourse(courseId: string): Observable<Section[]> {
    return of([]);
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
