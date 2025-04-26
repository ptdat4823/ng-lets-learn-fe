import { Component, inject, OnInit } from '@angular/core';
import { QUIZ_TABS, QuizTab } from '@modules/courses/constants/quiz.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockTopics } from '@shared/mocks/topic';
import { iconMap, QuizTopic } from '@shared/models/topic';

@Component({
  selector: 'quiz-page',
  standalone: false,
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
  providers: [TabService],
})
export class QuizPageComponent implements OnInit {
  tabService = inject(TabService);
  topic: QuizTopic = mockTopics[0] as QuizTopic;
  tabs = QuizTab;
  topicIcon = '';
  selectedTab = QuizTab.QUIZ;

  ngOnInit(): void {
    this.topicIcon = iconMap[this.topic.type];
    this.tabService.setTabs(QUIZ_TABS);
    this.tabService.selectTab(this.selectedTab);
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) this.selectedTab = tab;
    });
  }
}
