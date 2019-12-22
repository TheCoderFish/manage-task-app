import { Component, OnInit } from '@angular/core';
import { TasksStoreService } from '../tasks-store.service';
import { Task } from '../task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent implements OnInit {

  public addTasksForm: FormGroup;

  constructor(private tasksStore: TasksStoreService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.addTasksForm = this.fb.group({
      title: ['', [Validators.required]],
      completeBy: ['', [Validators.required]]
    });
  }

  public addTask() {
    let newTask: Task = this.addTasksForm.getRawValue();
    this.tasksStore.addTask(newTask);
  }

}
