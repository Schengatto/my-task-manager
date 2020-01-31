import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { ListComponent } from './list/list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { TaskModule } from './../task/task.module';


@NgModule({
  declarations: [ListComponent, CreateTaskComponent, EditTaskComponent, ShowTaskComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    TaskModule,
  ]
})
export class ViewsModule { }
