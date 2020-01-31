import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from './../../task/models/task';
import { TaskService } from './../../task/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  template: `
    <div class="card">
      <div class="card-header text-center">
        <h1>Dettaglio Task</h1>
      </div>
      <div class="card-body">
        <app-task-detail *ngIf="selectedTask" [task]="selectedTask">
        </app-task-detail>
      </div>
      <div class="card-footer text-center">
        <div>
          <button
            type="button"
            class="btn btn-secondary m-2"
            (click)="backToTaskList($event)"
          >
            <i class="fa fa-undo" aria-hidden="true"></i>
            <span class="ml-2">Torna alla lista</span>
          </button>
          <button
            type="button"
            class="btn btn-primary m-2"
            (click)="editTask($event)"
          >
            <i class="fa fa-pencil" aria-hidden="true"></i>
            <span class="ml-2">Modifica Task</span>
          </button>
          <button
            type="button"
            class="btn btn-danger m-2"
            (click)="deleteTask($event)"
          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            <span class="ml-2">Elimina Task</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
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
