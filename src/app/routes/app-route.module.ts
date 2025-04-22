import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../modules/auth/components/login-page/login-page.component';
import { RegisterPageComponent } from '../modules/auth/components/register-page/register-page.component';
import { NewCourseComponent } from '@modules/courses/components/new-course/new-course.component';
import { CoursesLayoutComponent } from '@modules/courses/components/courses-layout/courses-layout.component';
import { CourseListComponent } from '@modules/courses/components/course-list/course-list.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'auth/signup', component: RegisterPageComponent },
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: 'new-course', component: NewCourseComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
