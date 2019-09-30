import { TestBed } from '@angular/core/testing';

import { WmsMapService } from './wms-map.service';

describe('WmsMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WmsMapService = TestBed.get(WmsMapService);
    expect(service).toBeTruthy();
  });
});
