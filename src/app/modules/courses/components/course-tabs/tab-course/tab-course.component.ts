import { Component, inject, Input } from '@angular/core';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { Course } from '@shared/models/course';

@Component({
  selector: 'tab-course',
  standalone: false,
  templateUrl: './tab-course.component.html',
  styleUrl: './tab-course.component.scss',
  providers: [CollapsibleListService],
})
export class TabCourseComponent {
  @Input({ required: true }) course!: Course;
  @Input() canEdit = true;

  collapsibleListService = inject(CollapsibleListService);

  collapseAllSections() {
    this.collapsibleListService.collapseAll();
  }
}
