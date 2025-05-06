import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMessageContentComponent } from './confirm-message-content.component';

describe('ConfirmMessageContentComponent', () => {
  let component: ConfirmMessageContentComponent;
  let fixture: ComponentFixture<ConfirmMessageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmMessageContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmMessageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
