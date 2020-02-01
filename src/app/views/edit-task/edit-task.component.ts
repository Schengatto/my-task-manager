import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from './../../task/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from './../../task/models/task';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskStatus } from 'src/app/task/models/task-status.enum';

@Component({
  template: `
    <div class="card">
      <div class="card-header text-center">
        <h1>Edit Task</h1>
      </div>

      <div class="card-body">
        <app-task-form [taskForm]="taskForm"></app-task-form>
      </div>

      <div class="card-footer text-center">
        <div id="newTaskButton" class="row">
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
  styles: []
})
export class EditTaskComponent implements OnInit, OnDestroy {
  taskForm: FormGroup = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const id: number = Number(params.get('id'));
        const taskToEdit: Task = this.taskService.getTask(id);
        this.taskForm = new FormGroup({
          id: new FormControl(taskToEdit.id, Validators.required),
          title: new FormControl(taskToEdit.title, Validators.required),
          description: new FormControl(
            taskToEdit.description,
            Validators.required
          ),
          state: new FormControl(taskToEdit.state),
          expirationDate: new FormControl(
            taskToEdit.expirationDate,
            Validators.required
          )
        });
      })
    );
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
        id: this.taskForm.get('id').value,
        title: this.taskForm.get('title').value,
        description: this.taskForm.get('description').value,
        state: this.taskForm.get('state').value,
        expirationDate: this.taskForm.get('expirationDate').value
      });
    }
  }
}
