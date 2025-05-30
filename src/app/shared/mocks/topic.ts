import { Topic, TopicType } from '@shared/models/topic';
import { mockQuiz } from './quiz';
import { mockAssignment } from './assignment';
import { mockPage } from './page';
import { FileSizeOption } from '@shared/models/assignment';

export const mockTopics: Topic[] = [
  mockQuiz,
  mockAssignment,
  {
    id: '3',
    sectionId: '1',
    type: TopicType.MEETING,
    title: 'Topic Meeting',
    data: {
      description: 'Meeting description',
      open: new Date().toISOString(),
    },
  },
  {
    id: '4',
    sectionId: '1',
    type: TopicType.LINK,
    title: 'Topic Link',
    data: {
      description: 'Link description',
      url: 'https://www.google.com',
    },
  },
  {
    id: '5',
    sectionId: '1',
    type: TopicType.FILE,
    title: 'PMBOK book',
    data: {
      description: 'PMBOK description',
      file: {
        id: '1',
        name: 'PMBOK',
        downloadUrl: 'https://www.google.com',
        displayUrl: 'https://www.google.com',
      },
    },
  },
  mockPage,
  {
    id: '7',
    sectionId: '2',
    type: TopicType.FILE,
    title: 'Astronomy Conception',
    data: {
      description: 'PMBOK description',
      file: {
        id: '1',
        name: 'PMBOK',
        downloadUrl: 'https://www.google.com',
        displayUrl: 'https://www.google.com',
      },
    },
  },
  {
    id: '8',
    title: 'Additional project',
    sectionId: '2',
    type: TopicType.ASSIGNMENT,
    data: {
      open: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
      close: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
      description:
        'Write a minimum of 500 words on what you would need to take into consideration if you were to spend a night in the Alps. Justify your choices.',
      remindToGrade: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
      maximumFile: 1,
      maximumFileSize: FileSizeOption['5MB'],
    },
  }
];
