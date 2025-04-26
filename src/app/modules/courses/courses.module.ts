import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CourseRoutingModule } from '@routes/course-route.module';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
import { TabComponent } from '../../shared/components/tab-list/tab/tab.component';
import { CommentInputComponent } from './components/comment-list/comment-input/comment-input.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment-list/comment/comment.component';
import { CourseLayoutComponent } from './components/course-layout/course-layout.component';
import { TabCourseComponent } from './components/course-layout/course-tabs/tab-course/tab-course.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { TeacherCourseCardComponent } from './components/course-list/teacher-course-list/teacher-course-card/teacher-course-card.component';
import { TeacherCourseListComponent } from './components/course-list/teacher-course-list/teacher-course-list.component';
import { CoursesLayoutComponent } from './components/courses-layout/courses-layout.component';
import { NewCourseFormComponent } from './components/new-course/new-course-form/new-course-form.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { TabQuizComponent } from './components/quiz-page/quiz-tabs/tab-quiz/tab-quiz.component';
import { QuizResultTableComponent } from './components/quiz-result-table/quiz-result-table.component';

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
    QuizResultTableComponent,
    CommentComponent,
    CommentListComponent,
    CommentInputComponent,
    QuizPageComponent,
    TabQuizComponent,
  ],
  imports: [
    SharedModule,
    RouterOutlet,
    CourseRoutingModule,
    TabComponent,
    FormsModule,
    SharedComponentsModule,
  ],
})
export class CoursesModule {}
