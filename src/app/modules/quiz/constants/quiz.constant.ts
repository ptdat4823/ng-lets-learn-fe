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

export const questionTypeDescriptionMap: Record<QuestionType, string> = {
  [QuestionType.TRUE_FALSE]:
    "A simple form of multiple choice question with just the two choices 'True' and 'False'.",
  [QuestionType.CHOICE]:
    'A question with multiple options where the user selects one or more correct answers.',
  [QuestionType.SHORT_ANSWER]:
    'A question that requires a short text answer, typically a few words or a sentence.',
};
