import { GetUserWork } from '@shared/api/user.api';
import { GET, PUT } from '@shared/api/utils.api';
import { Topic } from '@shared/models/topic';
import {
  convertTopicFromResponseData,
  convertTopicToRequestData,
} from '../helper/topic.api.helper';
import { GetCourseWork } from './courses.api';

export const GetTopic = (id: string, courseId: string) => {
  return GET(`/course/${courseId}/topic/${id}`).then(
    convertTopicFromResponseData
  );
};

export const UpdateTopic = (topic: Topic, courseId: string) => {
  const data = convertTopicToRequestData(topic);
  return PUT(`/course/${courseId}/topic/${topic.id}`, data).then(
    convertTopicFromResponseData
  );
};

export const GetAllQuizzesOfUser = () => {
  return GetUserWork('quiz');
};

export const GetAllAssignmentsOfUser = () => {
  return GetUserWork('assignment');
};

export const GetAllAssignmentsOfCourse = (courseId: string) => {
  return GetCourseWork(courseId, 'assignment');
};

export const GetAllQuizzesOfCourse = (courseId: string) => {
  return GetCourseWork(courseId, 'quiz');
};

export const GetAllWorksOfCourse = (courseId: string) => {
  return GetCourseWork(courseId, null);
};
