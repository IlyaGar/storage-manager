import { TestBed } from '@angular/core/testing';

import { TaskCommonService } from './task-common.service';

describe('TaskCommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskCommonService = TestBed.get(TaskCommonService);
    expect(service).toBeTruthy();
  });
});
