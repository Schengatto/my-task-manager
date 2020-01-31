import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../task/services/task.service';

@Component({
  template: `
    <div class="card">
      <div class="card-header text-center">
      <h1>Elenco Task</h1>
      </div>

      <div class="card-body">
        <app-task-list></app-task-list>
      </div>

      <div class="card-footer text-center">
        <button (click)="createNewTask($event)" class="btn btn-md btn-info">
        <i class="fa fa-plus" aria-hidden="true"></i>
        <span class="ml-2">Nuovo Task</span>
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ListComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  createNewTask(event: Event): void {
    this.taskService.navigateToTaskCreation();
  }
}
