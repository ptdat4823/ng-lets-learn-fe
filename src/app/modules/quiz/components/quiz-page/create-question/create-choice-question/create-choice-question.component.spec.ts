import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChoiceQuestionComponent } from './create-choice-question.component';

describe('CreateChoiceQuestionComponent', () => {
  let component: CreateChoiceQuestionComponent;
  let fixture: ComponentFixture<CreateChoiceQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChoiceQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChoiceQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
