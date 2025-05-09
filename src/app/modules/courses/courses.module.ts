import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CourseRoutingModule } from '@routes/course-route.module';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
import { ConfirmMessageComponent } from '../../shared/components/confirm-message/confirm-message.component';
import { TabComponent } from '../../shared/components/tab-list/tab/tab.component';
import { TimerComponent } from '../../shared/components/timer/timer.component';
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
import { QuizAttemptingComponent } from './components/quiz-page/quiz-attempting/quiz-attempting.component';
import { QuizChoiceAnswerComponent } from './components/quiz-page/quiz-attempting/quiz-choice-answer/quiz-choice-answer.component';
import { QuizDescriptionComponent } from './components/quiz-page/quiz-attempting/quiz-description/quiz-description.component';
import { QuizNavigationComponent } from './components/quiz-page/quiz-attempting/quiz-navigation/quiz-navigation.component';
import { QuizResultComponent } from './components/quiz-page/quiz-attempting/quiz-result/quiz-result.component';
import { QuizShortAnswerComponent } from './components/quiz-page/quiz-attempting/quiz-short-answer/quiz-short-answer.component';
import { QuizTrueFalseAnswerComponent } from './components/quiz-page/quiz-attempting/quiz-true-false-answer/quiz-true-false-answer.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { TabQuizStudentComponent } from './components/quiz-page/quiz-tabs/tab-quiz-student/tab-quiz-student.component';
import { TabQuizComponent } from './components/quiz-page/quiz-tabs/tab-quiz/tab-quiz.component';
import { TabSettingComponent } from './components/quiz-page/quiz-tabs/tab-setting/tab-setting.component';
import { QuizResultTableComponent } from './components/quiz-result-table/quiz-result-table.component';
import { SettingRowComponent } from '../../shared/components/setting-row/setting-row.component';
import { AssignmentPageComponent } from './components/assignment-page/assignment-page.component';
import { TabAssignmentComponent } from './components/assignment-page/assignment-tabs/tab-assignment/tab-assignment.component';

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
    TabQuizStudentComponent,
    QuizAttemptingComponent,
    QuizDescriptionComponent,
    QuizNavigationComponent,
    QuizChoiceAnswerComponent,
    QuizTrueFalseAnswerComponent,
    QuizShortAnswerComponent,
    QuizResultComponent,
    TabSettingComponent,
    AssignmentPageComponent,
    TabAssignmentComponent,
  ],
  imports: [
    SharedModule,
    RouterOutlet,
    CourseRoutingModule,
    FormsModule,
    SharedComponentsModule,
  ],
  exports: [QuizAttemptingComponent],
})
export class CoursesModule {}
