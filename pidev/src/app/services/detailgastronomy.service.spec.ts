import { TestBed } from '@angular/core/testing';

import { DetailGastronomyService } from './detailgastronomy.service';

describe('DetailgastronomyService', () => {
  let service: DetailGastronomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailGastronomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
