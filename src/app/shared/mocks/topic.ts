import { Topic, TopicType } from '@shared/models/topic';
import { mockQuiz } from './quiz';
import { mockAssignment } from './assignment';
import { mockPage } from './page';

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
];
