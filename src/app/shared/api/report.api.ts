import { GET } from '@shared/api/utils.api';
import {
  AssignmentOverallReport,
  AssignmentReport,
  QuizOverallReport,
  QuizReport,
  StudentReport,
} from '@shared/models/report';

export const GetQuizReport = (
  topicId: string,
  courseId: string
): Promise<QuizReport> => {
  const url = `/course/${courseId}/topic/${topicId}/quiz-report`;
  return GET(url);
};

export const GetQuizOverallReport = (
  courseId: string,
  startTime: string,
  endTime: string
): Promise<QuizOverallReport> => {
  const url = `/course/${courseId}/quiz-report?start=${startTime}&end=${endTime}`;
  return GET(url);
};

export const GetAssignmentReport = (
  topicId: string,
  courseId: string
): Promise<AssignmentReport> => {
  const url = `/course/${courseId}/topic/${topicId}/assignment-report`;
  return GET(url);
};

export const GetAssignmentOverallReport = (
  courseId: string,
  startTime: string,
  endTime: string
): Promise<AssignmentOverallReport> => {
  const url = `/course/${courseId}/assignment-report?start=${startTime}&end=${endTime}`;
  return GET(url);
};

export const GetStudentReport = (
  courseId: string,
  startTime: string,
  endTime: string
): Promise<StudentReport> => {
  const url = `/user/me/report?courseId=${courseId}&start=${startTime}&end=${endTime}`;
  return GET(url);
};
