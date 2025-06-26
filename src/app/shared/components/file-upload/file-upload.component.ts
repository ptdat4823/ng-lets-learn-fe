import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CloudinaryFile } from '@shared/models/cloudinary-file';
import { ToastrService } from 'ngx-toastr';

export interface FileUploadConfig {
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
  uploadPreset?: string;
  folder?: string;
}

@Component({
  selector: 'file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() form: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() validationMessages: Record<string, string> | null = null;

  @Input() description = 'Texts, images, videos, audios and pdfs';
  @Input() config: FileUploadConfig = {
    maxFiles: 10,
    maxSizeInMB: 10,
    acceptedFileTypes: [
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/webp',
      'video/mp4',
      'video/x-msvideo',
      'video/mpeg',
      'video/quicktime',
      'application/pdf',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/mp4',
      'audio/webm',
    ],
    uploadPreset: 'default',
    folder: 'uploads',
  };
  @Input() showSuccessToast = true;

  @Output() uploaded = new EventEmitter<CloudinaryFile[]>();

  isDragging = false;
  isUploading = false;
  uploadProgress = 0;
  files: File[] = [];

  constructor(private el: ElementRef, private toastService: ToastrService) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) this.handleFiles(files);
  }

  onFileInputChange(event: any) {
    if (!event.target) return;
    const files = event.target.files;
    if (files && files.length > 0) this.handleFiles(files);
  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  handleFiles(fileList: FileList) {
    // Convert FileList to array
    const filesArray = Array.from(fileList);

    // Apply file type filter
    const validFiles = filesArray.filter((file) => {
      return this.config.acceptedFileTypes?.includes(file.type);
    });

    const invalidFiles = validFiles.filter((file) => {
      if (!this.config.maxSizeInMB) return false;
      if (file.size <= this.config.maxSizeInMB * 1024 * 1024) return false;
      return true;
    });

    if (invalidFiles.length > 0) {
      this.toastService.error(
        `File size is too large. Maximum size is ${this.config.maxSizeInMB} MB.`
      );
      return;
    }

    // Apply max files limit
    const maxFiles = this.config.maxFiles || validFiles.length;
    this.files = validFiles.slice(0, maxFiles);

    // In a real implementation, you would upload these files to Cloudinary or another service
    this.uploadFiles();
  }

  uploadFiles() {
    if (this.files.length === 0) return;

    this.isUploading = true;
    this.uploadProgress = 0;

    // Simulate upload progress
    const interval = setInterval(() => {
      this.uploadProgress += 5;

      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false;

        const uploadedFiles: CloudinaryFile[] = this.files.map((file) => ({
          id: crypto.randomUUID(),
          name: file.name,
          displayUrl: URL.createObjectURL(file),
          downloadUrl: URL.createObjectURL(file),
        }));

        this.uploaded.emit(uploadedFiles);

        this.form.get(this.controlName)?.setValue(uploadedFiles);

        if (this.showSuccessToast) {
          this.toastService.success(
            `Successfully uploaded ${uploadedFiles.length} file(s)`
          );
        }

        this.files = [];
      }
    }, 100);

    // In a real implementation, you would use the Cloudinary API or another service
    // to upload the files and get back the URLs and other metadata
  }
}
