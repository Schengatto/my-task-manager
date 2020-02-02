import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from './../../task/models/task';
import { TaskService } from './../../task/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  template: `
    <div>
      <div id="appNavBar" class="page-header">
        <h4 class="ml-2">
          <span style="font-variant: all-small-caps">TASK DETAIL</span>
        </h4>
        <div>
          <button
            type="button"
            class="btn btn-sm btn-secondary m-2"
            (click)="backToTaskList($event)"
          >
            <i class="fa fa-undo" aria-hidden="true"></i>
            <span class="ml-2">Back</span>
          </button>
          <button
            type="button"
            class="btn btn-sm btn-warning m-2"
            (click)="editTask($event)"
          >
            <i class="fa fa-pencil" aria-hidden="true"></i>
            <span class="ml-2">Edit</span>
          </button>
          <button
            type="button"
            class="btn btn-sm btn-danger m-2"
            (click)="deleteTask($event)"
          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            <span class="ml-2">Delete</span>
          </button>
        </div>
      </div>
      <div>
        <app-task-detail *ngIf="selectedTask" [task]="selectedTask">
        </app-task-detail>
      </div>
    </div>
  `,
  styles: [
    `
      #appNavBar {
        display: inline-grid;
        width: 100%;
        grid-template-columns: auto 16em;
      }
    `
  ]
})
export class ShowTaskComponent implements OnInit, OnDestroy {
  public selectedTask: Task = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const id: number = Number(params.get('id'));
        this.selectedTask = this.taskService.getTask(id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

  public backToTaskList(event: Event): void {
    this.taskService.navigateToList();
  }

  public editTask(event: Event): void {
    this.taskService.navigateToTaskEdit(this.selectedTask.id);
  }

  public deleteTask(event: Event): void {
    this.taskService.deleteTask(this.selectedTask.id);
  }
}
