import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class EditTaskService {

  private _editTask: Subject<Task>;
  public editTask$: Observable<Task>;

  constructor() {
    this._editTask = new Subject<Task>();
    this.editTask$ = this._editTask.asObservable();
  }

  public editTask(task:Task){
    this._editTask.next(task);
  }
}
