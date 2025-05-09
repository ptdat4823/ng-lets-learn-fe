import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRowComponent } from './setting-row.component';

describe('SettingRowComponent', () => {
  let component: SettingRowComponent;
  let fixture: ComponentFixture<SettingRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
