import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  COURSE_STUDENT_TABS,
  COURSE_TEACHER_TABS,
  CourseTab,
} from '@modules/courses/constants/courses.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { mockCourses } from '@shared/mocks/course';
import { Course } from '@shared/models/course';
import { Role, User } from '@shared/models/user';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-course-layout',
  standalone: false,
  templateUrl: './course-layout.component.html',
  styleUrl: './course-layout.component.scss',
  providers: [TabService],
})
export class CourseLayoutComponent implements OnInit {
  selectedTab: string = CourseTab.COURSE;
  tabs = CourseTab;
  course: Course | null = null;
  user: User | null = null;
  isStudent = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tabService: TabService<string>,
    private breadcrumbService: BreadcrumbService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const courseId = params.get('courseId');
      if (courseId) {
        this.fetchCourseData(courseId);

        const courseKey = `selectedTab_course_${courseId}`;
        const savedTab = localStorage.getItem(courseKey);
        this.selectedTab = savedTab ? savedTab : CourseTab.COURSE;

        this.tabService.setTabs(COURSE_STUDENT_TABS);
        this.tabService.selectTab(this.selectedTab);

        this.tabService.selectedTab$.subscribe((tab) => {
          if (tab) {
            this.selectedTab = tab;
            this.cdr.detectChanges();
            localStorage.setItem(courseKey, tab);
          }
        });

        this.userService.user$.subscribe((user) => {
          this.user = user;
          if (user?.role === Role.TEACHER) {
            this.tabService.setTabs(COURSE_TEACHER_TABS);
            this.isStudent = false;
          } else {
            this.tabService.setTabs(COURSE_STUDENT_TABS);
            this.isStudent = true;
          }
        });
      }
    });
  }

  fetchCourseData(courseId: string) {
    const res = mockCourses.find((course) => course.id === courseId);
    if (res) {
      this.course = res;

      this.breadcrumbService.setBreadcrumbs([
        {
          label: this.course.title,
          url: `/courses/${this.course.id}`,
          active: true,
        },
      ]);
    }
  }
}
