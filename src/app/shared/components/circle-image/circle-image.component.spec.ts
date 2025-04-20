import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleImageComponent } from './circle-image.component';

describe('CircleImageComponent', () => {
  let component: CircleImageComponent;
  let fixture: ComponentFixture<CircleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
