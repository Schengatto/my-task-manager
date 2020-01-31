import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { RemainingDaysPipe } from './pipes/remaining-days.pipe';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
  declarations: [
    TaskDetailComponent,
    TaskListComponent,
    TaskFormComponent,
    RemainingDaysPipe
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [TaskDetailComponent, TaskListComponent, TaskFormComponent]
})
export class TaskModule {}
