import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Task } from './task';

@Injectable()
export class TaskService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  //CRUD methods for Tasks
  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  public addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, newTask);
  }

  public deleteTask(taskId: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/tasks/${taskId}`);
  }

  public updateTask(id: number, updatedTask: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/tasks/${id}`, updatedTask)
  }

  /**
   * setCompleted
   * @param isCompleted 
   * @param task 
   * Update status of Tasks
   */
  public setCompleted(isCompleted: boolean, task: Task) {
    return this.http.put(`${this.baseUrl}/tasks/${task.id}`, task);
  }
}
