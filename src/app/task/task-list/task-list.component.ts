import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { ExpirationStatus } from '../models/expiration-status.enum';
import { Task } from './../models/task';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-task-list',
  template: `
    <div>
      <ng-container *ngIf="tasks?.length">
        <ul class="list-group">
          <li
            *ngFor="let task of tasks"
            class="list-group-item"
            title="Task Detail"
            [ngStyle]="{
              backgroundColor: itemBackgroundColor(task)
            }"
            (click)="showDetails(task.id)"
          >
            <div class="list-item">
              <div>
                <span class="date-value">{{
                  task?.expirationDate | date: 'dd/MM/yyyy'
                }}</span>
              </div>
              <div class="task-title">
                <b>{{ task?.title }}</b>
              </div>
              <div title="{{ task?.expirationDate | remainingDays }}">
                <i
                  class="fa"
                  [ngClass]="taskStatusIcon(task)"
                  [ngStyle]="{ color: itemBackgroundColor(task) }"
                  aria-hidden="true"
                ></i>
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
        grid-template-columns: 100px auto 1em;
      }
      .empty-list-placeholder {
        color: #535353c7;
      }
      .date-value {
        font-family: monospace;
      }
      .task-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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

  itemBackgroundColor(task: Task): string {
    switch (task.expirationState) {
      case ExpirationStatus.NOT_EXPIRED:
        return '#17f61721';
      case ExpirationStatus.ALMOST_EXPIRED:
        return '#f5ffd58f';
      case ExpirationStatus.EXPIRED:
        return '#ff001c1c';
    }
  }

  taskStatusIcon(task: Task): string {
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
