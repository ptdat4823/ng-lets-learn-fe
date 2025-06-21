import { Topic } from '@shared/models/topic';

export interface ReviewItem {
  id: string;
  title: string;
  course: string;
  type: string;
  status: 'work-in-progress' | 'closed' | 'no-due-date';
  graded: number;
  submitted: number;
  assigned: number;
  attempted?: number;
  icon: string;
  topic: Topic;
}

export interface ReviewItemsCategories {
  workInProgress: ReviewItem[];
  closed: ReviewItem[];
  noDueDate: ReviewItem[];
}
