import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Topic, TopicType, TopicTypeOption, getTopicTypeOptions } from '@shared/models/topic';
import { AssignmentData, FileSizeOption } from '@shared/models/assignment';
import { QuizData, TimeLimitType, GradingMethod } from '@shared/models/quiz';
import { LinkData } from '@shared/models/link';
import { PageData } from '@shared/models/page';
import { FileTopicData } from '@shared/models/file-topic';
import { MeetingData } from '@shared/models/meeting';

export interface CreateTopicRequest {
  sectionId: string;
  type: TopicType;
  title?: string;
  data?: any;
}

export interface CreateTopicResponse {
  topic: Topic;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor() { }

  getTopicTypeOptions(): TopicTypeOption[] {
    return getTopicTypeOptions();
  }

  createTopic(request: CreateTopicRequest): Observable<CreateTopicResponse> {
    const topic = this.createTopicWithDefaultData(request);

    return of({
      topic,
      success: true,
      message: 'Topic created successfully'
    });
  }

  updateTopic(topicId: string, updates: Partial<Topic>): Observable<CreateTopicResponse> {
    return of({
      topic: { ...updates } as Topic,
      success: true,
      message: 'Topic updated successfully'
    });
  }

  deleteTopic(topicId: string): Observable<{ success: boolean; message: string }> {
    return of({
      success: true,
      message: 'Topic deleted successfully'
    });
  }

  getTopicsBySection(sectionId: string): Observable<Topic[]> {
    return of([]);
  }

  private createTopicWithDefaultData(request: CreateTopicRequest): Topic {
    const { sectionId, type, title } = request;
    let topicData: any;
    
    switch (type) {
      case TopicType.ASSIGNMENT:
        topicData = {
          description: '',
          open: null,
          close: null,
          remindToGrade: null,
          maximumFile: 1,
          maximumFileSize: FileSizeOption['5MB']
        } as AssignmentData;
        break;
        
      case TopicType.QUIZ:
        topicData = {
          description: '',
          open: null,
          close: null,
          timeLimit: null,
          timeLimitUnit: TimeLimitType.MINUTES,
          gradeToPass: 0,
          gradingMethod: GradingMethod.LAST_GRADE,
          attemptAllowed: 'Unlimited',
          questions: []
        } as QuizData;
        break;
        
      case TopicType.LINK:
        topicData = {
          url: null,
          description: ''
        } as LinkData;
        break;
        
      case TopicType.PAGE:
        topicData = {
          description: '',
          content: ''
        } as PageData;
        break;
        
      case TopicType.FILE:
        topicData = {
          file: null,
          description: ''
        } as FileTopicData;
        break;
        
      case TopicType.MEETING:
        topicData = {
          description: '',
          open: new Date().toISOString()
        } as MeetingData;
        break;
        
      default:
        topicData = {
          description: ''
        };
        break;
    }

    return {
      id: Date.now().toString(),
      title: title || `New ${type}`,
      sectionId: sectionId,
      type: type,
      data: topicData
    } as Topic;
  }

  getDefaultTopicData(type: TopicType): any {
    const mockRequest: CreateTopicRequest = {
      sectionId: 'temp',
      type: type
    };
    return this.createTopicWithDefaultData(mockRequest).data;
  }
}
