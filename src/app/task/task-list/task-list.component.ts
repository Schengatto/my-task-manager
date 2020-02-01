import { Task } from './../models/task';
import { TaskService } from './../services/task.service';
import { Component, OnInit, Input } from '@angular/core';
import { ArrayUtils } from './../../utils/array-utils';
import { SearchFilters } from './../models/search-form';

@Component({
  selector: 'app-task-list',
  template: `
    <div>
      <ng-container *ngIf="tasks?.length">
        <ul class="list-group">
          <li
            *ngFor="let task of tasks"
            class="list-group-item"
            (click)="showDetails(task.id)"
            title="Dettaglio Task"
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
        <p>Non sono presenti task.</p>
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
    `
  ]
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  @Input() tasks: Task[] = [];

  ngOnInit() {}

  showDetails(taskId: number): void {
    this.taskService.showTaskDetails(taskId);
  }

}
