import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentGrowthComponent } from './investment-growth.component';

describe('InvestmentGrowthComponent', () => {
  let component: InvestmentGrowthComponent;
  let fixture: ComponentFixture<InvestmentGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentGrowthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
