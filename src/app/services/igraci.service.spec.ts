import { TestBed } from '@angular/core/testing';

import { IgraciService } from './igraci.service';

describe('IgraciService', () => {
  let service: IgraciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgraciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
