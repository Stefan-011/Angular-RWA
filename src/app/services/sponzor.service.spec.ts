import { TestBed } from '@angular/core/testing';

import { SponzorService } from './sponzor.service';

describe('SponzorService', () => {
  let service: SponzorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponzorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
