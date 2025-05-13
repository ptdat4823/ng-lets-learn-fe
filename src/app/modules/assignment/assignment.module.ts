import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
import { AssignmentPageComponent } from './components/assignment-page/assignment-page.component';
import { TabAssignmentComponent } from './components/assignment-page/assignment-tabs/tab-assignment/tab-assignment.component';
import { TabSettingComponent } from './components/assignment-page/assignment-tabs/tab-setting/tab-setting.component';
import { TabSubmissionComponent } from './components/assignment-page/assignment-tabs/tab-submission/tab-submission.component';

@NgModule({
  declarations: [
    AssignmentPageComponent,
    TabAssignmentComponent,
    TabSettingComponent,
    TabSubmissionComponent,
  ],
  imports: [SharedModule, RouterOutlet, FormsModule, SharedComponentsModule],
  exports: [],
})
export class AssignmentModule {}
