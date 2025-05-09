import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iconMap, Topic } from '@shared/models/topic';

@Component({
  selector: 'app-topic',
  standalone: false,
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
})
export class TopicComponent implements OnInit {
  @Input({ required: true }) topic!: Topic;
  @Input() isEditing = false;
  topicIcon = '';
  router = inject(Router);

  ngOnInit(): void {
    this.topicIcon = iconMap[this.topic.type];
  }

  onTopicClick(): void {
    this.router.navigate([
      `${this.router.url}/${this.topic.type}/${this.topic.id}`,
    ]);
  }
}
