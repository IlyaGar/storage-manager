import { TestBed } from '@angular/core/testing';

import { StillageService } from './stillage.service';

describe('StillageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StillageService = TestBed.get(StillageService);
    expect(service).toBeTruthy();
  });
});
