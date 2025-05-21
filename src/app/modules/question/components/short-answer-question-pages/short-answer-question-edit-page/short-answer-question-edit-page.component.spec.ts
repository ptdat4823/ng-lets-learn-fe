import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnswerQuestionEditPageComponent } from './short-answer-question-edit-page.component';

describe('ShortAnswerQuestionEditPageComponent', () => {
  let component: ShortAnswerQuestionEditPageComponent;
  let fixture: ComponentFixture<ShortAnswerQuestionEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortAnswerQuestionEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortAnswerQuestionEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
