import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
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

@NgModule({
  declarations: [
    QuizResultTableComponent,
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
  ],
  imports: [SharedModule, RouterOutlet, FormsModule, SharedComponentsModule],
  exports: [QuizAttemptingComponent],
})
export class QuizModule {}
