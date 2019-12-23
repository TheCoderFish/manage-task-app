import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

//Messages based on priority, index corresponds to priority, eg MESSAGES[0] --> priority 1
const MESSAGES = ['Not Important', 'Slightly Important', 'Important', 'Very Important', 'Extremely Important'];

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() public task: Task;
  @Output() public complete: EventEmitter<boolean>;
  @Output() public remove: EventEmitter<any>;
  @Output() public edit: EventEmitter<any>;

  public ratingMessage: string;

  constructor() {
    this.complete = new EventEmitter<boolean>();
    this.remove = new EventEmitter<any>();
    this.edit = new EventEmitter<any>();
  }

  public ngOnInit(): void {
    this.assignRatingMessage();
  }

  /**
   * assigns message according to priority on init
   */
  public assignRatingMessage(): void {
    this.ratingMessage = MESSAGES[this.task.rating - 1];
  }
}
