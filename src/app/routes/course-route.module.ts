import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLayoutComponent } from '@modules/courses/components/course-layout/course-layout.component';
import { CourseListComponent } from '@modules/courses/components/course-list/course-list.component';
import { CoursesLayoutComponent } from '@modules/courses/components/courses-layout/courses-layout.component';
import { NewCourseComponent } from '@modules/courses/components/new-course/new-course.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: 'new-course', component: NewCourseComponent },
      { path: ':courseId', component: CourseLayoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
