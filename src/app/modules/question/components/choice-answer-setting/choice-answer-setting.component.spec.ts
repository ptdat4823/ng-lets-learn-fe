import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceAnswerSettingComponent } from './choice-answer-setting.component';

describe('ChoiceAnswerSettingComponent', () => {
  let component: ChoiceAnswerSettingComponent;
  let fixture: ComponentFixture<ChoiceAnswerSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceAnswerSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceAnswerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
