import { ExpirationStatus } from '../models/expiration-status.enum';
import { Task } from './../models/task';
import { TaskStatus } from 'src/app/task/models/task-status.enum';

export class TaskUtils {
  static taskStatusValues(): string[] {
    return Array.from(Object.values(TaskStatus));
  }

  static taskBackgroundColor(task: Task): string {
    switch (task.expirationState) {
      case ExpirationStatus.NOT_EXPIRED:
        return '#17f61721';
      case ExpirationStatus.ALMOST_EXPIRED:
        return '#f5ffd58f';
      case ExpirationStatus.EXPIRED:
        return '#ff001c1c';
    }
  }

  static taskStatusIcon(task: Task): string {
    switch (task.expirationState) {
      case ExpirationStatus.NOT_EXPIRED:
        return 'fa-check text-success';
      case ExpirationStatus.ALMOST_EXPIRED:
        return 'fa-exclamation-triangle text-warning';
      case ExpirationStatus.EXPIRED:
        return 'fa-exclamation-circle text-danger';
    }
  }
}
