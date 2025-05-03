export enum QuizTab {
  QUIZ = 'Quiz',
  SETTINGS = 'Settings',
  QUESTIONS = 'Questions',
  RESULTS = 'Results',
  QUESTION_BANK = 'Question Bank',
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
