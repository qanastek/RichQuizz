import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';

beforeEach(() => TestBed.configureTestingModule({}));

const service: DatabaseService = TestBed.get(DatabaseService);

describe('DatabaseService', () => {

  it('Addition', () => {
    expect(1 + 1).toBe(2);
  });
});
