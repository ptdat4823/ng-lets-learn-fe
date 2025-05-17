import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  AssignmentResponseData,
  StudentResponse,
} from '@shared/models/student-response';

@Component({
  selector: 'file-upload-view',
  standalone: false,
  templateUrl: './file-upload-view.component.html',
  styleUrl: './file-upload-view.component.scss',
})
export class FileUploadViewComponent implements OnInit, OnChanges {
  @Input({ required: true }) studentResponse!: StudentResponse;

  files: any[] = [];
  title: string = '';

  ngOnInit(): void {
    this.initValues(this.studentResponse);
  }

  ngOnChanges(): void {
    this.initValues(this.studentResponse);
  }

  initValues(studentResponse: StudentResponse) {
    const data = studentResponse.data as AssignmentResponseData;
    this.files = data.files || [];
    this.title = this.files.length > 1 ? 'Files uploaded' : 'File uploaded';
  }
}
