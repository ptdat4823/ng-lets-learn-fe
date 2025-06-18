import { Question, QuestionType } from '@shared/models/question';
import { AssignmentTopic, QuizTopic } from '@shared/models/topic';
import { convertChoiceQuestionToRequestData } from './choice-question.api.helper';
import { convertShortAnswerQuestionToRequestData } from './short-answer-question.api.helper';
import { convertTrueFalseQuestionToRequestData } from './true-false-question.api.helper';
import { convertQuestionFromResponseData } from './question.api.helper';
import { convertQuizResponseFromResponseData } from './quiz-response.api.helper';

const removeTempIdInQuestions = (questions: Question[]) => {
  return questions.map((question) => {
    if (question.type === QuestionType.CHOICE)
      return convertChoiceQuestionToRequestData(question);
    else if (question.type === QuestionType.SHORT_ANSWER)
      return convertShortAnswerQuestionToRequestData(question);
    else if (question.type === QuestionType.TRUE_FALSE)
      return convertTrueFalseQuestionToRequestData(question);
    return question;
  });
};

export const convertQuizToRequestData = (quiz: QuizTopic) => {
  const { id, data, response, ...others } = quiz;
  let reqData = {
    ...others,
    id: id.length === 4 ? null : id,
  };
  if (!data) return reqData;

  const { questions } = data;
  const convertedData = {
    ...data,
    questions: removeTempIdInQuestions(questions),
  };

  return {
    ...reqData,
    data: JSON.stringify(convertedData),
  };
};

export const convertQuizFromResponseData = (quiz: any): QuizTopic => {
  const parsedData = quiz.data ? JSON.parse(quiz.data) : null;
  const convertedQuestions = parsedData
    ? parsedData.questions.map((q: any) => convertQuestionFromResponseData(q))
    : [];
  const parsedResponse = quiz.response ? JSON.parse(quiz.response) : undefined;
  let res = {
    ...quiz,
    data: {
      ...parsedData,
      questions: convertedQuestions,
    },
    response: parsedResponse
      ? parsedResponse.map(convertQuizResponseFromResponseData)
      : undefined,
  };

  return res as QuizTopic;
};
