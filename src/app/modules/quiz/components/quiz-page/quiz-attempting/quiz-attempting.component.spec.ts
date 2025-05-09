import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAttemptingComponent } from './quiz-attempting.component';

describe('QuizAttemptingComponent', () => {
  let component: QuizAttemptingComponent;
  let fixture: ComponentFixture<QuizAttemptingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizAttemptingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizAttemptingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
