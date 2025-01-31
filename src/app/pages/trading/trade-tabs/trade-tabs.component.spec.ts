import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeTabsComponent } from './trade-tabs.component';

describe('TradeTabsComponent', () => {
  let component: TradeTabsComponent;
  let fixture: ComponentFixture<TradeTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
