import { TestBed } from '@angular/core/testing';

import { EditTaskService } from './edit-task.service';

describe('EditTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditTaskService = TestBed.get(EditTaskService);
    expect(service).toBeTruthy();
  });
});
