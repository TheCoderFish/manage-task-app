import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TasksStoreService } from '../tasks-store.service';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { EditTaskService } from '../edit-task.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
})
export class ViewTasksComponent implements OnInit {

  public addedTasks$: Observable<Task[]>;
  //public sortBy: EventEmitter<string>;

  constructor(private tasksStore: TasksStoreService,
    private editTaskService: EditTaskService) {
    //this.sortBy = new EventEmitter<string>();
  }

  ngOnInit() {
    this.addedTasks$ = this.tasksStore.tasks$;
  }

  toggleEditMode(task) {
    this.editTaskService.editTask(task);
  }

  sortBy(filter) {
    switch (filter) {
      case 'complete':
        this.addedTasks$ = this.tasksStore.sortByCompleted$;
        break;
      case 'name':
        this.addedTasks$ = this.tasksStore.sortByName$;
        break;
      case 'date':
        this.addedTasks$ = this.tasksStore.sortByDate$;
        break;
      default:
        this.addedTasks$ = this.tasksStore.tasks$;
        break;
    }
  }
}
