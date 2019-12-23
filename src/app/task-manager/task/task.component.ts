import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() complete: EventEmitter<boolean>;
  @Output() remove: EventEmitter<any>;

  constructor() {
    this.complete = new EventEmitter<boolean>();
    this.remove = new EventEmitter<any>();
  }

  ngOnInit() {
  }
}
