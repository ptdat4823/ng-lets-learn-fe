import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizAttemptingComponent } from '@modules/quiz/components/quiz-page/quiz-attempting/quiz-attempting.component';

const routes: Routes = [
  {
    path: ':topicId/attempting',
    component: QuizAttemptingComponent,
  },
  {
    path: ':topicId/:quizResponseId/reviewing',
    component: QuizAttemptingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizAttemptingRoutingModule {}
