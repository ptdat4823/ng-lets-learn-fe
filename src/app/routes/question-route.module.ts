import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceQuestionCreatePageComponent } from '@modules/question/components/choice-question-pages/choice-question-create-page/choice-question-create-page.component';
import { ChoiceQuestionEditPageComponent } from '@modules/question/components/choice-question-pages/choice-question-edit-page/choice-question-edit-page.component';
import { ShortAnswerQuestionCreatePageComponent } from '@modules/question/components/short-answer-question-pages/short-answer-question-create-page/short-answer-question-create-page.component';
import { ShortAnswerQuestionEditPageComponent } from '@modules/question/components/short-answer-question-pages/short-answer-question-edit-page/short-answer-question-edit-page.component';
import { TrueFalseQuestionCreatePageComponent } from '@modules/question/components/true-false-question-pages/true-false-question-create-page/true-false-question-create-page.component';
import { TrueFalseQuestionEditPageComponent } from '@modules/question/components/true-false-question-pages/true-false-question-edit-page/true-false-question-edit-page.component';

const routes: Routes = [
  {
    path: 'choice-question/create',
    component: ChoiceQuestionCreatePageComponent,
  },
  {
    path: 'choice-question/edit/:questionId',
    component: ChoiceQuestionEditPageComponent,
  },
  {
    path: 'short-answer-question/create',
    component: ShortAnswerQuestionCreatePageComponent,
  },
  {
    path: 'short-answer-question/edit/:questionId',
    component: ShortAnswerQuestionEditPageComponent,
  },
  {
    path: 'true-false-question/create',
    component: TrueFalseQuestionCreatePageComponent,
  },
  {
    path: 'true-false-question/edit/:questionId',
    component: TrueFalseQuestionEditPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
