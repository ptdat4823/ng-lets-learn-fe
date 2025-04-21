import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseCardComponent } from './teacher-course-card.component';

describe('TeacherCourseCardComponent', () => {
  let component: TeacherCourseCardComponent;
  let fixture: ComponentFixture<TeacherCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCourseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
