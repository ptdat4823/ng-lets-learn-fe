import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentPageComponent } from '@modules/assignment/components/assignment-page/assignment-page.component';
import { FilePageComponent } from '@modules/file/components/file-page/file-page.component';
import { LinkPageComponent } from '@modules/link/components/link-page/link-page.component';
import { PagePageComponent } from '@modules/page/components/page-page/page-page.component';
import { QuizPageComponent } from '@modules/quiz/components/quiz-page/quiz-page.component';

const routes: Routes = [
  {
    path: 'quiz/:topicId',
    component: QuizPageComponent,
  },
  {
    path: 'assignment/:topicId',
    component: AssignmentPageComponent,
  },
  {
    path: 'link/:topicId',
    component: LinkPageComponent,
  },
  {
    path: 'page/:topicId',
    component: PagePageComponent,
  },
  {
    path:'file/:topicId',
    component: FilePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicRoutingModule {}
