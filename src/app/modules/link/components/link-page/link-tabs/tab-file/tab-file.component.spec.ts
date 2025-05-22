import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFileComponent } from './tab-file.component';

describe('TabFileComponent', () => {
  let component: TabFileComponent;
  let fixture: ComponentFixture<TabFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
