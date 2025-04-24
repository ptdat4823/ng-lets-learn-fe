import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { COURSE_TABS } from '@modules/courses/constants/courses.constant';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { CourseTab } from '@shared/constants/course';
import { mockCourses } from '@shared/mocks/course';
import { Course } from '@shared/models/course';

@Component({
  selector: 'app-course-layout',
  standalone: false,
  templateUrl: './course-layout.component.html',
  styleUrl: './course-layout.component.scss',
  providers: [TabService],
})
export class CourseLayoutComponent implements OnInit {
  route = inject(ActivatedRoute);
  tabService = inject(TabService);
  selectedTab: string = CourseTab.COURSE;
  tabs = CourseTab;
  course: Course | null = null;

  ngOnInit(): void {
    this.tabService.setTabs(COURSE_TABS);
    this.tabService.selectTab(this.selectedTab);

    this.tabService.selectedTab$.subscribe((tab) => {
      if (tab) this.selectedTab = tab;
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('courseId');
      if (id) this.fetchCourseData(id);
    });
  }

  fetchCourseData(courseId: string) {
    const res = mockCourses.find((course) => course.id === courseId);
    if (res) this.course = res;
  }
}
