import { Course } from '@shared/models/course';
import { convertSectionFromResponseData } from './section.api.helper';
import { Topic, TopicType } from '@shared/models/topic';
import { convertAssignmentFromResponseData } from '@modules/assignment/helper/assignment.api.helper';
import { convertQuizFromResponseData } from '@modules/quiz/helper/quiz.api.helper';

export const convertCourseToCreateRequestData = (course: Course) => {
  return {
    title: course.title,
    description: '',
    imageUrl: '',
    price: course.price > 0 ? course.price : null,
    category: course.category,
    level: course.level,
    isPublished: course.isPublished,
  };
};

export const convertCourseToUpdateRequestData = (course: Course) => {
  return {
    title: course.title,
    price: course.price,
    category: course.category,
    level: course.level,
    isPublished: course.isPublished,
    imageUrl: course.imageUrl,
  };
};

export const convertCourseFromResponseData = (data: any): Course => {
  const sectionData = Array.isArray(data.sections) ? data.sections : [];
  const res = {
    ...data,
    sections: sectionData.map((section: any) =>
      convertSectionFromResponseData(section)
    ),
  };
  return res;
};

export const convertCourseWorkFromResponseData = (data: any): Topic[] => {
  return data.map((item: any) => {
    if (item.type === TopicType.ASSIGNMENT)
      return convertAssignmentFromResponseData(item);
    if (item.type === TopicType.QUIZ) return convertQuizFromResponseData(item);
    return item;
  });
};
