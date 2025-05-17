import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingSummaryTableComponent } from './grading-summary-table.component';

describe('GradingSummaryTableComponent', () => {
  let component: GradingSummaryTableComponent;
  let fixture: ComponentFixture<GradingSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradingSummaryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradingSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
