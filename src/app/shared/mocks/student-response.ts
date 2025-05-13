import { QuizStatus, StudentResponse } from '@shared/models/student-response';
import { mockUsers } from './user';

export const mockStudentResponses: StudentResponse[] = [
  {
    id: '1',
    student: mockUsers[0],
    topicId: '1',
    data: {
      status: QuizStatus.FINISHED,
      startedAt: new Date(2025, 3, 25, 17, 30, 0, 0).toISOString(),
      completedAt: new Date(2025, 3, 25, 18, 30, 0, 0).toISOString(),
      answers: [],
    },
  },
  {
    id: '2',
    student: mockUsers[1],
    topicId: '1',
    data: {
      status: QuizStatus.NOT_FINISHED,
      startedAt: new Date(2025, 3, 25, 10, 30, 0, 0).toISOString(),
      completedAt: new Date(2025, 3, 25, 11, 30, 0, 0).toISOString(),
      answers: [],
    },
  },
];

export const mockAssignmentResponses: StudentResponse[] = [
  {
    id: '1',
    student: mockUsers[2],
    topicId: '1',
    data: {
      submittedAt: new Date(2025, 3, 25, 17, 30, 0, 0).toISOString(),
      files: [],
      mark: null,
      note: '',
    },
  },
  {
    id: '2',
    student: mockUsers[1],
    topicId: '1',
    data: {
      submittedAt: new Date(2025, 3, 25, 10, 30, 0, 0).toISOString(),
      files: [],
      mark: null,
      note: '',
    },
  },
];
