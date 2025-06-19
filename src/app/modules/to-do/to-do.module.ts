import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
import { ToDoPageComponent } from './components/to-do-page/to-do-page.component';

const routes: Routes = [
  { path: '', component: ToDoPageComponent },
];

@NgModule({
  declarations: [ToDoPageComponent],
  imports: [
    SharedModule, 
    FormsModule, 
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ToDoModule {}
