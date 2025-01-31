import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeBookComponent } from './trade-book.component';

describe('TradeBookComponent', () => {
  let component: TradeBookComponent;
  let fixture: ComponentFixture<TradeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
