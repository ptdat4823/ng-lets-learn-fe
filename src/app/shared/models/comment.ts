import { Topic } from "./topic";
import { User } from "./user";

export type Comment = {
  id: string;
  text: string;
  user: User;
  topic: Topic;
  createdAt: string;
};
