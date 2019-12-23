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
  @Output() edit: EventEmitter<any>;

  ratingMessage: string;

  constructor() {
    this.complete = new EventEmitter<boolean>();
    this.remove = new EventEmitter<any>();
    this.edit = new EventEmitter<any>();
  }

  ngOnInit() {
    this.assignRatingMessage();
  }

  assignRatingMessage() {
    let priorityMessages = ['Not Important', 'Slightly Important', 'Important', 'Very Important', 'Extremely Important'];
    this.ratingMessage = priorityMessages[this.task.rating];
  }
}
