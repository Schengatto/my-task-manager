import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from './../../task/services/task.service';
import { TaskStatus } from 'src/app/task/models/task-status.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  template: `
    <div class="card">
      <div class="card-header text-center header-bg">
        <h1>New Task</h1>
      </div>

      <div class="card-body">
        <app-task-form [taskForm]="taskForm"></app-task-form>
      </div>

      <div class="card-footer text-center">
        <div id="newTaskButtons">
          <button
            class="btn btn-secondary m-2"
            (click)="backToTaskList($event)"
          >
            <i class="fa fa-undo" aria-hidden="true"></i>
            <span class="ml-2">Back to List</span>
          </button>
          <button
            class="btn btn-success m-2"
            (click)="saveCurrentTask($event)"
            [disabled]="!taskForm.valid"
          >
            <i class="fa fa-floppy-o" aria-hidden="true"></i>
            <span class="ml-2">Save Task</span>
          </button>
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
      state: new FormControl(TaskStatus.TODO),
      expirationDate: new FormControl(null, Validators.required)
    });
  }

  public backToTaskList(event: Event): void {
    this.taskService.navigateToList();
  }

  public saveCurrentTask(event: Event): void {
    if (this.taskForm.valid) {
      this.taskService.updateTask({
        id: new Date().getTime(),
        title: this.taskForm.get('title').value,
        description: this.taskForm.get('description').value,
        state: this.taskForm.get('state').value,
        expirationDate: this.taskForm.get('expirationDate').value
      });
    }
  }
}
