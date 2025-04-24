import { Component, inject, Input, OnInit } from '@angular/core';
import { Section } from '@shared/models/course';
import { CollapsibleSectionComponent } from '../collapsible-section/collapsible-section.component';
import { CollapsibleListService } from './collapsible-list.service';

@Component({
  selector: 'app-collapsible-list',
  standalone: true,
  templateUrl: './collapsible-list.component.html',
  styleUrl: './collapsible-list.component.scss',
  imports: [CollapsibleSectionComponent],
})
export class CollapsibleListComponent implements OnInit {
  @Input() sections: Section[] = [];
  @Input() canEdit = true;
  @Input() expandedSectionIds: string[] = [];
  @Input() editingSectionIds: string[] = [];
  collapsibleListService = inject(CollapsibleListService);

  ngOnInit(): void {
    this.collapsibleListService.setCanEdit(this.canEdit);
    this.collapsibleListService.setSections(this.sections);
    this.collapsibleListService.setExpandedSectionIds(this.expandedSectionIds);
    this.collapsibleListService.setEditingSectionIds(this.editingSectionIds);

    this.collapsibleListService.sections$.subscribe((sections) => {
      this.sections = sections;
    });
    this.collapsibleListService.canEdit$.subscribe((canEdit) => {
      this.canEdit = canEdit;
    });
    this.collapsibleListService.expandedSectionIds$.subscribe((ids) => {
      this.expandedSectionIds = ids;
    });
    this.collapsibleListService.editingSectionIds$.subscribe((ids) => {
      this.editingSectionIds = ids;
    });
  }

  toggleExpand(sectionId: string): void {
    this.collapsibleListService.toggleExpand(sectionId);
  }
}
