import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mat-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input('rating') public set rating(rating: number) {
    this._rating = rating;
    this.color = this.rating > 0 ? 'accent' : 'black';
  }

  public get rating() {
    return this._rating;
  }

  @Output() private ratingUpdated: EventEmitter<number>;

  private ratingArr = [];
  private _rating;
  private color: string = 'black';
  constructor() {
    this.ratingUpdated = new EventEmitter<number>();
  }

  ngOnInit() {
    this.rating = 0;
    this.ratingArr = Array.from(new Array(5), (i, index) => index);
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingUpdated.emit(rating);
  }
}
