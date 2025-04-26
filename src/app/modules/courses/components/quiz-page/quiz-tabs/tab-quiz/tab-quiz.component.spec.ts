import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabQuizComponent } from './tab-quiz.component';

describe('TabQuizComponent', () => {
  let component: TabQuizComponent;
  let fixture: ComponentFixture<TabQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
