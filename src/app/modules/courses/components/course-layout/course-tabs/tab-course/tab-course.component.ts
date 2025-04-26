import { Component, inject, Input, OnInit } from '@angular/core';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';
import { Course } from '@shared/models/course';
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

  collapsibleListService = inject(CollapsibleListService);
  toastr = inject(ToastrService);
  toggleString = 'Collapse all';

  ngOnInit(): void {
    this.toggleString = this.collapsibleListService.isAllCollapsed()
      ? 'Expand all'
      : 'Collapse all';
    this.collapsibleListService.setCanEdit(this.canEdit);
    this.collapsibleListService.setSections(this.course.sections);
    this.collapsibleListService.expandedSectionIds$.subscribe((ids) => {
      this.toggleString = ids.length > 0 ? 'Collapse all' : 'Expand all';
    });
  }

  toggleAllSectionState() {
    this.collapsibleListService.toggleAllSectionStates();
  }

  onCopyCourseId() {
    navigator.clipboard.writeText(this.course.id).then(() => {
      this.toastr.success('Copied to clipboard');
    });
  }
}
