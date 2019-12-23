import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {

  private _tasks: BehaviorSubject<Task[]>;

  public readonly tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this._tasks = new BehaviorSubject<Task[]>([]);
    this.tasks$ = this._tasks.asObservable();
    this.initializeTasks();
  }

  public get tasks() {
    return this._tasks.getValue();
  }

  public set tasks(tasks: Task[]) {
    this._tasks.next(tasks);
  }

  public addTask(newTask: Task) {
    if (newTask) {
      this.taskService.addTask(newTask).subscribe(task => {
        this.tasks = [...this.tasks, task];
      }, err => {
        console.error(err);
      })
    }
  }

  public setCompleted(status: boolean, task: Task) {
    task.isCompleted = status;
    this.taskService.setCompleted(status, task).subscribe(task => {
      console.log(task);
    }, err => {
      console.error(err);
    });
  }

  public initializeTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

}
