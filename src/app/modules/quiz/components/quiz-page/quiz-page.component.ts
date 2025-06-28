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
import { mockCourses } from '@shared/mocks/course';
import { mockTopics } from '@shared/mocks/topic';
import { Course } from '@shared/models/course';
import { QuizTopic } from '@shared/models/topic';
import { Role, User } from '@shared/models/user';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { UserService } from '@shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.InitData()
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

  InitData() {
    const topicId = this.activedRoute.snapshot.paramMap.get('topicId');
    const courseId = this.activedRoute.snapshot.paramMap.get('courseId');
    if (courseId) this.fetchCourseData(courseId);
    if (topicId && courseId) this.fetchTopicData(topicId, courseId);
    if (this.course && this.topic) {
      this.updateBreadcrumb(this.course, this.topic);
    }
  }

  async fetchTopicData(topicId: string, courseId: string) {
    try {
      const topic = await GetTopic(topicId, courseId);
      if (topic) {
        this.topic = topic as QuizTopic;
        this.cdr.detectChanges();
      }
    } catch (error) {
      this.toastr.error('Failed to fetch topic', 'Error');
    }
  }

  async fetchCourseData(courseId: string) {
    try {
      const course = await GetCourseById(courseId);
      if (course) {
        this.course = course;
        this.cdr.detectChanges();
      }
    } catch (error) {
      this.toastr.error('Failed to fetch course', 'Error');
    }
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
