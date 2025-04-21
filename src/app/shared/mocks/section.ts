import { Section } from '@shared/models/course';
import { mockTopics } from './topic';

export const mockSections: Section[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Introduction',
    description:
      'Welcome everyone! Below is some documents needed for this course. Hope all of you enjoy this course.',
    topics: mockTopics.filter((topic) => topic.sectionId === '1'),
    position: 1,
  },
  {
    id: '2',
    courseId: '1',
    title: 'Lesson 1',
    description: null,
    topics: mockTopics.filter((topic) => topic.sectionId === '2'),
    position: 2,
  },
  {
    id: '3',
    courseId: '1',
    title: 'Lesson 2',
    description: null,
    topics: mockTopics.filter((topic) => topic.sectionId === '3'),
    position: 3,
  },
];
