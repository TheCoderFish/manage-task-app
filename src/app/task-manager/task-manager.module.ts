import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskManagerHomeComponent } from './task-manager-home/task-manager-home.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AddTasksComponent,
    TaskManagerHomeComponent,
    ViewTasksComponent,
    TaskComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TaskManagerRoutingModule
  ]
})
export class TaskManagerModule { }
