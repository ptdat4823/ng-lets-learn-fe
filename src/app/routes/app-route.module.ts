import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../modules/auth/components/login-page/login-page.component';
import { RegisterPageComponent } from '../modules/auth/components/register-page/register-page.component';
import { CalendarPageComponent } from '@modules/calendar/components/calendar-page/calendar-page.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { SettingsPageComponent } from '@modules/settings/components/settings-page/settings-page.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'auth/signup', component: RegisterPageComponent },
  { path: 'home', redirectTo: 'courses' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'calendar', component: CalendarPageComponent },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'courses',
        loadChildren: () =>
          import('@routes/course-route.module').then(
            (m) => m.CourseRoutingModule
          ),
      },
    ],
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('@routes/quiz-attempting-route.module').then(
        (m) => m.QuizAttemptingRoutingModule
      ),
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppRoutingModule {}
