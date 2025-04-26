import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultTableComponent } from './quiz-result-table.component';

describe('QuizResultTableComponent', () => {
  let component: QuizResultTableComponent;
  let fixture: ComponentFixture<QuizResultTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizResultTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
