import { Task } from './../models/task';
import { TaskService } from './../services/task.service';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-task-list',
  template: `
    <div>
      <ng-container *ngIf="tasks?.length">
        <ul class="list-group">
          <li
            *ngFor="let task of tasks"
            class="list-group-item"
            title="Dettaglio Task"
            [ngStyle]="{
              backgroundColor: itemBackgroundColor(task.expirationDate)
            }"
            (click)="showDetails(task.id)"
          >
            <div class="list-item">
              <div>
                <i>{{ task?.expirationDate | date: 'dd/MM/yyyy' }}</i>
              </div>
              <div>
                <b>{{ task?.title }}</b>
              </div>
              <div>
                <small>{{ task?.expirationDate | remainingDays }}</small>
              </div>
            </div>
          </li>
        </ul>
      </ng-container>
      <ng-container *ngIf="!tasks?.length">
        <div class="text-center empty-list-placeholder">
          <small><i>Empty</i></small>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .list-group-item {
        cursor: pointer;
      }
      .list-group-item:hover {
        background-color: cornsilk;
      }
      .list-item {
        display: grid;
        grid-template-columns: 100px 50% auto;
      }
      .empty-list-placeholder {
        color: #535353c7;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  @Input() tasks: Task[] = [];

  ngOnInit() {}

  showDetails(taskId: number): void {
    this.taskService.showTaskDetails(taskId);
  }

  itemBackgroundColor(expirationDate: string): string {
    return new Date(expirationDate) >= new Date() ? '#17f61721' : '#ff001c1c';
  }
}
