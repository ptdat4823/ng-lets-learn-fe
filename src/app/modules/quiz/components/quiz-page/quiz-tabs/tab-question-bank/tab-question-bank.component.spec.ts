import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabQuestionBankComponent } from './tab-question-bank.component';

describe('TabQuestionBankComponent', () => {
  let component: TabQuestionBankComponent;
  let fixture: ComponentFixture<TabQuestionBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabQuestionBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
