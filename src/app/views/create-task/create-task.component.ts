import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from './../../task/services/task.service';
import { TaskStatus } from 'src/app/task/models/task-status.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  template: `
    <div class="card">
      <div class="card-header text-center">
        <h1>Creazione nuovo Task</h1>
      </div>

      <div class="card-body">
        <app-task-form
          [taskForm]="taskForm"
        ></app-task-form>
      </div>

      <div class="card-footer">
        <div id="newTaskButton" class="row justify-content-center">
          <div class="col-1">
            <button class="btn btn-secondary" (click)="backToTaskList($event)">
            <i class="fa fa-undo" aria-hidden="true"></i>
            <span class="ml-2">Torna alla lista</span>
            </button>
          </div>
          <div class="col-1">
            <button
              class="btn btn-success"
              (click)="saveCurrentTask($event)"
              [disabled]="!taskForm.valid"
            >
            <i class="fa fa-floppy-o" aria-hidden="true"></i>
            <span class="ml-2">Salva Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      textarea {
        resize: none;
      }
    `
  ]
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup = null;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      state: new FormControl(TaskStatus.INSERITO),
      expirationDate: new FormControl(null, Validators.required)
    });
  }

  public backToTaskList(event: Event): void {
    this.taskService.navigateToList();
  }

  public saveCurrentTask(event: Event): void {
    if (this.taskForm.valid) {
      this.taskService.createTask({
        id: new Date().getTime(),
        title: this.taskForm.get('title').value,
        description: this.taskForm.get('description').value,
        state: TaskStatus.INSERITO,
        expirationDate: this.taskForm.get('expirationDate').value
      });
    }
  }
}
