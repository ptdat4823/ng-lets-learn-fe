import { joinStrings } from '@shared/helper/string.helper';

export const LOCAL_STORAGE_KEYS = {
  USER: 'user',
};

export const DYNAMIC_LOCAL_STORAGE_KEYS = {
  QUIZ: (courseId: string, quizId: string): string =>
    getDynamicLocalStorageKey(['quiz', courseId, quizId]),
  ASSIGNMENT: (courseId: string, assignmentId: string): string =>
    getDynamicLocalStorageKey(['assignment', courseId, assignmentId]),
  PAGE: (courseId: string, pageId: string): string =>
    getDynamicLocalStorageKey(['page', courseId, pageId]),
  FILE: (courseId: string, fileId: string): string =>
    getDynamicLocalStorageKey(['file', courseId, fileId]),
  LINK: (courseId: string, linkId: string): string =>
    getDynamicLocalStorageKey(['link', courseId, linkId]),
};

const getDynamicLocalStorageKey = (keyParts: string[]): string => {
  if (!keyParts || keyParts.length === 0) {
    throw new Error('Key parts must be a non-empty array');
  }
  return joinStrings(keyParts, '_');
};
