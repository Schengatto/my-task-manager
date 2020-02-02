import { Task } from './../models/task';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  template: `
    <div class="m-5">
      <div class="row mb-2">
        <div class="cold-2 property">Title:</div>
        <div class="col-10">{{ task?.title }}</div>
      </div>
      <div class="row mb-2">
        <div class="cold-2 property">Description:</div>
        <div class="col-10">{{ task?.description }}</div>
      </div>
      <div class="row mb-2">
        <div class="cold-2 property">Status:</div>
        <div class="col-10">{{ task?.state }}</div>
      </div>
      <div class="row mb-2">
        <div class="cold-2 property">Expiration Date:</div>
        <div class="col-10">
          {{ task?.expirationDate | date: 'dd / MM / yyyy' }}
        </div>
      </div>
      <div class="row">
        <div class="cold-2 property">Expiration Info:</div>
        <div class="col-10">
          {{ task?.expirationDate | remainingDays }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .property {
        font-weight: bolder;
      }
      .value {
        font-weight: normal;
      }
    `
  ]
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task = null;

  constructor() {}

  ngOnInit() {}
}
