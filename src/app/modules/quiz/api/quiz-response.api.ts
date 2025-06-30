import { GET, POST } from '@shared/api/utils.api';
import {
  convertQuizResponseFromResponseData,
  convertQuizResponseToRequestData,
} from '../helper/quiz-response.api.helper';
import { StudentResponse } from '@shared/models/student-response';

export const GetQuizResponse = (topicId: string, quizResponseId: string) => {
  return GET(`/topic/${topicId}/quiz-response/${quizResponseId}`).then(
    convertQuizResponseFromResponseData
  );
};

export const CreateQuizResponse = (
  topicId: string,
  quizResponse: StudentResponse
) => {
  const data = convertQuizResponseToRequestData(quizResponse);
  return POST(`/topic/${topicId}/quiz-response`, data).then(
    convertQuizResponseFromResponseData
  );
};

export const GetAllQuizResponsesOfTopic = (
  topicId: string
): Promise<StudentResponse[]> => {
  return GET(`/topic/${topicId}/quiz-response`).then((res) =>
    res.map(convertQuizResponseFromResponseData)
  );
};

export const GetAllQuizResponsesOfUser = (userId: string) => {
  return GET(`/user/${userId}/quiz-responses`).then((res) =>
    res.map(convertQuizResponseFromResponseData)
  );
};
