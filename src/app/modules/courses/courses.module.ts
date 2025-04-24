import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CoursesLayoutComponent } from './components/courses-layout/courses-layout.component';
import { TeacherCourseCardComponent } from './components/teacher-course-list/teacher-course-card/teacher-course-card.component';
import { TeacherCourseListComponent } from './components/teacher-course-list/teacher-course-list.component';
import { NewCourseFormComponent } from './components/new-course/new-course-form/new-course-form.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { CourseRoutingModule } from '@routes/course-route.module';
import { CourseLayoutComponent } from './components/course-layout/course-layout.component';
import { TabComponent } from '../../shared/components/tab-list/tab/tab.component';
import { TabCourseComponent } from './components/course-tabs/tab-course/tab-course.component';

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
  ],
  imports: [SharedModule, RouterOutlet, CourseRoutingModule, TabComponent],
})
export class CoursesModule {}
