import { TestBed } from '@angular/core/testing';

import { TraiterService } from './traiter.service';

describe('TraiterService', () => {
  let service: TraiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
