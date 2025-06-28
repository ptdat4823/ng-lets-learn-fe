import { GET, POST, DELETE } from '@shared/api/utils.api';

// Get all comments for a topic
export const getComments = (courseId: string, topicId: string) => {
  return GET(`/course/${courseId}/topic/${topicId}/comments`); // .then(res => res.map(convertCommentFromResponseData))
};

// Create a new comment for a topic
export const createComment = (courseId: string, topicId: string, comment: any) => {
  return POST(`/course/${courseId}/topic/${topicId}/comments`, comment); // .then(convertCommentFromResponseData)
};

// Delete a comment by id
export const deleteComment = (courseId: string, topicId: string, commentId: string) => {
  return DELETE(`/course/${courseId}/topic/${topicId}/comments/${commentId}`);
};
