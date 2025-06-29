import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortAnswerQuestionComponent } from './create-short-answer-question.component';

describe('CreateShortAnswerQuestionComponent', () => {
  let component: CreateShortAnswerQuestionComponent;
  let fixture: ComponentFixture<CreateShortAnswerQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShortAnswerQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateShortAnswerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
