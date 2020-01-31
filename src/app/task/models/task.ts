import { TaskStatus } from './task-status.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  state: TaskStatus;
  expirationDate: Date;
}
