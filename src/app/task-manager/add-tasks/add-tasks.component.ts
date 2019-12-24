import { Component, OnInit } from '@angular/core';
import { TasksStoreService } from '../tasks-store.service';
import { Task } from '../task';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EditTaskService } from '../edit-task.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent implements OnInit {

  public tasksForm: FormGroup;
  private _editMode: boolean;
  private _taskToEdit: Task;

  constructor(private fb: FormBuilder,
    private tasksStore: TasksStoreService,
    private editTaskService: EditTaskService) { }

  ngOnInit() {
    this.editMode = false;

    /**
     * Reactive form is made using Form Builder
     */
    this.tasksForm = this.fb.group({
      title: ['', [Validators.required]],
      completeBy: ['', [Validators.required]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    /**
     * Activates Edit Mode when Edir button is clikced in Tasks List View
     * Updates the form with Value for easy update
     */
    this.editTaskService.editTask$.subscribe(task => {
      this.taskToEdit = task;
      this.editMode = !this.editMode;
      this.tasksForm.patchValue(task);
    });
  }

  /**
   * Handles Add and Update Task Feature
   * Task data is modelled according to operation
   * Form reset and validation trigger is handled for both operations
   */
  public saveChange() {
    // Check for form validations, proceed if valid else show errors
    if (this.tasksForm.valid) {
      // Get Form Value
      let task: Task = this.tasksForm.getRawValue();

      //check if task is being edited or new task is added
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

      //Reset Form and Validations
      this.tasksForm.reset();
      this.tasksForm.markAsPristine();
      this.tasksForm.markAsUntouched();
    } else {
      //To force validation check and show errors
      this.tasksForm.markAllAsTouched();
    }

    this.tasksForm.updateValueAndValidity();
  }

  // Getters and Setters for private variables
  public get editMode(): boolean {
    return this._editMode;
  }

  public set editMode(mode: boolean) {
    this._editMode = mode;
  }

  public get taskToEdit(): Task {
    return this._taskToEdit;
  }

  public set taskToEdit(task: Task) {
    this._taskToEdit = task;
  }

  //Getters for FormControls for easy access in template
  public get title(): FormControl {
    return this.tasksForm.get('title') as FormControl;
  }
  public get completeBy(): FormControl {
    return this.tasksForm.get('completeBy') as FormControl;
  }
  public get rating(): FormControl {
    return this.tasksForm.get('rating') as FormControl;
  }

  public onRatingChanged(rating: number) {
    this.setRating(rating);
  }

  private setRating(rating: number): void {
    this.tasksForm.get('rating').setValue(rating);
  }

}
