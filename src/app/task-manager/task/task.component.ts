import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';

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
  private rating: number[];

  constructor() {
    this.complete = new EventEmitter<boolean>();
    this.remove = new EventEmitter<any>();
    this.edit = new EventEmitter<any>();
  }

  public ngOnInit(): void {
    this.rating = Array.from(new Array(this.task.rating), (i, index) => index);
  }
}
