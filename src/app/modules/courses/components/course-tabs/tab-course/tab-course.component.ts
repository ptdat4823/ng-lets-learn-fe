import { Component, inject, Input } from '@angular/core';
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
export class TabCourseComponent {
  @Input({ required: true }) course!: Course;
  @Input() canEdit = true;

  collapsibleListService = inject(CollapsibleListService);
  toastr = inject(ToastrService);

  collapseAllSections() {
    this.collapsibleListService.collapseAll();
  }

  onCopyCourseId() {
    navigator.clipboard.writeText(this.course.id).then(() => {
      this.toastr.success('Hello world!');
    });
  }
}
