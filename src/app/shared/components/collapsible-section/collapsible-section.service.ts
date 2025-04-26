import { Injectable } from '@angular/core';
import { Section } from '@shared/models/course';
import { Topic } from '@shared/models/topic';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CollapsibleSectionService {
  private section = new BehaviorSubject<Section | null>(null);
  public section$ = this.section.asObservable();

  setSection(section: Section): void {
    this.section.next(section);
  }

  setTopics(topics: Topic[]): void {
    if (!this.section.value) return;
    const current: Section = this.section.value;
    this.section.next({ ...current, topics });
  }

  addTopic(topic: Topic): void {
    if (!this.section.value) return;
    const current: Section = this.section.value;
    const updated = { ...current, topics: [...current.topics, topic] };
    this.section.next(updated);
  }

  removeTopic(id: string): void {
    if (!this.section.value) return;
    const current: Section = this.section.value;
    const updated = {
      ...current,
      topics: current.topics.filter((topic) => topic.id !== id),
    };
    this.section.next(updated);
  }
}
