import { GET, POST, PUT } from '@shared/api/utils.api';
import { Question } from '@shared/models/question';
import {
  convertQuestionFromResponseData,
  convertQuestionToRequestData,
} from '../helper/question.api.helper';

export const CreateQuestion = (
  question: Question,
  courseId: string
): Promise<Question> => {
  const data = convertQuestionToRequestData(question, courseId);
  return POST('/question', data).then(convertQuestionFromResponseData);
};

export const GetQuestion = (id: string) => {
  return GET(`/question/${id}`).then(convertQuestionFromResponseData);
};

export const UpdateQuestion = (question: Question, courseId: string) => {
  const data = convertQuestionToRequestData(question, courseId);
  return PUT(`/question/${question.id}`, data).then(
    convertQuestionFromResponseData
  );
};

export const getQuestionBank = (courseId: string) => {
  return GET(`/question?courseId=${courseId}`).then((res) =>
    res.map(convertQuestionFromResponseData)
  );
};
