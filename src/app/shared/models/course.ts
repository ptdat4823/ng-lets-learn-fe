import { Topic } from './topic';
import { User } from './user';

// export type Category = {
//   id: string;
//   name: string;
// };

export type Course = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  category: string;
  level: string;
  students: User[];
  creator: User;
  sections: Section[];
  isPublished: boolean;
};

export type Section = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  position: number;
  topics: Topic[];
};
