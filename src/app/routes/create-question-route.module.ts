import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateChoiceQuestionComponent } from '@modules/quiz/components/quiz-page/create-question/create-choice-question/create-choice-question.component';
import { CreateTrueFalseQuestionComponent } from '@modules/quiz/components/quiz-page/create-question/create-true-false-question/create-true-false-question.component';

const routes: Routes = [
  {
    path: 'true-false/create',
    component: CreateTrueFalseQuestionComponent,
  },
  {
    path: 'choice/create',
    component: CreateChoiceQuestionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuestionRoutingModule {}
