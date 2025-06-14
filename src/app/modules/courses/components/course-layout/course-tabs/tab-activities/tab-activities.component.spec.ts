import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabActivitiesComponent } from './tab-activities.component';

describe('TabActivitiesComponent', () => {
  let component: TabActivitiesComponent;
  let fixture: ComponentFixture<TabActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
