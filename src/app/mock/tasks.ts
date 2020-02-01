import { Task } from '../task/models/task';
import { TaskStatus } from '../task/models/task-status.enum';

export const MOCKED_TASKS: Task[] = [
  {
    id: 1,
    title: 'Task di Prova 1',
    description: 'Task di prova numero 1',
    expirationDate: new Date('2019-02-15'),
    state: TaskStatus.TODO
  },
  {
    id: 2,
    title: 'Task di Prova 2',
    description: 'Task di prova numero 2!',
    expirationDate: new Date('2020-03-02'),
    state: TaskStatus.DOING
  }
];
