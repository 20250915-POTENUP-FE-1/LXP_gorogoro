import { authHandlers } from './auth';
import { userHandlers } from './user';
import { cartHandlers } from './cart';
import { courseHandlers } from './course';
import { categoryHandlers } from '@/mocks/handlers/category';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...cartHandlers,
  ...courseHandlers,
  ...categoryHandlers,
];
