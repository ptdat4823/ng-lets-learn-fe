import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceQuestionCreatePageComponent } from './choice-question-create-page.component';

describe('ChoiceQuestionCreatePageComponent', () => {
  let component: ChoiceQuestionCreatePageComponent;
  let fixture: ComponentFixture<ChoiceQuestionCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceQuestionCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceQuestionCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
