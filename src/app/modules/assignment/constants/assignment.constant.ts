export enum AssignmentTab {
  ASSIGNMENT = 'Assignment',
  SETTINGS = 'Settings',
  SUBMISSIONS = 'Submissions',
  DASHBOARD = 'Dashboard',
}
export const ASSIGNMENT_TEACHER_TABS = Object.values(AssignmentTab);
export const ASSIGNMENT_STUDENT_TABS = [AssignmentTab.ASSIGNMENT];
