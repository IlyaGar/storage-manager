import { TestBed } from '@angular/core/testing';

import { ProcService } from './proc.service';

describe('ProcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcService = TestBed.get(ProcService);
    expect(service).toBeTruthy();
  });
});
