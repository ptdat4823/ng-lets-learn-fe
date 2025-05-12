import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankTableComponent } from './question-bank-table.component';

describe('QuestionBankTableComponent', () => {
  let component: QuestionBankTableComponent;
  let fixture: ComponentFixture<QuestionBankTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBankTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBankTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
