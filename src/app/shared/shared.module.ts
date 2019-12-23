import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]
})
export class SharedModule { }
