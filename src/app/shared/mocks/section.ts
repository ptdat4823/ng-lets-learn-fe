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
  // Computer Science Course sections
  {
    id: '4',
    courseId: '2',
    title: 'Programming Fundamentals',
    description: 'Learn the basics of programming and computer science.',
    topics: mockTopics.filter((topic) => topic.sectionId === '4'),
    position: 1,
  },
  {
    id: '5',
    courseId: '2',
    title: 'Data Structures',
    description: 'Understanding arrays, lists, trees, and graphs.',
    topics: mockTopics.filter((topic) => topic.sectionId === '5'),
    position: 2,
  },
  // Engineering Course sections
  {
    id: '6',
    courseId: '3',
    title: 'Engineering Principles',
    description: 'Core principles and methodologies in engineering.',
    topics: mockTopics.filter((topic) => topic.sectionId === '6'),
    position: 1,
  },
  {
    id: '7',
    courseId: '3',
    title: 'Project Management',
    description: 'Learn project management techniques for engineering projects.',
    topics: mockTopics.filter((topic) => topic.sectionId === '7'),
    position: 2,
  },
  // Filming Course sections
  {
    id: '8',
    courseId: '4',
    title: 'Camera Basics',
    description: 'Understanding camera operation and techniques.',
    topics: mockTopics.filter((topic) => topic.sectionId === '8'),
    position: 1,
  },
  {
    id: '9',
    courseId: '4',
    title: 'Post-Production',
    description: 'Video editing and post-production workflows.',    topics: mockTopics.filter((topic) => topic.sectionId === '9'),
    position: 2,
  },
  // Music Course sections
  {
    id: '10',
    courseId: '5',
    title: 'Music Theory',
    description: 'Learn the fundamentals of music theory.',
    topics: mockTopics.filter((topic) => topic.sectionId === '10'),
    position: 1,
  },
  {
    id: '11',
    courseId: '5',
    title: 'Composition',
    description: 'Learn to compose your own music.',
    topics: mockTopics.filter((topic) => topic.sectionId === '11'),
    position: 2,
  },
];
