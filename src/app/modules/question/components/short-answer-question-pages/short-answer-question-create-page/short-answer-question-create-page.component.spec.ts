import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnswerQuestionCreatePageComponent } from './short-answer-question-create-page.component';

describe('ShortAnswerQuestionCreatePageComponent', () => {
  let component: ShortAnswerQuestionCreatePageComponent;
  let fixture: ComponentFixture<ShortAnswerQuestionCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortAnswerQuestionCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortAnswerQuestionCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
