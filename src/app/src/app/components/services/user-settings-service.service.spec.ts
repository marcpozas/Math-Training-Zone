import { TestBed } from '@angular/core/testing';

import { UserSettingsService } from './user-settings-service.service';

describe('UserSettingsServiceService', () => {
  let service: UserSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
