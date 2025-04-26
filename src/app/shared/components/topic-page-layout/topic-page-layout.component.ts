import { Component, inject, Input, OnInit } from '@angular/core';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { iconMap, Topic } from '@shared/models/topic';
import { TabListComponent } from '../tab-list/tab-list.component';

@Component({
  selector: 'topic-page-layout',
  standalone: true,
  templateUrl: './topic-page-layout.component.html',
  styleUrl: './topic-page-layout.component.scss',
  imports: [TabListComponent],
})
export class TopicPageLayoutComponent implements OnInit {
  @Input({ required: true }) topic!: Topic;
  tabs: string[] = [];
  tabService = inject(TabService);

  topicIcon = '';
  selectedTab = '';

  ngOnInit(): void {
    this.topicIcon = iconMap[this.topic.type];

    if (this.tabs.length > 0) this.tabService.selectTab(this.tabs[0]);
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) this.selectedTab = tab;
    });
  }
}
