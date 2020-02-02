import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from './../../task/services/task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class CreateTaskComponent implements OnInit, OnDestroy {
  taskForm: FormGroup = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const taskStatus: string = params.get('taskStatus');
      this.taskForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        state: new FormControl(taskStatus),
        expirationDate: new FormControl(null, Validators.required)
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
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
