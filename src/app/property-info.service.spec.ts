import { TestBed } from '@angular/core/testing';

import { PropertyInfoService } from './property-info.service';

describe('PropertyInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyInfoService = TestBed.get(PropertyInfoService);
    expect(service).toBeTruthy();
  });
});
