import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LINK_STUDENT_TABS,
  LINK_TEACHER_TABS,
  LinkTab,
} from '@modules/link/constants/link.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockCourses } from '@shared/mocks/course';
import { mockTopics } from '@shared/mocks/topic';
import { Course } from '@shared/models/course';
import { LinkTopic } from '@shared/models/topic';
import { Role, User } from '@shared/models/user';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { UserService } from '@shared/services/user.service';
@Component({
  selector: 'app-link-page',
  standalone: false,
  templateUrl: './link-page.component.html',
  styleUrls: ['./link-page.component.scss'],
  providers: [TabService],
})
export class LinkPageComponent implements OnInit {
  course: Course | null = null;
  topic: LinkTopic = mockTopics[3] as LinkTopic;
  tabs = LinkTab;
  user: User | null = null;
  isStudent = true;
  selectedTab = LinkTab.FILE;

  constructor(
    private tabService: TabService<LinkTab>,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private activedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    const topicId = this.activedRoute.snapshot.paramMap.get('topicId');
    const courseId = this.activedRoute.snapshot.paramMap.get('courseId');
    if (courseId) this.fetchCourseData(courseId);
    if (topicId) this.fetchTopicData(topicId);
    if (courseId && topicId && this.course && this.topic) {
      this.updateBreadcrumb(this.course, this.topic);
    }
  }
  ngOnInit(): void {
    this.tabService.setTabs(LINK_STUDENT_TABS);
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) {
        this.selectedTab = tab;
        this.cdr.detectChanges();
      }
    });

    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (user?.role === Role.TEACHER) {
        this.tabService.setTabs(LINK_TEACHER_TABS);
        this.isStudent = false;
      } else {
        this.tabService.setTabs(LINK_STUDENT_TABS);
        this.isStudent = true;
      }
    });
  }

  fetchTopicData(topicId: string) {
    this.topic =
      (mockTopics.find((t) => t.id === topicId) as LinkTopic) ||
      (mockTopics[3] as LinkTopic);
  }

  fetchCourseData(courseId: string) {
    this.course = mockCourses.find((c) => c.id === courseId) || null;
  }

  updateBreadcrumb(course: Course, topic: LinkTopic) {
    this.breadcrumbService.setBreadcrumbs([
      {
        label: course.title,
        url: `/courses/${course.id}`,
        active: false,
      },
      {
        label: topic.title,
        url: `/courses/${course.id}/link/${topic.id}`,
        active: true,
      },
    ]);
  }
}
