import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPageLayoutComponent } from './topic-page-layout.component';

describe('TopicPageLayoutComponent', () => {
  let component: TopicPageLayoutComponent;
  let fixture: ComponentFixture<TopicPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicPageLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
