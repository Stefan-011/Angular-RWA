import { TestBed } from '@angular/core/testing';

import { MyteamService } from './myteam.service';

describe('MyteamService', () => {
  let service: MyteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
