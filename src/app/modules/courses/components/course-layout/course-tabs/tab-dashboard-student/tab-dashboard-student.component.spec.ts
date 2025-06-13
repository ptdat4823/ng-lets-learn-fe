import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDashboardStudentComponent } from './tab-dashboard-student.component';

describe('TabDashboardStudentComponent', () => {
  let component: TabDashboardStudentComponent;
  let fixture: ComponentFixture<TabDashboardStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabDashboardStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabDashboardStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
