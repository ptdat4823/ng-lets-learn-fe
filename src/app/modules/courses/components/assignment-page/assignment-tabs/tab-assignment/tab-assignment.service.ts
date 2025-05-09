import { Injectable } from '@angular/core';
import { AssignmentTopic } from '@shared/models/topic';
import { StudentResponseService } from '@shared/services/student-response.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabAssignmentService {
  private topic = new BehaviorSubject<AssignmentTopic | null>(null);
  public topic$ = this.topic.asObservable();

  setTopic(topic: AssignmentTopic) {
    this.topic.next(topic);
  }

  constructor(private studentResponseService: StudentResponseService) {}
}
