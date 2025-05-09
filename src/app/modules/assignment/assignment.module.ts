import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
import { AssignmentPageComponent } from './components/assignment-page/assignment-page.component';
import { TabAssignmentComponent } from './components/assignment-page/assignment-tabs/tab-assignment/tab-assignment.component';

@NgModule({
  declarations: [AssignmentPageComponent, TabAssignmentComponent],
  imports: [SharedModule, RouterOutlet, FormsModule, SharedComponentsModule],
  exports: [],
})
export class AssignmentModule {}
