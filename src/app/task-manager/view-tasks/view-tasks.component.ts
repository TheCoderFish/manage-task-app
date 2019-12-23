import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TasksStoreService } from '../tasks-store.service';
import { Observable } from 'rxjs';
import { Task } from '../task';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
})
export class ViewTasksComponent implements OnInit {

  public addedTasks$: Observable<Task[]>;

  constructor(private tasksStore: TasksStoreService) { }

  ngOnInit() {
    this.addedTasks$ = this.tasksStore.tasks$;
  }
}
