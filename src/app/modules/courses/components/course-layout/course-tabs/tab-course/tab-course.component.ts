import { Component, Input, OnInit } from '@angular/core';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { Course, Section } from '@shared/models/course';
import { Topic } from '@shared/models/topic';
import { ToastrService } from 'ngx-toastr';
import { TopicService, CreateTopicRequest } from '@shared/services/topic.service';
import { CourseService, CreateSectionRequest } from '@shared/services/course.service';
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
  @Input() canEdit = true;  edittingSectionIds: string[] = [];

  showAddTopicDialog = false;
  selectedSectionId = '';
  showUpdateImageDialog = false;  constructor(
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
  }  onCustomizeCourse() {
    this.showUpdateImageDialog = true;
  }

  isEditingSection(id: string): boolean {
    return this.edittingSectionIds.includes(id);
  }

  addTopic(sectionId: string, topic: Topic) {
    const currentSection = this.course.sections.find(
      (section) => section.id === sectionId
    );
    if (!currentSection) return;

    const updatedSection: Section = {
      ...currentSection,
      topics: [...currentSection.topics, topic],
    };

    this.course.sections = this.course.sections.map((section) =>
      section.id === updatedSection.id ? updatedSection : section
    );
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

  onAddTopic(result: AddTopicDialogResult) {
    const createRequest: CreateTopicRequest = {
      sectionId: result.sectionId,
      type: result.topicType
    };

    this.topicService.createTopic(createRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.addTopic(result.sectionId, response.topic);
          this.toastr.success(response.message);
        } else {
          this.toastr.error('Failed to create topic');
        }
      },
      error: (error) => {
        console.error('Error creating topic:', error);
        this.toastr.error('Failed to create topic');
      }
    });  }
  // Additional action methods
  addNewSection() {
    const createRequest: CreateSectionRequest = {
      courseId: this.course.id,
      position: this.course.sections.length + 1
    };

    this.courseService.createSection(createRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.course.sections.push(response.section);

          // Update collapsible list service with new section
          const ids = this.course.sections.map((s) => s.id);
          this.collapsibleListService.setSectionIds(ids);

          this.toastr.success(response.message);
        } else {
          this.toastr.error('Failed to create section');
        }
      },
      error: (error) => {
        console.error('Error creating section:', error);
        this.toastr.error('Failed to create section');
      }
    });
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
      }
    });
  }

  cancelChanges() {
    this.toastr.info('Changes cancelled');
  }
}
