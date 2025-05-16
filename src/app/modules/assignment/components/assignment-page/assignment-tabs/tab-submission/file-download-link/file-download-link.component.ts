import { Component, Input, OnInit } from '@angular/core';
import { CloudinaryFile } from '@shared/models/cloudinary-file';

@Component({
  selector: 'file-download-link',
  standalone: false,
  templateUrl: './file-download-link.component.html',
  styleUrl: './file-download-link.component.scss',
})
export class FileDownloadLinkComponent implements OnInit {
  @Input({ required: true }) file!: CloudinaryFile;

  fileName: string = '';
  extension: string = '';
  fileTypeClass: string = '';

  ngOnInit(): void {
    if (this.file?.name) {
      const nameParts = this.file.name.split('.');
      this.extension = nameParts.pop() || '';
      this.fileName = nameParts.join('.');
      this.fileTypeClass = `file-${this.extension.toLowerCase()}`;
    }
  }
}
