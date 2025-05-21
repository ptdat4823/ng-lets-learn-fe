import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
import { ChoiceQuestionFormComponent } from './components/choice-question-form/choice-question-form.component';
import { ChoiceQuestionCreatePageComponent } from './components/choice-question-pages/choice-question-create-page/choice-question-create-page.component';
import { ChoiceQuestionEditPageComponent } from './components/choice-question-pages/choice-question-edit-page/choice-question-edit-page.component';
import { ShortAnswerQuestionFormComponent } from './components/short-answer-question-form/short-answer-question-form.component';
import { ShortAnswerQuestionCreatePageComponent } from './components/short-answer-question-pages/short-answer-question-create-page/short-answer-question-create-page.component';
import { ShortAnswerQuestionEditPageComponent } from './components/short-answer-question-pages/short-answer-question-edit-page/short-answer-question-edit-page.component';
import { TrueFalseQuestionFormComponent } from './components/true-false-question-form/true-false-question-form.component';
import { TrueFalseQuestionCreatePageComponent } from './components/true-false-question-pages/true-false-question-create-page/true-false-question-create-page.component';
import { TrueFalseQuestionEditPageComponent } from './components/true-false-question-pages/true-false-question-edit-page/true-false-question-edit-page.component';
import { ChoiceAnswerSettingComponent } from './components/choice-answer-setting/choice-answer-setting.component';
@NgModule({
  declarations: [
    ChoiceQuestionFormComponent,
    ChoiceQuestionCreatePageComponent,
    ChoiceQuestionEditPageComponent,
    ShortAnswerQuestionFormComponent,
    ShortAnswerQuestionCreatePageComponent,
    ShortAnswerQuestionEditPageComponent,
    TrueFalseQuestionFormComponent,
    TrueFalseQuestionCreatePageComponent,
    TrueFalseQuestionEditPageComponent,
    ChoiceAnswerSettingComponent,
  ],
  imports: [SharedModule, RouterOutlet, FormsModule, SharedComponentsModule],
  exports: [],
})
export class QuestionModule {}
