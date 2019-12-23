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

  public tasks$: Observable<Task[]>;

  constructor(private tasksStore: TasksStoreService,
              private editTaskService: EditTaskService) {
  }
  ngOnInit() {
    this.tasks$ = this.tasksStore.tasks$;
  }

  /**
   * toggleEditMode
   * @param task 
   * emits the task to be edited , subscriber is listening to it in add-tasks component
   */
  toggleEditMode(task:Task) {
    this.editTaskService.editTask(task);
  }

  /**
   * sortBy
   * @param filter 
   * recives value onDropDown change and assigns appropriate observable stream from store
   */
  sortBy(sortBy:string) {
    switch (sortBy) {
      case 'complete':
        this.tasks$ = this.tasksStore.sortByCompleted$;
        break;
      case 'name':
        this.tasks$ = this.tasksStore.sortByName$;
        break;
      case 'date':
        this.tasks$ = this.tasksStore.sortByDate$;
        break;
      case 'rating':
        this.tasks$ = this.tasksStore.sortByRating$;
        break;
      default:
        this.tasks$ = this.tasksStore.tasks$;
        break;
    }
  }
}
