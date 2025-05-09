import { Component, inject, OnInit } from '@angular/core';
import { CollapsibleListService } from './collapsible-list.service';

@Component({
  selector: 'app-collapsible-list',
  standalone: false,
  templateUrl: './collapsible-list.component.html',
  styleUrl: './collapsible-list.component.scss',
})
export class CollapsibleListComponent implements OnInit {
  canEdit = true;
  expandedSectionIds: string[] = [];
  editingSectionIds: string[] = [];
  collapsibleListService = inject(CollapsibleListService);
  toggleString = 'Collapse all';

  ngOnInit(): void {
    this.toggleString = this.collapsibleListService.isAllCollapsed()
      ? 'Expand all'
      : 'Collapse all';
    this.collapsibleListService.canEdit$.subscribe((canEdit) => {
      this.canEdit = canEdit;
    });
    this.collapsibleListService.expandedSectionIds$.subscribe((ids) => {
      this.expandedSectionIds = ids;
      this.toggleString = ids.length > 0 ? 'Collapse all' : 'Expand all';
    });
    this.collapsibleListService.editingSectionIds$.subscribe((ids) => {
      this.editingSectionIds = ids;
    });
  }

  toggleAllSectionState() {
    this.collapsibleListService.toggleAllSectionStates();
  }
}
