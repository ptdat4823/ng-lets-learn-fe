import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Course } from '@shared/models/course';
import { CourseService, UpdateCourseImageRequest } from '@shared/services/course.service';

export interface UpdateCourseImageDialogData {
  course: Course;
}

export interface UpdateCourseImageResult {
  imageUrl: string;
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-update-course-image-dialog',
  standalone: false,
  templateUrl: './update-course-image-dialog.component.html',
  styleUrl: './update-course-image-dialog.component.scss'
})
export class UpdateCourseImageDialogComponent implements OnInit {
  @Input() show = false;
  @Input() course: Course | null = null;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() updateImage = new EventEmitter<UpdateCourseImageResult>();
  
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLoading = false;
  canSave = false;
  
  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    if (this.course) {
      this.previewUrl = this.course.imageUrl;
    }
    this.updateCanSave();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      
      // Validate file type
      if (!this.selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file');
        this.selectedFile = null;
        return;
      }
      
      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (this.selectedFile.size > maxSize) {
        alert('File size must be less than 5MB');
        this.selectedFile = null;
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };      reader.readAsDataURL(this.selectedFile);
      
      this.updateCanSave();
    }
  }

  onRemoveImage(): void {
    this.selectedFile = null;
    this.previewUrl = this.course?.imageUrl || null;
    this.updateCanSave();
  }

  onClose(): void {
    this.selectedFile = null;
    this.previewUrl = this.course?.imageUrl || null;
    this.closeDialog.emit();
  }

  onSave(): void {
    if (!this.selectedFile) {
      alert('Please select an image file');
      return;
    }

    if (!this.course) {
      alert('Course data is missing');
      return;
    }

    this.isLoading = true;
      const request: UpdateCourseImageRequest = {
      courseId: this.course.id,
      imageFile: this.selectedFile
    };

    this.courseService.updateCourseImage(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.updateImage.emit({
            imageUrl: response.imageUrl,
            success: true,
            message: response.message
          });
          this.onClose();
        } else {
          alert('Failed to update course image');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating course image:', error);
        alert('An error occurred while updating the course image');
      }
    });
  }

  updateCanSave(): void {
    this.canSave = !!this.selectedFile;
  }

  onUploadPhoto(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      this.onFileSelected(event);
    };
    fileInput.click();
  }
}