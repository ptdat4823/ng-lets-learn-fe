import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseQuestionFormComponent } from './true-false-question-form.component';

describe('TrueFalseQuestionFormComponent', () => {
  let component: TrueFalseQuestionFormComponent;
  let fixture: ComponentFixture<TrueFalseQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseQuestionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
