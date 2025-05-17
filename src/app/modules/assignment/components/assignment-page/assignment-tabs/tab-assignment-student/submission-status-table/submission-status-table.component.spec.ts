import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionStatusTableComponent } from './submission-status-table.component';

describe('SubmissionStatusTableComponent', () => {
  let component: SubmissionStatusTableComponent;
  let fixture: ComponentFixture<SubmissionStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionStatusTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
