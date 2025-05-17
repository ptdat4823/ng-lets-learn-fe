import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  GradingStatus,
  SubmissionStatus,
} from '@modules/assignment/constants/assignment.constant';
import { getDurationText } from '@shared/helper/date.helper';
import { CloudinaryFile } from '@shared/models/cloudinary-file';
import {
  AssignmentResponseData,
  StudentResponse,
} from '@shared/models/student-response';
import { AssignmentTopic } from '@shared/models/topic';
import { StudentResponseService } from '@shared/services/student-response.service';
import { format } from 'date-fns';
type SummaryTableField = {
  id: string;
  label: string;
  value: any;
  color: 'default' | 'red' | 'green' | 'orange';
};
type SummaryTableData = Record<string, SummaryTableField>;
@Component({
  selector: 'submission-status-table',
  standalone: false,
  templateUrl: './submission-status-table.component.html',
  styleUrl: './submission-status-table.component.scss',
})
export class SubmissionStatusTableComponent implements OnInit, OnChanges {
  @Input() assignmentResponse: StudentResponse | null = null;
  @Input({ required: true }) topic!: AssignmentTopic;

  summaryTable: SummaryTableData = {
    submissionStatus: {
      id: 'submissionStatus',
      label: 'Submission status',
      value: SubmissionStatus.NOT_SUBMITTED,
      color: 'default',
    },
    gradingStatus: {
      id: 'gradingStatus',
      label: 'Grading status',
      value: GradingStatus.NOT_GRADED,
      color: 'default',
    },
    timeRemaining: {
      id: 'timeRemaining',
      label: 'Time remaining',
      value: 'No due date',
      color: 'default',
    },
    lastModified: {
      id: 'lastModified',
      label: 'Last modified',
      value: 'Not modified',
      color: 'default',
    },
    fileSubmitted: {
      id: 'fileSubmitted',
      label: 'File(s) submitted',
      value: 'No file submitted',
      color: 'default',
    },
    note: {
      id: 'note',
      label: 'Note',
      value: '',
      color: 'default',
    },
  };

  tableFields: SummaryTableField[] = [];
  maxAssignmentGrade: number = 100;

  constructor(private studentResponseService: StudentResponseService) {}
  ngOnInit(): void {
    this.getTableFields();
    this.updateTableData(this.assignmentResponse);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const updatedAssignmentResponse =
      changes['assignmentResponse'].currentValue;
    this.updateTableData(updatedAssignmentResponse);
  }

  getTableFields() {
    this.tableFields = Object.values(this.summaryTable);
  }

  getUpdatedSubmissionStatus(close: string | null, submittedAt: string | null) {
    if (!close) {
      return !!submittedAt
        ? SubmissionStatus.SUBMITTED_EARLY
        : SubmissionStatus.NOT_SUBMITTED;
    }

    if (!submittedAt && new Date() < new Date(close))
      return SubmissionStatus.NOT_SUBMITTED;
    else if (!submittedAt && new Date() > new Date(close)) {
      this.summaryTable['submissionStatus'].color = 'red';
      return SubmissionStatus.SUBMITTED_LATE;
    } else {
      this.summaryTable['submissionStatus'].color = 'green';
      return SubmissionStatus.SUBMITTED_EARLY;
    }
  }

  getUpdatedTimeRemaining(close: string | null, submittedAt: string | null) {
    if (!close) return 'No due date';

    if (!submittedAt && new Date() < new Date(close)) {
      const durationText = getDurationText(new Date(), new Date(close), 1);
      return `${durationText} left`;
    } else if (!submittedAt && new Date() > new Date(close)) {
      this.summaryTable['timeRemaining'].color = 'red';
      return 'Overdue by ' + getDurationText(new Date(close), new Date(), 1);
    }
    this.summaryTable['timeRemaining'].color = 'green';
    return 'Submitted early by ' + getDurationText(close, submittedAt, 1);
  }

  updateTableData(assignmentResponse: StudentResponse | null) {
    const close = this.topic.data.close;

    let updatedSubmissionStatus: SubmissionStatus =
      SubmissionStatus.NOT_SUBMITTED;
    let updatedGradingStatus: string = GradingStatus.NOT_GRADED;
    let updatedTimeRemaining: string = '';
    let updatedLastModified: string = 'Not modified';
    let updatedFileSubmitted: any = 'No file submitted';
    let updatedNote = '';
    if (assignmentResponse) {
      const { mark, submittedAt, files, note } =
        assignmentResponse.data as AssignmentResponseData;

      // submission status
      updatedSubmissionStatus = this.getUpdatedSubmissionStatus(
        close,
        submittedAt
      );

      // grading status
      if (mark) {
        updatedGradingStatus = `${mark} / ${this.maxAssignmentGrade}`;
        const color = this.studentResponseService.getGradeColor(
          mark,
          this.maxAssignmentGrade
        );
        console.log('color', color);
        this.summaryTable['gradingStatus'].color = color;
      }

      // time remaining
      updatedTimeRemaining = this.getUpdatedTimeRemaining(close, submittedAt);

      // last modified
      updatedLastModified = format(
        new Date(submittedAt),
        'EEEE, d MMMM yyyy, h:mm a'
      );

      // file submitted
      updatedFileSubmitted = files;

      // note
      updatedNote = note;
    } else {
      // submission status
      updatedSubmissionStatus = this.getUpdatedSubmissionStatus(close, null);

      // time remaining
      updatedTimeRemaining = this.getUpdatedTimeRemaining(close, null);
    }

    this.summaryTable['submissionStatus'].value = updatedSubmissionStatus;
    this.summaryTable['gradingStatus'].value = updatedGradingStatus;
    this.summaryTable['timeRemaining'].value = updatedTimeRemaining;
    this.summaryTable['lastModified'].value = updatedLastModified;
    this.summaryTable['fileSubmitted'].value = updatedFileSubmitted;
    this.summaryTable['note'].value = updatedNote;
  }

  hasFileSubmitted(item: SummaryTableField) {
    if (item.id !== 'fileSubmitted') return false;
    if (!Array.isArray(item.value)) return false;

    const files = item.value as any[];
    return files.length > 0;
  }

  getFiles(item: SummaryTableField) {
    if (item.id !== 'fileSubmitted') return [];
    if (!Array.isArray(item.value)) return [];

    return item.value as CloudinaryFile[];
  }
}
