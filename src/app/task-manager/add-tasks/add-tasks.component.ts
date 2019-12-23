import { Component, OnInit } from '@angular/core';
import { TasksStoreService } from '../tasks-store.service';
import { Task } from '../task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditTaskService } from '../edit-task.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent implements OnInit {

  public tasksForm: FormGroup;
  private editMode: boolean;
  private taskToEdit: Task;

  constructor(private tasksStore: TasksStoreService,
    private fb: FormBuilder,
    private editTaskService: EditTaskService) { }

  ngOnInit() {

    this.editMode = false;
    this.tasksForm = this.fb.group({
      title: ['', [Validators.required]],
      completeBy: ['', [Validators.required]],
      rating: ['', [Validators.required]]
    });

    this.editTaskService.editTask$.subscribe(task => {
      this.taskToEdit = task;
      this.editMode = !this.editMode;
      this.tasksForm.patchValue(task);
    });
  }

  public saveChange() {
    if (this.tasksForm.valid) {
      let task: Task = this.tasksForm.getRawValue();
      if (!this.editMode) {
        task.isCompleted = false;
        this.tasksStore.addTask(task);
      } else {
        task.isCompleted = this.taskToEdit.isCompleted;
        task.id = this.taskToEdit.id;
        this.tasksStore.updateTask(task);
        this.editMode = !this.editMode;
        this.taskToEdit = null;
      }
      this.tasksForm.reset();
      this.tasksForm.markAsPristine();
      this.tasksForm.markAsUntouched();
    } else {
      this.tasksForm.markAllAsTouched();
    }
    this.tasksForm.updateValueAndValidity();
  }
}
