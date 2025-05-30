import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CourseRoutingModule } from '@routes/course-route.module';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';

import { CourseLayoutComponent } from './components/course-layout/course-layout.component';
import { TabCourseComponent } from './components/course-layout/course-tabs/tab-course/tab-course.component';
import { TabActivitiesComponent } from './components/course-layout/course-tabs/tab-activities/tab-activities.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { TeacherCourseCardComponent } from './components/course-list/teacher-course-list/teacher-course-card/teacher-course-card.component';
import { TeacherCourseListComponent } from './components/course-list/teacher-course-list/teacher-course-list.component';
import { CoursesLayoutComponent } from './components/courses-layout/courses-layout.component';
import { NewCourseFormComponent } from './components/new-course/new-course-form/new-course-form.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { TabPeopleComponent } from './components/course-layout/course-tabs/tab-people/tab-people.component';
import { ActivityComponent } from './components/course-layout/course-tabs/tab-activities/activity/activity.component';

@NgModule({
  declarations: [
    CourseListComponent,
    TeacherCourseCardComponent,
    TeacherCourseListComponent,
    CoursesLayoutComponent,
    NewCourseFormComponent,
    NewCourseComponent,
    CourseLayoutComponent,
    TabCourseComponent,
    ActivityComponent,
    TabActivitiesComponent,
    TabPeopleComponent,
  ],
  imports: [
    SharedModule,
    RouterOutlet,
    CourseRoutingModule,
    FormsModule,
    SharedComponentsModule,
  ],
  exports: [],
})
export class CoursesModule {}
