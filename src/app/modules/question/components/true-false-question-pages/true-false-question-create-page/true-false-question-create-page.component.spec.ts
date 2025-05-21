import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseQuestionCreatePageComponent } from './true-false-question-create-page.component';

describe('TrueFalseQuestionCreatePageComponent', () => {
  let component: TrueFalseQuestionCreatePageComponent;
  let fixture: ComponentFixture<TrueFalseQuestionCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseQuestionCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseQuestionCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
