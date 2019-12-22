import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerHomeComponent } from './task-manager-home.component';

describe('TaskManagerHomeComponent', () => {
  let component: TaskManagerHomeComponent;
  let fixture: ComponentFixture<TaskManagerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskManagerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
