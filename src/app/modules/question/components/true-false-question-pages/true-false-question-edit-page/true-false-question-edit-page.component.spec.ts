import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseQuestionEditPageComponent } from './true-false-question-edit-page.component';

describe('TrueFalseQuestionEditPageComponent', () => {
  let component: TrueFalseQuestionEditPageComponent;
  let fixture: ComponentFixture<TrueFalseQuestionEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseQuestionEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseQuestionEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
