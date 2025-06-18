import {
  ChoiceQuestion,
  Question,
  QuestionType,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from '@shared/models/question';
import { convertChoiceQuestionToRequestData } from './choice-question.api.helper';
import { convertShortAnswerQuestionToRequestData } from './short-answer-question.api.helper';
import { convertTrueFalseQuestionToRequestData } from './true-false-question.api.helper';

export const convertQuestionToRequestData = (
  question: Question,
  courseId: string = ''
) => {
  const { type } = question;
  if (type === QuestionType.CHOICE) {
    return convertChoiceQuestionToRequestData(question, courseId);
  } else if (type === QuestionType.SHORT_ANSWER) {
    return convertShortAnswerQuestionToRequestData(question, courseId);
  }
  return convertTrueFalseQuestionToRequestData(question, courseId);
};

export const convertQuestionFromResponseData = (data: any): Question => {
  let {
    id,
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue,
    feedbackOfFalse,
    correctAnswer,
    multiple,
    choices,
    createdAt,
    createdBy,
    modifiedBy,
    updatedAt,
  } = data;

  const choiceQuestion: ChoiceQuestion = {
    choices,
    multiple,
  };
  const shortAnswerQuestion: ShortAnswerQuestion = {
    choices,
  };
  const trueFalseQuestion: TrueFalseQuestion = {
    correctAnswer,
    feedbackOfTrue,
    feedbackOfFalse,
  };

  //Choice question default value
  const question: Question = {
    id,
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    data: choiceQuestion,
    createdAt,
    modifiedAt: updatedAt,
    createdBy,
    modifiedBy,
  };

  if (type === QuestionType.SHORT_ANSWER) {
    question.data = shortAnswerQuestion;
  } else if (type === QuestionType.TRUE_FALSE) {
    question.data = trueFalseQuestion;
  }
  return question;
};
