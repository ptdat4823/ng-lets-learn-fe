import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  QUIZ_STUDENT_TABS,
  QUIZ_TEACHER_TABS,
  QuizTab,
} from '@modules/quiz/constants/quiz.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockCourses } from '@shared/mocks/course';
import { mockTopics } from '@shared/mocks/topic';
import { Course } from '@shared/models/course';
import { QuizTopic } from '@shared/models/topic';
import { Role, User } from '@shared/models/user';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'quiz-page',
  standalone: false,
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
  providers: [TabService],
})
export class QuizPageComponent implements OnInit {
  course: Course | null = null;
  topic: QuizTopic = mockTopics[0] as QuizTopic;
  tabs = QuizTab;
  user: User | null = null;
  isStudent = true;
  selectedTab = QuizTab.QUIZ;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private tabService: TabService<QuizTab>,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    const topicId = this.activedRoute.snapshot.paramMap.get('topicId');
    const courseId = this.activedRoute.snapshot.paramMap.get('courseId');
    if (courseId) this.fetchCourseData(courseId);
    if (topicId) this.fetchTopicData(topicId);
    if (courseId && topicId) {
      this.updateBreadcrumb(this.course as Course, this.topic);
    }
  }
  ngOnInit(): void {
    this.tabService.setTabs(QUIZ_STUDENT_TABS);
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) {
        this.selectedTab = tab;
        this.cdr.detectChanges();
      }
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

  fetchTopicData(topicId: string) {
    const res = mockTopics.find((topic) => topic.id === topicId);
    if (res) this.topic = res as QuizTopic;
  }

  fetchCourseData(courseId: string) {
    const res = mockCourses.find((course) => course.id === courseId);
    if (res) this.course = res;
  }

  updateBreadcrumb(course: Course, topic: QuizTopic) {
    this.breadcrumbService.setBreadcrumbs([
      {
        label: course.title,
        url: `/courses/${course.id}`,
        active: false,
      },
      {
        label: topic.title,
        url: `/courses/${course.id}/quiz/${topic.id}`,
        active: true,
      },
    ]);
  }
}
