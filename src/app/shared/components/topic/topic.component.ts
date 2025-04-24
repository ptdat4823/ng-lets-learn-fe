import { Component, Input, OnInit } from '@angular/core';
import { iconMap, Topic } from '@shared/models/topic';

@Component({
  selector: 'app-topic',
  standalone: true,
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
})
export class TopicComponent implements OnInit {
  @Input({ required: true }) topic!: Topic;
  @Input() isEditing = false;
  topicIcon = '';

  ngOnInit(): void {
    this.topicIcon = iconMap[this.topic.type];
  }
}
