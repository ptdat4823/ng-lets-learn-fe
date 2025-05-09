import { Component, OnInit } from '@angular/core';
import {
  ASSIGNMENT_STUDENT_TABS,
  ASSIGNMENT_TEACHER_TABS,
  AssignmentTab,
} from '@modules/courses/constants/assignment.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockTopics } from '@shared/mocks/topic';
import { AssignmentTopic, iconMap } from '@shared/models/topic';
import { Role, User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'assignment-page',
  standalone: false,
  templateUrl: './assignment-page.component.html',
  styleUrl: './assignment-page.component.scss',
  providers: [TabService],
})
export class AssignmentPageComponent implements OnInit {
  topic: AssignmentTopic = mockTopics[0] as AssignmentTopic;
  tabs = AssignmentTab;
  user: User | null = null;
  isStudent = true;
  topicIcon = '';
  selectedTab = AssignmentTab.ASSIGNMENT;

  constructor(
    private tabService: TabService<AssignmentTab>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.topicIcon = iconMap[this.topic.type];
    this.tabService.selectTab(this.selectedTab);
    this.tabService.setTabs(ASSIGNMENT_STUDENT_TABS);
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) this.selectedTab = tab;
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (user?.role === Role.TEACHER) {
        this.tabService.setTabs(ASSIGNMENT_TEACHER_TABS);
        this.isStudent = false;
      } else {
        this.tabService.setTabs(ASSIGNMENT_STUDENT_TABS);
        this.isStudent = true;
      }
    });
  }
}
