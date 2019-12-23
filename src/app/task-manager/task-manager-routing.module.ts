import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerHomeComponent } from './task-manager-home/task-manager-home.component';


const routes: Routes = [
  { path: '', component: TaskManagerHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagerRoutingModule { }

