import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStatusBannerComponent } from './quiz-status-banner.component';

describe('QuizStatusBannerComponent', () => {
  let component: QuizStatusBannerComponent;
  let fixture: ComponentFixture<QuizStatusBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizStatusBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizStatusBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
