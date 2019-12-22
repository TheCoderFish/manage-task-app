import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { SharedModule } from '../shared/shared.module';
import { TaskManagerRoutingModule } from './task-manager-routing.module';



@NgModule({
  declarations: [TasksComponent],
  imports: [
    SharedModule,
    CommonModule,
    TaskManagerRoutingModule
  ]
})
export class TaskManagerModule { }
