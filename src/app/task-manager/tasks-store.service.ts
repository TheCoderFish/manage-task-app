import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from './task';
import { TaskService } from './task.service';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {

  private _tasks: BehaviorSubject<Task[]>;

  public tasks$: Observable<Task[]>;
  public sortByCompleted$: Observable<Task[]>;
  public sortByName$: Observable<Task[]>;
  public sortByDate$: Observable<Task[]>;


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

  public updateTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask.id, updatedTask).subscribe(task => {
      this.initializeTasks();
    });

  }

  public setCompleted(status: boolean, task: Task) {
    task.isCompleted = status;
    this.taskService.setCompleted(status, task).subscribe(task => {
      console.log(task);
    }, err => {
      console.error(err);
    });
  }

  public removeTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(task => {
      this.initializeTasks();
    });
  }
  public initializeTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });

    this.sortByCompleted$ = this.tasks$.pipe(
      map(arr => [...arr]),
      map((tasks: Task[]) => tasks.sort((x, y) => (x.isCompleted === y.isCompleted) ? 0 : x.isCompleted ? -1 : 1))
    );

    this.sortByName$ = this.tasks$.pipe(
      map(arr => [...arr]),
      map((tasks: Task[]) => tasks.sort((x, y) => (x.title === y.title) ? 0 : x.title < y.title ? -1 : 1))
    )

    this.sortByDate$ = this.tasks$.pipe(
      map(arr => [...arr]),
      map((tasks: Task[]) => tasks.sort((x, y) => new Date(x.completeBy).getTime() - new Date(y.completeBy).getTime()))
    )
  }
}
