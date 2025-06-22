import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { Course, Section } from '@shared/models/course';
import { CourseService } from '@shared/services/course.service';
import {
  CreateTopicRequest,
  TopicService,
} from '@shared/services/topic.service';
import { ToastrService } from 'ngx-toastr';
import { AddTopicDialogResult } from '../../../add-topic-dialog/add-topic-dialog.component';
import { UpdateCourseImageResult } from '../../../update-course-image-dialog/update-course-image-dialog.component';

@Component({
  selector: 'tab-course',
  standalone: false,
  templateUrl: './tab-course.component.html',
  styleUrl: './tab-course.component.scss',
  providers: [CollapsibleListService],
})
export class TabCourseComponent implements OnInit {
  @Input({ required: true }) course!: Course;
  @Input() canEdit = true;
  @Output() updateSectionList = new EventEmitter<Section[]>();
  @Output() cancelChange = new EventEmitter();

  edittingSectionIds: string[] = [];

  showAddTopicDialog = false;
  selectedSectionId = '';
  showUpdateImageDialog = false;
  constructor(
    private collapsibleListService: CollapsibleListService,
    private toastr: ToastrService,
    private topicService: TopicService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.collapsibleListService.setCanEdit(this.canEdit);
    const ids = this.course.sections.map((s) => s.id);
    this.collapsibleListService.setSectionIds(ids);
    this.collapsibleListService.editingSectionIds$.subscribe((ids) => {
      this.edittingSectionIds = ids;
    });
  }
  onCopyCourseId() {
    navigator.clipboard.writeText(this.course.id).then(() => {
      this.toastr.success('Copied to clipboard');
    });
  }
  onCustomizeCourse() {
    this.showUpdateImageDialog = true;
  }

  isEditingSection(id: string): boolean {
    return this.edittingSectionIds.includes(id);
  }

  // Dialog methods
  openAddTopicDialog(sectionId: string) {
    this.selectedSectionId = sectionId;
    this.showAddTopicDialog = true;
  }

  closeAddTopicDialog() {
    this.showAddTopicDialog = false;
    this.selectedSectionId = '';
  }

  closeUpdateImageDialog() {
    this.showUpdateImageDialog = false;
  }

  onUpdateImage(result: UpdateCourseImageResult) {
    if (result && result.success) {
      // Update the course image URL
      this.course.imageUrl = result.imageUrl;
      this.toastr.success(result.message);
    }
  }

  onAddNewTopic(result: AddTopicDialogResult) {
    const createRequest: CreateTopicRequest = {
      sectionId: result.sectionId,
      type: result.topicType,
    };

    const section = this.course.sections.find(
      (s) => s.id === createRequest.sectionId
    );
    if (!section) return;
    const newTopic = this.topicService.getNewTopic(createRequest);
    const updatedSection = this.courseService.updateSectionByAddingTopic(
      section,
      newTopic
    );
    const updatedSections = this.courseService.updateCourseByUpdatingSection(
      this.course,
      updatedSection
    );
    this.updateSectionList.emit(updatedSections);
  }

  onAddNewSection() {
    const newSection = this.courseService.getNewSection(this.course);
    this.updateSectionList.emit([...this.course.sections, newSection]);
  }

  saveCourse() {
    this.courseService.saveCourse(this.course).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(response.message);
        } else {
          this.toastr.error('Failed to save course');
        }
      },
      error: (error) => {
        console.error('Error saving course:', error);
        this.toastr.error('Failed to save course');
      },
    });
  }

  cancelChanges() {
    this.cancelChange.emit();
  }
}
