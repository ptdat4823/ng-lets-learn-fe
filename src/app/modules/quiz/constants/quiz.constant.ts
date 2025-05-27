import { QuestionType } from '@shared/models/question';

export enum QuizTab {
  QUIZ = 'Quiz',
  SETTINGS = 'Settings',
  QUESTIONS = 'Questions',
  RESULTS = 'Results',
  QUESTION_BANK = 'Question Bank',
  DASHBOARD = 'Dashboard',
}
export const QUIZ_TEACHER_TABS = Object.values(QuizTab);
export const QUIZ_STUDENT_TABS = [QuizTab.QUIZ];

export enum QuestionResult {
  FULL_MARK = 'Full mark',
  PARTIAL_MARK = 'Partial mark',
  ZERO_MARK = 'Zero mark',
}

export enum QuizResult {
  GOOD = 'Good',
  AVERAGE = 'Average',
  BAD = 'Bad',
  DEFAULT = 'Default',
}

export const questionIconMap = {
  [QuestionType.CHOICE]: 'list',
  [QuestionType.SHORT_ANSWER]: 'crop_7_5',
  [QuestionType.TRUE_FALSE]: 'hdr_strong',
};
