export enum LinkTab {
  FILE = 'File',
  SETTINGS = 'Settings',
}

export const LINK_TEACHER_TABS = Object.values(LinkTab);
export const LINK_STUDENT_TABS = [LinkTab.FILE];