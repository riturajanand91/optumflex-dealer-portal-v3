import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyUpdatesComponent } from './monthly-updates.component';

describe('MonthlyUpdatesComponent', () => {
  let component: MonthlyUpdatesComponent;
  let fixture: ComponentFixture<MonthlyUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyUpdatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
