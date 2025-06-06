import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseFormComponent } from './new-course-form.component';

describe('NewCourseFormComponent', () => {
  let component: NewCourseFormComponent;
  let fixture: ComponentFixture<NewCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCourseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
