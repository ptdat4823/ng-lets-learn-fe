import { Component, inject, Input, OnInit } from '@angular/core';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { iconMap, Topic } from '@shared/models/topic';

@Component({
  selector: 'topic-page-layout',
  standalone: false,
  templateUrl: './topic-page-layout.component.html',
  styleUrl: './topic-page-layout.component.scss',
})
export class TopicPageLayoutComponent implements OnInit {
  @Input({ required: true }) topic!: Topic;
  tabs: string[] = [];
  tabService = inject(TabService);

  topicIcon = '';
  selectedTab = '';

  ngOnInit(): void {
    this.topicIcon = iconMap[this.topic.type];

    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) this.selectedTab = tab;
    });
  }
}
