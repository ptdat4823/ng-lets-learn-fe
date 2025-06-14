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
import { DetailSectionComponent } from './components/assignment-page/assignment-tabs/tab-submission/detail-section/detail-section.component';
import { DefaultViewComponent } from './components/assignment-page/assignment-tabs/tab-submission/default-view/default-view.component';
import { SubmittedViewComponent } from './components/assignment-page/assignment-tabs/tab-submission/submitted-view/submitted-view.component';
import { FileUploadViewComponent } from './components/assignment-page/assignment-tabs/tab-submission/file-upload-view/file-upload-view.component';
import { FileDownloadLinkComponent } from './components/assignment-page/assignment-tabs/tab-submission/file-download-link/file-download-link.component';
import { NoteViewComponent } from './components/assignment-page/assignment-tabs/tab-submission/note-view/note-view.component';
import { GradingSummaryTableComponent } from './components/assignment-page/assignment-tabs/tab-assignment/grading-summary-table/grading-summary-table.component';
import { TabAssignmentStudentComponent } from './components/assignment-page/assignment-tabs/tab-assignment-student/tab-assignment.component';
import { SubmissionStatusTableComponent } from './components/assignment-page/assignment-tabs/tab-assignment-student/submission-status-table/submission-status-table.component';

@NgModule({
  declarations: [
    AssignmentPageComponent,
    TabAssignmentComponent,
    TabSettingComponent,
    TabSubmissionComponent,
    TabDashboardComponent,
    DashboardComponent,
    DetailSectionComponent,
    DefaultViewComponent,
    SubmittedViewComponent,
    FileUploadViewComponent,
    FileDownloadLinkComponent,
    NoteViewComponent,
    GradingSummaryTableComponent,
    TabAssignmentStudentComponent,
    SubmissionStatusTableComponent,
  ],
  imports: [SharedModule, RouterOutlet, FormsModule, SharedComponentsModule],
  exports: [],
})
export class AssignmentModule {}
