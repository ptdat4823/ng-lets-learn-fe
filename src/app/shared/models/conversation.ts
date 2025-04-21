import { ChatMessage } from "./message";
import { User } from "./user";

export type Conversation = {
  id: string;
  user1: User;
  user2: User;
  messages: ChatMessage[];
};

export type SocketMessage = {
  conversationId: string;
  senderId: string;
  content: string;
};
