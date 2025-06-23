import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  @Output() delete = new EventEmitter<string>();

  topicIcon = '';
  router = inject(Router);

  ngOnInit(): void {
    this.topicIcon = iconMap[this.topic.type];
  }

  onTopicClick(): void {
    console.log(`Navigating to topic: ${this.topic.id}`);
    console.log(`Current URL: ${this.router.url}`);
    console.log(`Topic Type: ${this.topic.type}`);
    console.log(`Topic ID: ${this.topic.id}`);
    this.router.navigate([this.router.url, this.topic.type, this.topic.id]);
  }

  onDelete(): void {
    this.delete.emit(this.topic.id);
  }
}
