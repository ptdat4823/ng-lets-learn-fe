import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTrueFalseAnswerComponent } from './quiz-true-false-answer.component';

describe('QuizTrueFalseAnswerComponent', () => {
  let component: QuizTrueFalseAnswerComponent;
  let fixture: ComponentFixture<QuizTrueFalseAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizTrueFalseAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizTrueFalseAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
