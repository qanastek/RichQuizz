import { TestBed } from '@angular/core/testing';

import { AdvertisementPopupService } from './advertisement-popup.service';

describe('AdvertisementPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvertisementPopupService = TestBed.get(AdvertisementPopupService);
    expect(service).toBeTruthy();
  });
});
