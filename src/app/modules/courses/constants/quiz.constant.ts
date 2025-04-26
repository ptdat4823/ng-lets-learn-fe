export enum QuizTab {
  QUIZ = 'Quiz',
  SETTINGS = 'Settings',
  QUESTIONS = 'Questions',
  RESULTS = 'Results',
  QUESTION_BANK = 'Question Bank',
}
export const QUIZ_TABS = Object.values(QuizTab);

export enum QuestionResult {
  NOT_SHOW = 'Not Show',
  FULL_MARK = 'Full mark',
  PARTIAL_MARK = 'Partial mark',
  ZERO_MARK = 'Zero mark',
}
