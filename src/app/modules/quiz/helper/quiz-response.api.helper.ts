import {
  QuizAnswer,
  QuizResponseData,
  StudentResponse,
} from '@shared/models/student-response';

export const convertQuizResponseToRequestData = (
  quizResponse: StudentResponse
) => {
  const { topicId, data } = quizResponse;
  const { answers, status, completedAt, startedAt } = data as QuizResponseData;
  return {
    id: null,
    topicId,
    status,
    startedAt,
    completedAt,
    answers: answers.map(convertQuizResponseAnswerToRequestData),
  };
};

export const convertQuizResponseFromResponseData = (
  data: any
): StudentResponse => {
  const { id, topicId, student, status, startedAt, completedAt, answers } =
    data;
  const res: StudentResponse = {
    id,
    topicId,
    student,
    data: {
      status,
      startedAt,
      completedAt,
      answers: answers.map(convertQuizResponseAnswerFromResponseData),
    },
  };
  return res;
};

export const convertQuizResponseAnswerToRequestData = (answers: QuizAnswer) => {
  const { question, answer, mark } = answers;
  return {
    question: JSON.stringify(question),
    answer,
    mark,
  };
};

export const convertQuizResponseAnswerFromResponseData = (
  data: any
): QuizAnswer => {
  const { question, answer, mark } = data;
  return {
    question: JSON.parse(question),
    answer,
    mark,
  };
};
