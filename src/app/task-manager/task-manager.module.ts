import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TaskManagerRoutingModule } from './task-manager-routing.module';

import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { TaskManagerHomeComponent } from './task-manager-home/task-manager-home.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { TaskComponent } from './task/task.component';

import { TasksStoreService } from './tasks-store.service';
import { TaskService } from './task.service';
import { EditTaskService } from './edit-task.service';

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
    TaskManagerRoutingModule
  ],
  providers: [
    TaskService,
    EditTaskService,
    TasksStoreService
  ]
})
export class TaskManagerModule { }
