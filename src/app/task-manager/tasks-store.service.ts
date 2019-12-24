import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class TasksStoreService {

  private _tasks: BehaviorSubject<Task[]>;
  private destroy$: Subject<boolean>;

  public tasks$: Observable<Task[]>;
  public sortByCompleted$: Observable<Task[]>;
  public sortByName$: Observable<Task[]>;
  public sortByDate$: Observable<Task[]>;
  public sortByRating$: Observable<Task[]>;


  constructor(private taskService: TaskService) {
    this._tasks = new BehaviorSubject<Task[]>([]);
    this.tasks$ = this._tasks.asObservable();
    this.destroy$ = new Subject<boolean>();
    this.initializeTasks();
  }

  /**
   * return last emitted value
   */
  public get tasks() {
    return this._tasks.getValue();
  }

  /**
   * Used to push new tasks to its subscribers 
   */
  public set tasks(tasks: Task[]) {
    this._tasks.next(tasks);
  }

  /**
   * addTask
   * @param newTask 
   * add new task to the mock database
   * add to store after success response
   */
  public addTask(newTask: Task) {
    if (newTask) {
      this.taskService.addTask(newTask).pipe(takeUntil(this.destroy$)).subscribe(task => {
        this.tasks = [...this.tasks, task];
      }, err => {
        console.error(err);
      })
    }
  }

  /**
   * updateTask
   * @param updatedTask 
   * Updated task after editing required parameters
   */
  public updateTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask.id, updatedTask).pipe(takeUntil(this.destroy$)).subscribe(task => {
      this.initializeTasks();
    });

  }

  /**
   * setCompleted
   * @param status 
   * @param task 
   */
  public setCompleted(status: boolean, task: Task) {
    task.isCompleted = status;
    this.taskService.setCompleted(status, task).pipe(takeUntil(this.destroy$)).subscribe(task => {
      console.log(task);
    }, err => {
      console.error(err);
    });
  }

  /**
   * removeTask
   * @param taskId 
   */
  public removeTask(taskId: number) {
    this.taskService.deleteTask(taskId).pipe(takeUntil(this.destroy$)).subscribe(task => {
      this.initializeTasks();
    });
  }

  /**
   * initializeTasks
   * Loads tasks from db
   * Initialize streams for sorting
   */
  public initializeTasks() {
    this.taskService.getTasks().pipe(takeUntil(this.destroy$)).subscribe(tasks => {
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

    this.sortByRating$ = this.tasks$.pipe(
      map(arr => [...arr]),
      map((tasks: Task[]) => tasks.sort((x, y) => y.rating - x.rating))
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
