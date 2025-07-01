import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DeleteCloudinaryFile,
  UploadMultipleCloudinaryFiles,
} from '@shared/api/cloudinary.api';
import { convertCloudinaryUrlToDownloadUrl } from '@shared/helper/cloudinary.api.helper';
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
export class FileUploadComponent implements OnInit {
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
  @Output() deleted = new EventEmitter<CloudinaryFile>();

  isDragging = false;
  isUploading = false;
  isDeleting = false;
  uploadProgress = 0;
  files: File[] = [];
  toUploadFiles: CloudinaryFile[] = [];
  uploadedFiles: CloudinaryFile[] = [];

  constructor(private el: ElementRef, private toastService: ToastrService) {}

  ngOnInit(): void {
    const initValue = this.form.get(this.controlName)?.value;
    if (initValue && Array.isArray(initValue)) {
      this.uploadedFiles = initValue;
    }
  }

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
    if (files && files.length > 0) this.handleFilesChange(files);
  }

  onFileInputChange(event: any) {
    if (!event.target) return;
    const files = event.target.files;
    if (files && files.length > 0) this.handleFilesChange(files);
  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  handleFilesChange(fileList: FileList) {
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

  async uploadFiles() {
    if (this.files.length === 0) return;

    this.isUploading = true;
    this.uploadProgress = 0;

    this.toUploadFiles = this.files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      displayUrl: '',
      downloadUrl: '',
    }));

    // Simulate upload progress
    const interval = setInterval(() => {
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.hideProgressBar();
      } else if (this.uploadProgress >= 90) this.uploadProgress += 1;
      else if (this.uploadProgress >= 70) this.uploadProgress += 2;
      else if (this.uploadProgress >= 50) this.uploadProgress += 3;
      else if (this.uploadProgress >= 30) this.uploadProgress += 5;
      else if (this.uploadProgress >= 10) this.uploadProgress += 10;
      else this.uploadProgress += 20;
    }, 20);

    await UploadMultipleCloudinaryFiles(this.files)
      .then((response) => {
        if (this.uploadProgress >= 100) this.onUploadSuccess(response);
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        this.toastService.error('File upload failed. Please try again.');
      })
      .finally(() => {
        this.uploadProgress = 100;
        this.hideProgressBar();
        this.resetFileInput();
      });
  }

  hideProgressBar() {
    setTimeout(() => {
      this.isUploading = false;
      this.uploadProgress = 0;
    }, 2000);
  }

  resetFileInput() {
    this.fileInput.nativeElement.value = '';
    this.files = [];
  }

  onUploadSuccess(res: any) {
    this.toUploadFiles = this.toUploadFiles.map((file: any, index: number) => ({
      ...file,
      displayUrl: res[index].url,
      downloadUrl: convertCloudinaryUrlToDownloadUrl(res[index].url),
    }));
    this.uploadedFiles = [...this.uploadedFiles, ...this.toUploadFiles];
    this.uploaded.emit(this.uploadedFiles);
    this.form.get(this.controlName)?.setValue(this.uploadedFiles);
    if (this.showSuccessToast) {
      this.toastService.success('Files uploaded successfully');
    }
  }

  async onDeleteFile(file: CloudinaryFile) {
    this.isDeleting = true;
    await DeleteCloudinaryFile(file.displayUrl)
      .then(() => {
        this.uploadedFiles = this.uploadedFiles.filter((f) => f.id !== file.id);
        this.deleted.emit(file);
        this.form.get(this.controlName)?.setValue(this.uploadedFiles);
        if (this.showSuccessToast) {
          this.toastService.success('File deleted successfully');
        }
      })
      .catch((error) => {
        console.error('Delete failed:', error);
        this.toastService.error('File deletion failed. Please try again.');
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }
}
