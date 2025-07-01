import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CreateAssignmentResponse,
  DeleteAssignmentResponse,
  GetAllAssignmentResponsesOfTopic,
} from '@modules/assignment/api/assignment-response.api';
import { acceptedExplorerFileTypes } from '@modules/assignment/constants/assignment.constant';
import { UploadMultipleCloudinaryFiles } from '@shared/api/cloudinary.api';
import { convertCloudinaryUrlToDownloadUrl } from '@shared/helper/cloudinary.api.helper';
import { compareTime, formatDateString } from '@shared/helper/date.helper';
import { AssignmentData } from '@shared/models/assignment';
import { CloudinaryFile } from '@shared/models/cloudinary-file';
import {
  AssignmentResponseData,
  StudentResponse,
} from '@shared/models/student-response';
import { AssignmentTopic } from '@shared/models/topic';
import { StudentResponseService } from '@shared/services/student-response.service';
import { UserService } from '@shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tab-assignment-student',
  standalone: false,
  templateUrl: './tab-assignment.component.html',
  styleUrl: './tab-assignment.component.scss',
  providers: [StudentResponseService],
})
export class TabAssignmentStudentComponent implements OnInit, OnChanges {
  @Input({ required: true }) topic!: AssignmentTopic;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  acceptedFileTypes = acceptedExplorerFileTypes;
  studentResponse: StudentResponse | null = null;
  uploadedFiles: CloudinaryFile[] = [];
  hasGraded = false;
  canAddSubmission = true;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUserAssignmentResponse();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topic'] && this.topic) {
      const assignmentData = this.topic.data as AssignmentData;
      this.uploadedFiles = assignmentData.cloudinaryFiles ?? [];
      this.updateCanSubmitStatus(this.topic);
    }
  }

  updateCanSubmitStatus(topic: AssignmentTopic) {
    const now = new Date();
    const openDate = topic.data.open ? new Date(topic.data.open) : null;
    const closeDate = topic.data.close ? new Date(topic.data.close) : null;

    if (openDate && now < openDate) {
      this.canAddSubmission = false;
    } else if (closeDate && now > closeDate) {
      this.canAddSubmission = false;
    } else {
      this.canAddSubmission = true;
    }
  }

  async fetchUserAssignmentResponse() {
    try {
      const user = this.userService.getUser();
      if (user) {
        const responses = await GetAllAssignmentResponsesOfTopic(this.topic.id);
        this.studentResponse =
          responses.find(
            (response: StudentResponse) => response.student.id === user.id
          ) || null;
        if (this.studentResponse) {
          const data = this.studentResponse.data as AssignmentResponseData;
          this.hasGraded = data.mark !== null && data.mark !== undefined;
        }
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
        const fileList: CloudinaryFile[] = cloudinaryResponses.map(
          (response: any, idx: number) => ({
            id: crypto.randomUUID(),
            name: files[idx].name,
            displayUrl: response.url,
            downloadUrl: convertCloudinaryUrlToDownloadUrl(response.url),
          })
        );

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
        this.studentResponse = await CreateAssignmentResponse(
          this.topic.id,
          newResponse
        );
        this.toastr.success('Assignment submitted successfully', 'Success');
      } catch (error) {
        console.error('Error submitting assignment:', error);
        if (error instanceof Error) {
          this.toastr.error(
            `Failed to submit assignment: ${error.message}`,
            'Error'
          );
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
