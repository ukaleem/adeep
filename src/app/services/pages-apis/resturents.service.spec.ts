import { TestBed } from '@angular/core/testing';

import { ResturentsService } from './resturents.service';

describe('ResturentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResturentsService = TestBed.get(ResturentsService);
    expect(service).toBeTruthy();
  });
});
