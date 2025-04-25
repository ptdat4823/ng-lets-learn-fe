import { Course } from '@shared/models/course';
import { Topic } from '@shared/models/topic';

export type CalendarRange = {
  start: Date;
  end: Date;
};
export type TopicItem = {
  startTime: Date | null;
  endTime: Date | null;
  topic: Topic;
  course?: Course;
};
export type DateItem = {
  date: Date;
  topicItems: TopicItem[];
};
