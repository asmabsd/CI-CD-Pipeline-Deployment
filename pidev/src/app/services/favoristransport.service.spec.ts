import { TestBed } from '@angular/core/testing';

import { FavoristransportService } from './favoristransport.service';

describe('FavoristransportService', () => {
  let service: FavoristransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoristransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
