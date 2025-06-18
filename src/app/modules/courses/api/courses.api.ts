import { GET, PATCH, POST, PUT } from '@shared/api/utils.api';
import { Course } from '@shared/models/course';
import {
  convertCourseFromResponseData,
  convertCourseToCreateRequestData,
  convertCourseToUpdateRequestData,
  convertCourseWorkFromResponseData,
} from '../helper/courses.api.helper';

export const CreateCourse = (course: Course) => {
  let data = convertCourseToCreateRequestData(course);
  return POST('/course', data).then(convertCourseFromResponseData);
};

export const GetPublicCourses = () => {
  return GET('/course').then(convertCourseFromResponseData);
};

export const GetTeacherCourses = (userId: string): Promise<Course[]> => {
  return GET(`/course?userId=${userId}`).then((res) =>
    res.map(convertCourseFromResponseData)
  );
};

export const UpdateCourse = (course: Course) => {
  const data = convertCourseToUpdateRequestData(course);
  return PUT(`/course/${course.id}`, data).then(convertCourseFromResponseData);
};

export const JoinCourse = (courseId: string): Promise<void> => {
  return PATCH(`/course/${courseId}/join`);
};

// Get working topics of courses (E.g. quizzes, assignments)
export const GetCourseWork = (
  courseId: string,
  type: 'quiz' | 'assignment' | 'meeting' | null
) => {
  const url = type
    ? `/course/${courseId}/work?type=${type}`
    : `/course/${courseId}/work`;
  return GET(url).then(convertCourseWorkFromResponseData);
};
