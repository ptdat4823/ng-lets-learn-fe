import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FILE_STUDENT_TABS,
  FILE_TEACHER_TABS,
  FileTab,
} from '@modules/file/constants/file.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockCourses } from '@shared/mocks/course';
import { mockTopics } from '@shared/mocks/topic';
import { Course } from '@shared/models/course';
import { FileTopic, iconMap } from '@shared/models/topic';
import { Role, User } from '@shared/models/user';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-file-page',
  standalone: false,
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.scss'],
  providers: [TabService],
})
export class FilePageComponent implements OnInit {
  course: Course | null = null;
  topic: FileTopic = mockTopics[4] as FileTopic;
  tabs = FileTab;
  user: User | null = null;
  isStudent = true;
  topicIcon = '';
  selectedTab = FileTab.FILE;

  constructor(
    private tabService: TabService<FileTab>,
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
    this.tabService.setTabs(this.isStudent ? FILE_STUDENT_TABS : FILE_TEACHER_TABS);
    
    this.tabService.selectedTab$.subscribe(tab => {
      if (tab) {
        this.selectedTab = tab;
        this.cdr.detectChanges();
      }
    });
    
    this.userService.user$.subscribe(user => {
      this.user = user;
      if (user?.role === Role.TEACHER) {
        this.tabService.setTabs(FILE_TEACHER_TABS);
        this.isStudent = false;
      } else {
        this.tabService.setTabs(FILE_STUDENT_TABS);
        this.isStudent = true;
      }
    });
  }
  fetchTopicData(topicId: string) {
    this.topic = mockTopics.find(t => t.id === topicId) as FileTopic || mockTopics.find(t => t.type === 'file') as FileTopic;
  }

  fetchCourseData(courseId: string) {
    this.course = mockCourses.find(c => c.id === courseId) || null;
  }

  updateBreadcrumb(course: Course, topic: FileTopic) {
    this.breadcrumbService.setBreadcrumbs([
      {
        label: course.title,
        url: `/courses/${course.id}`,
        active: false,
      },
      {
        label: topic.title,
        url: `/courses/${course.id}/file/${topic.id}`,
        active: true,
      },
    ]);
  }
}
