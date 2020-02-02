import { Task } from './../models/task';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  template: `
    <div class="m-5">
      <div class="mb-5">
        <div class="property">Title:</div>
        <div>{{ task?.title }}</div>
      </div>
      <div class="mb-5">
        <div class="property">Description:</div>
        <div>{{ task?.description }}</div>
      </div>
      <div class="mb-5">
        <div class="property">Status:</div>
        <div>{{ task?.state }}</div>
      </div>
      <div class="mb-5">
        <div class="property">Expiration Date:</div>
        <div>
          {{ task?.expirationDate | date: 'dd / MM / yyyy' }}
        </div>
      </div>
      <div class="mb-5">
        <div class="property">Expiration Info:</div>
        <div>
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
