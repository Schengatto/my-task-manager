import { ExpirationStatus } from './expiration-status.enum';
import { TaskStatus } from './task-status.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  state: TaskStatus;
  expirationDate: Date;
  expirationState?: ExpirationStatus;
}
