import { TestBed } from '@angular/core/testing';

import { SonglistService } from './songlist.service';

describe('SonglistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SonglistService = TestBed.get(SonglistService);
    expect(service).toBeTruthy();
  });
});
