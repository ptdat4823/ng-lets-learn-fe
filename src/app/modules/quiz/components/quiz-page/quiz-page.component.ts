import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetCourseById } from '@modules/courses/api/courses.api';
import { GetTopic } from '@modules/courses/api/topic.api';
import {
  QUIZ_STUDENT_TABS,
  QUIZ_TEACHER_TABS,
  QuizTab,
} from '@modules/quiz/constants/quiz.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
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
  topic: QuizTopic | null = null;
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
  ) {}

  async InitData() {
    const topicId = this.activedRoute.snapshot.paramMap.get('topicId');
    const courseId = this.activedRoute.snapshot.paramMap.get('courseId');
    if (topicId && courseId) await this.FetchData(courseId, topicId);
  }

  async FetchData(courseId: string, topicId: string) {
    return await GetCourseById(courseId).then(async (course) => {
      this.course = course;
      await GetTopic(topicId, courseId).then((topic) => {
        this.topic = topic as QuizTopic;
        this.updateBreadcrumb(course, this.topic!);
      });
    });
  }

  ngOnInit(): void {
    this.InitData();
    this.tabService.setTabs(QUIZ_STUDENT_TABS);
    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) {
        this.selectedTab = tab;
        this.cdr.detectChanges();
      }
    });

    this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log('User in quiz page: ', user);
      if (user?.role === Role.TEACHER) {
        this.tabService.setTabs(QUIZ_TEACHER_TABS);
        this.isStudent = false;
      } else {
        this.tabService.setTabs(QUIZ_STUDENT_TABS);
        this.isStudent = true;
      }
    });
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
