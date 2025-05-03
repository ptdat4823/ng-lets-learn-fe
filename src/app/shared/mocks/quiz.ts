import { GradingMethod, TimeLimitType } from '@shared/models/quiz';
import { QuizTopic, TopicType } from '@shared/models/topic';
import { mockQuestions } from './question';

export const mockQuiz: QuizTopic = {
  id: '1',
  title: 'Review basic Astronomy knowledge',
  sectionId: '1',
  type: TopicType.QUIZ,
  data: {
    open: new Date(2025, 3, 24, 17, 30, 0, 0).toISOString(),
    close: new Date(2025, 3, 26, 18, 30, 0, 0).toISOString(),
    description:
      'This quiz contains a variety of questions to test your basic knowledge of Astronomy. At the end of the quiz you will be given your score with suggestions for improvement.',
    timeLimit: null,
    timeLimitUnit: TimeLimitType.HOURS,
    gradeToPass: 5,
    gradingMethod: GradingMethod.HIGHEST_GRADE,
    attemptAllowed: 'Unlimited',
    questions: mockQuestions.slice(0, 6),
  },
};
