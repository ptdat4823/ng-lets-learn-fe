import { Component, Input, OnInit } from '@angular/core';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { Course, Section } from '@shared/models/course';
import { Topic } from '@shared/models/topic';
import { ToastrService } from 'ngx-toastr';

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
  edittingSectionIds: string[] = [];

  constructor(
    private collapsibleListService: CollapsibleListService,
    private toastr: ToastrService
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
}
