import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabResultComponent } from './tab-result.component';

describe('TabResultComponent', () => {
  let component: TabResultComponent;
  let fixture: ComponentFixture<TabResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
