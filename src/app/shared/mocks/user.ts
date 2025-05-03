import { Role, User } from '@shared/models/user';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'Ptdat',
    email: 'ptdat@gmail.com',
    avatar: '',
    courses: [],
    password: '',
    role: Role.STUDENT,
  },
];
