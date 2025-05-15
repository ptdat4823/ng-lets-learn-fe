import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
import { AssignmentPageComponent } from './components/assignment-page/assignment-page.component';
import { TabAssignmentComponent } from './components/assignment-page/assignment-tabs/tab-assignment/tab-assignment.component';
import { TabSettingComponent } from './components/assignment-page/assignment-tabs/tab-setting/tab-setting.component';
import { TabSubmissionComponent } from './components/assignment-page/assignment-tabs/tab-submission/tab-submission.component';
import { TabDashboardComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/tab-dashboard.component';
import { DashboardComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/dashboard/dashboard.component';
import { RankLogoComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/rank-logo/rank-logo.component';
import { RankAComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/rank-logo/rank-a.component';
import { RankBComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/rank-logo/rank-b.component';
import { RankCComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/rank-logo/rank-c.component';
import { RankSComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/rank-logo/rank-s.component';
import { RankItemComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/rank-item/rank-item.component';
import { ColorItemComponent } from './components/assignment-page/assignment-tabs/tab-dashboard/color-item/color-item.component';

@NgModule({
  declarations: [
    AssignmentPageComponent,
    TabAssignmentComponent,
    TabSettingComponent,
    TabSubmissionComponent,
    TabDashboardComponent,
    DashboardComponent,
    RankLogoComponent,
    RankAComponent,
    RankBComponent,
    RankCComponent,
    RankSComponent,
    RankItemComponent,
    ColorItemComponent,
  ],
  imports: [SharedModule, RouterOutlet, FormsModule, SharedComponentsModule],
  exports: [],
})
export class AssignmentModule {}
