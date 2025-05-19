export enum AssignmentTab {
  ASSIGNMENT = 'Assignment',
  SETTINGS = 'Settings',
  SUBMISSIONS = 'Submissions',
  DASHBOARD = 'Dashboard',
}
export const ASSIGNMENT_TEACHER_TABS = Object.values(AssignmentTab);
export const ASSIGNMENT_STUDENT_TABS = [AssignmentTab.ASSIGNMENT];

export enum SubmissionStatus {
  NOT_SUBMITTED = 'Not submitted',
  SUBMITTED_EARLY = 'Submitted early',
  SUBMITTED_LATE = 'Submitted late',
}

export enum GradingStatus {
  NOT_GRADED = 'Not graded',
  GRADED = 'Graded',
}

export const acceptedExplorerFileTypes = [
  'image/*',
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.xls',
  '.xlsx',
];
