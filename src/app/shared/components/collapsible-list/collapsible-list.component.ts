import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  inject,
  OnInit,
  QueryList,
} from '@angular/core';
import { CollapsibleSectionComponent } from '../collapsible-section/collapsible-section.component';
import { CollapsibleListService } from './collapsible-list.service';

@Component({
  selector: 'app-collapsible-list',
  standalone: true,
  templateUrl: './collapsible-list.component.html',
  styleUrl: './collapsible-list.component.scss',
  imports: [CommonModule],
})
export class CollapsibleListComponent implements OnInit {
  canEdit = true;
  expandedSectionIds: string[] = [];
  editingSectionIds: string[] = [];
  collapsibleListService = inject(CollapsibleListService);

  ngOnInit(): void {
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
