import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, newTask);
  }

  deleteTask(taskId: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/tasks/${taskId}`)
  }

  updateTask(id: number, updatedTask: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/tasks/${id}`, updatedTask)
  }

  setCompleted(isCompleted: boolean, task: Task) {
    return this.http.put(`${this.baseUrl}/tasks/${task.id}`, task);
  }
}
