import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { TeacherCourseCardComponent } from './components/teacher-course-list/teacher-course-card/teacher-course-card.component';
import { TeacherCourseListComponent } from './components/teacher-course-list/teacher-course-list.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    TeacherCourseCardComponent,
    TeacherCourseListComponent,
  ],
  imports: [SharedModule],
  exports: [CoursesPageComponent],
})
export class CoursesModule {}
