import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mat-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input('rating') private rating: number = 0;
  @Output() private ratingUpdated: EventEmitter<number>;
  private ratingArr = [];

  constructor() {
    this.ratingUpdated = new EventEmitter<number>();
  }

  ngOnInit() {
    this.ratingArr = Array.from(new Array(5), (i, index) => index);
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingUpdated.emit(rating);
  }
}
