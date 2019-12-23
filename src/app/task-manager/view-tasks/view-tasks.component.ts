import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TasksStoreService } from '../tasks-store.service';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { EditTaskService } from '../edit-task.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
})
export class ViewTasksComponent implements OnInit {

  public addedTasks$: Observable<Task[]>;

  constructor(private tasksStore: TasksStoreService,
    private editTaskService: EditTaskService) { }

  ngOnInit() {
    this.addedTasks$ = this.tasksStore.tasks$;
  }

  toggleEditMode(task) {
    this.editTaskService.editTask(task);
  }
}
