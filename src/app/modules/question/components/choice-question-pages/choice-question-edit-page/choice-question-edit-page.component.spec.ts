import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceQuestionEditPageComponent } from './choice-question-edit-page.component';

describe('ChoiceQuestionEditPageComponent', () => {
  let component: ChoiceQuestionEditPageComponent;
  let fixture: ComponentFixture<ChoiceQuestionEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceQuestionEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceQuestionEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
