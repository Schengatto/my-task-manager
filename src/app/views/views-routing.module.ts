import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'tasks', component: ListComponent },
  { path: 'create', component: CreateTaskComponent },
  { path: 'edit/:id', component: EditTaskComponent },
  { path: 'details/:id', component: ShowTaskComponent },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule {}
