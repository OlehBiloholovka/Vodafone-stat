import { TestBed } from '@angular/core/testing';

import { OutletService } from './outlet.service';

describe('OutletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutletService = TestBed.get(OutletService);
    expect(service).toBeTruthy();
  });
});
