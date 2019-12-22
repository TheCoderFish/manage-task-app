import { TestBed } from '@angular/core/testing';

import { TasksStoreService } from './tasks-store.service';

describe('TasksStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksStoreService = TestBed.get(TasksStoreService);
    expect(service).toBeTruthy();
  });
});
