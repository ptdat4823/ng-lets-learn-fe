import { Component, inject, OnInit } from '@angular/core';
import {
  QUIZ_STUDENT_TABS,
  QUIZ_TEACHER_TABS,
  QuizTab,
} from '@modules/quiz/constants/quiz.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockTopics } from '@shared/mocks/topic';
import { iconMap, QuizTopic } from '@shared/models/topic';
import { Role, User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'quiz-page',
  standalone: false,
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
  providers: [TabService],
})
export class QuizPageComponent implements OnInit {
  tabService = inject(TabService);
  userService = inject(UserService);

  topic: QuizTopic = mockTopics[0] as QuizTopic;
  tabs = QuizTab;
  user: User | null = null;
  isStudent = true;
  topicIcon = '';
  selectedTab = QuizTab.QUIZ;

  ngOnInit(): void {
    this.topicIcon = iconMap[this.topic.type];
    this.tabService.selectTab(this.selectedTab);
    this.tabService.setTabs(QUIZ_STUDENT_TABS);
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) this.selectedTab = tab;
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (user?.role === Role.TEACHER) {
        this.tabService.setTabs(QUIZ_TEACHER_TABS);
        this.isStudent = false;
      } else {
        this.tabService.setTabs(QUIZ_STUDENT_TABS);
        this.isStudent = true;
      }
    });
  }
}
