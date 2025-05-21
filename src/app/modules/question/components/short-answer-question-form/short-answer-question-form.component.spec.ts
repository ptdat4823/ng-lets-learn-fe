import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnswerQuestionFormComponent } from './short-answer-question-form.component';

describe('ShortAnswerQuestionFormComponent', () => {
  let component: ShortAnswerQuestionFormComponent;
  let fixture: ComponentFixture<ShortAnswerQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortAnswerQuestionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortAnswerQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
