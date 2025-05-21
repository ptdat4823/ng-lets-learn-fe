import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceQuestionFormComponent } from './choice-question-form.component';

describe('ChoiceQuestionFormComponent', () => {
  let component: ChoiceQuestionFormComponent;
  let fixture: ComponentFixture<ChoiceQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceQuestionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
