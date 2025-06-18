import { Question, TrueFalseQuestion } from '@shared/models/question';

export const convertTrueFalseQuestionToRequestData = (
  question: Question,
  courseId?: string // just need when CRUD with question bank
) => {
  const {
    id,
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    createdAt,
    createdBy,
    modifiedBy,
  } = question;
  const { correctAnswer, feedbackOfFalse, feedbackOfTrue } =
    question.data as TrueFalseQuestion;

  let reqData = {
    id: id.length === 4 ? null : id,
    topicQuizId: topicQuizId ?? null,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue,
    feedbackOfFalse,
    correctAnswer,
    multiple: false,
    choices: [],
    course: {
      id: courseId,
    },
    createdAt,
    createdBy,
    modifiedBy,
    updatedAt: null,
    deletedAt: null,
  };
  return reqData;
};
