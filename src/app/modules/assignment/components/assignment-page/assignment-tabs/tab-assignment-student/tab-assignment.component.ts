import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StudentResponseService } from '@shared/services/student-response.service';
import { AssignmentTopic } from '@shared/models/topic';
import { formatDateString } from '@shared/helper/date.helper';
import { acceptedExplorerFileTypes } from '@modules/assignment/constants/assignment.constant';
import { StudentResponse } from '@shared/models/student-response';
import { GetAllAssignmentResponsesOfTopic, CreateAssignmentResponse, DeleteAssignmentResponse } from '@modules/assignment/api/assignment-response.api';
import { UserService } from '@shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UploadMultipleCloudinaryFiles } from '@shared/api/cloudinary.api';
import { convertCloudinaryUrlToDownloadUrl } from '@shared/helper/cloudinary.api.helper';
import { CloudinaryFile } from '@shared/models/cloudinary-file';

@Component({
  selector: 'tab-assignment-student',
  standalone: false,
  templateUrl: './tab-assignment.component.html',
  styleUrl: './tab-assignment.component.scss',
  providers: [StudentResponseService],
})
export class TabAssignmentStudentComponent implements OnInit {
  @Input({ required: true }) topic!: AssignmentTopic;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  acceptedFileTypes = acceptedExplorerFileTypes;
  studentResponse: StudentResponse | null = null;

  constructor(
    private studentResponseService: StudentResponseService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUserAssignmentResponse();
  }

  async fetchUserAssignmentResponse() {
    try {
      const user = this.userService.getUser();
      if (user) {
        const responses = await GetAllAssignmentResponsesOfTopic(this.topic.id);
        this.studentResponse = responses.find((response: StudentResponse) => 
          response.student.id === user.id
        ) || null;
      }
    } catch (error) {
      this.toastr.error('Failed to fetch assignment response', 'Error');
    }
  }

  formatDate(date: string | null, pattern: string = 'MM/dd/yyyy HH:mm a') {
    return formatDateString(date, pattern);
  }

  openExplorer() {
    this.fileInput.nativeElement.click();
  }

  async onSelectedFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      
      const user = this.userService.getUser();
      if (!user) {
        this.toastr.error('User not found', 'Error');
        return;
      }

      try {
        // Upload files to Cloudinary
        this.toastr.info('Uploading files...', 'Please wait');
        const cloudinaryResponses = await UploadMultipleCloudinaryFiles(files);
        
        // Convert Cloudinary responses to CloudinaryFile objects
        const fileList: CloudinaryFile[] = cloudinaryResponses.map((response: any, idx: number) => ({
          id: crypto.randomUUID(),
          name: files[idx].name,
          displayUrl: response.url,
          downloadUrl: convertCloudinaryUrlToDownloadUrl(response.url),
        }));

        const newResponse = {
          id: '',
          student: user,
          topicId: this.topic.id,
          data: {
            submittedAt: new Date().toISOString(),
            files: fileList,
            mark: null,
            note: '',
          },
        };

        console.log('Creating assignment response with data:', newResponse);
        this.studentResponse = await CreateAssignmentResponse(this.topic.id, newResponse);
        this.toastr.success('Assignment submitted successfully', 'Success');
      } catch (error) {
        console.error('Error submitting assignment:', error);
        if (error instanceof Error) {
          this.toastr.error(`Failed to submit assignment: ${error.message}`, 'Error');
        } else {
          this.toastr.error('Failed to submit assignment', 'Error');
        }
      }
    }
    this.fileInput.nativeElement.value = '';
  }

  async onRemoveSubmission() {
    if (!this.studentResponse) return;
    try {
      await DeleteAssignmentResponse(this.topic.id, this.studentResponse.id);
      this.studentResponse = null;
      this.toastr.success('Submission removed successfully', 'Success');
    } catch (error) {
      this.toastr.error('Failed to remove submission', 'Error');
    }
  }
}
