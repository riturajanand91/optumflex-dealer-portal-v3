import { TestBed } from '@angular/core/testing';

import { TradeTabsService } from './trade-tabs.service';

describe('TradeTabsService', () => {
  let service: TradeTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
