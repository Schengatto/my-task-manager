import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskService } from './../../task/services/task.service';
import { Task } from './../../task/models/task';
import { SearchFilters } from './../../task/models/search-form';
import { TaskStatus } from 'src/app/task/models/task-status.enum';

@Component({
  template: `
    <div class="card">
      <div class="card-header text-center text-white bg-dark">
        <h1>DASHBOARD</h1>
      </div>

      <div class="card-body border-dark">
        <div id="searchFormContainer">
          <app-task-search-form
            (handleSearch)="handleSearch($event)"
          ></app-task-search-form>
        </div>

        <hr />

        <div class="row">
          <div *ngFor="let status of statusList" class="col-lg-4">
            <div class="list-container">
              <div class="text-center mb-2 mt-2 text-danger">
                <div class="new-task-btn">
                  <button
                    (click)="createNewTask($event)"
                    class="btn btn-sm btn-warning"
                    title="Create new task"
                  >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
                <div>
                  <strong>{{ status }}</strong>
                </div>
              </div>
              <app-task-list
                [tasks]="getTaskWithStatus(status)"
              ></app-task-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .list-container {
        border: 1px solid #80808047;
        margin: 1em 0 1em 0;
        padding: 0.5em;
        position: relative;
      }

      .new-task-btn {
        position: absolute;
        right: 0;
        top: 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  public tasksMap: Map<string, Task[]> = new Map<string, Task[]>();
  public statusList: string[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    Object.values(TaskStatus).filter(status => this.statusList.push(status));
  }

  createNewTask(event: Event): void {
    this.taskService.navigateToTaskCreation();
  }

  handleSearch(searchFilters: SearchFilters): void {
    this.tasksMap = this.taskService
      .getTasks(searchFilters)
      .reduce((map, task) => {
        const status = task.state;
        map.has(status) ? map.get(status).push(task) : map.set(status, [task]);
        return map;
      }, new Map<string, Task[]>());
  }

  getTaskWithStatus(status: string): Task[] {
    return this.tasksMap.get(status);
  }
}
