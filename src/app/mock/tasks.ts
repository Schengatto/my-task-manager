import { Task } from '../task/models/task';
import { TaskStatus } from '../task/models/task-status.enum';

export const MOCKED_TASKS: Task[] = [
  {
    id: 1,
    title: 'Today - DOING',
    description: 'Test task - just remove me',
    expirationDate: new Date(),
    state: TaskStatus.DOING
  },
  {
    id: 2,
    title: 'First day of year',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-01-01'),
    state: TaskStatus.COMPLETED
  },
  {
    id: 3,
    title: 'Easter day',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-04-12'),
    state: TaskStatus.TODO
  },
  {
    id: 4,
    title: 'Demo #1',
    description: 'Test task - just remove me',
    expirationDate: new Date('2019-12-25'),
    state: TaskStatus.TODO
  },
  {
    id: 5,
    title: 'Demo #2',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-02-10'),
    state: TaskStatus.TODO
  },
  {
    id: 6,
    title: 'Demo #3',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-01-30'),
    state: TaskStatus.TODO
  },
  {
    id: 7,
    title: 'Demo #4',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-06-29'),
    state: TaskStatus.TODO
  },
  {
    id: 8,
    title: 'Demo #5',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-09-30'),
    state: TaskStatus.TODO
  },
  {
    id: 9,
    title: 'Demo #6',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-02-11'),
    state: TaskStatus.TODO
  },
  {
    id: 10,
    title: 'Demo #7',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-04-22'),
    state: TaskStatus.TODO
  },
  {
    id: 11,
    title: 'Demo #8',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-01-29'),
    state: TaskStatus.TODO
  },
  {
    id: 12,
    title: 'Demo #9',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-03-02'),
    state: TaskStatus.TODO
  },
  {
    id: 13,
    title: 'Demo #10',
    description: 'Test task - just remove me',
    expirationDate: new Date(),
    state: TaskStatus.TODO
  },
  {
    id: 14,
    title: 'Demo #11',
    description: 'Test task - just remove me',
    expirationDate: new Date(),
    state: TaskStatus.TODO
  },
  {
    id: 15,
    title: 'Demo #12',
    description: 'Test task - just remove me',
    expirationDate: new Date('2020-03-13'),
    state: TaskStatus.TODO
  }
];
