import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaskStatus } from 'src/app/task/models/task-status.enum';

@Component({
  selector: 'app-task-form',
  template: `
    <div id="newTaskFormContainer">
      <form [formGroup]="taskForm">
        <div class="form-group">
          <label for="newTaskTitle" class="col-md-2 col-form-label"
            ><b>Titolo</b></label
          >
          <div class="col-md-10">
            <input
              class="form-control"
              id="newTaskTitle"
              type="text"
              formControlName="title"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="newTaskDescription" class="col-md-2 col-form-label">
            <b>Descrizione</b>
          </label>
          <div class="col-md-10">
            <textarea
              class="form-control"
              id="newTaskDescription"
              type="text"
              formControlName="description"
            ></textarea>
          </div>
        </div>

        <div class="form-group">
          <label for="newTaskStatus" class="col-md-2 col-form-label">
            <b>Stato</b>
          </label>
          <div class="col-md-10">
            <select
              id="inputState"
              class="form-control"
              formControlName="state"
            >
              <option *ngFor="let status of statusList" [value]="status">{{
                status
              }}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="newTaskExpirationdate" class="col-md-2 col-form-label">
            <b>Data di Scadenza</b>
          </label>
          <div class="col-md-10">
            <input
              class="form-control"
              id="newTaskExpirationdate"
              type="date"
              formControlName="expirationDate"
            />
          </div>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class TaskFormComponent implements OnInit {
  @Input() taskForm: FormGroup;
  statusList: string[] = [];

  constructor() {}

  ngOnInit() {
    Object.values(TaskStatus).filter(status => this.statusList.push(status));
  }
}
