import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemCollapseComponent } from './sidebar-item-collapse.component';

describe('SidebarItemCollapseComponent', () => {
  let component: SidebarItemCollapseComponent;
  let fixture: ComponentFixture<SidebarItemCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarItemCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarItemCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
