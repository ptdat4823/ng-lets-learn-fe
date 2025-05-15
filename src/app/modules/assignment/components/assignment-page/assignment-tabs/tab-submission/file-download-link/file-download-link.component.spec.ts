import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloadLinkComponent } from './file-download-link.component';

describe('FileDownloadLinkComponent', () => {
  let component: FileDownloadLinkComponent;
  let fixture: ComponentFixture<FileDownloadLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileDownloadLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDownloadLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
