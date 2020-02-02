import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskService } from './../../task/services/task.service';
import { Task } from './../../task/models/task';
import { SearchFilters } from './../../task/models/search-form';
import { TaskStatus } from 'src/app/task/models/task-status.enum';

@Component({
  template: `
    <div>
      <div class="page-header">
        <div id="appNavBar">
          <button
            class="btn btn-sm btn-outline-light"
            (click)="handleSearchFiltersPanel($event)"
            title="Search Panel"
          >
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
          <h5 class="ml-2">
            Task Manager - <span style="font-variant: all-small-caps">DASHBOARD</span>
          </h5>
        </div>
        <div *ngIf="searchFilterPanelVisible" id="searchFormContainer">
          <app-task-search-form
            (handleSearch)="handleSearch($event)"
          ></app-task-search-form>
        </div>
      </div>

      <div class="card-body border-dark">
        <div class="row">
          <div *ngFor="let status of statusList" class="col-lg-4">
            <div class="dashboard-container">
              <div class="text-center mb-2 text-primary">
                <div class="new-task-btn">
                  <button
                    (click)="createNewTask(status)"
                    class="btn btn-sm btn-info"
                    title="Create new task"
                  >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
                <div style="font-variant: all-small-caps;">
                  <strong>{{ status }}</strong>
                </div>
              </div>
              <div class="task-list-container">
                <app-task-list
                  [tasks]="getTaskWithStatus(status)"
                ></app-task-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #appNavBar {
        display: inline-grid;
        grid-template-columns: 2em auto;
      }

      .dashboard-container {
        border: 1px solid #138496;
        border-radius: 0.25rem;
        margin: 1em 0 1em 0;
        padding: 0.5em;
        position: relative;
      }

      .task-list-container {
        max-height: 80vh;
        overflow: auto;
        padding: 0.5em;
      }

      .task-list-container::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #f5f5f5;
        border-radius: 10px;
      }

      .task-list-container::-webkit-scrollbar {
        width: 12px;
        background-color: #f5f5f5;
      }

      .task-list-container::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #fff;
        background-image: -webkit-gradient(
          linear,
          40% 0%,
          75% 84%,
          from(#1fa2b8a3),
          to(#1fa2b8a3),
          color-stop(0.6, #1fa2b8d4)
        );
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
  public searchFilterPanelVisible = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    Object.values(TaskStatus).filter(status => this.statusList.push(status));

    // First Search on component init
    const filters: SearchFilters = {
      titleOrDescription: null,
      expirationDateFrom: null,
      expirationDateTo: null,
      orderBy: 'expirationDate'
    };
    this.handleSearch(filters);
  }

  createNewTask(taskStatus: string): void {
    this.taskService.navigateToTaskCreation(taskStatus);
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

  handleSearchFiltersPanel(event: Event): void {
    this.searchFilterPanelVisible = !this.searchFilterPanelVisible;
  }
}
