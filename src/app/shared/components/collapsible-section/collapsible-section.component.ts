import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CollapsibleListService } from '../collapsible-list/collapsible-list.service';
import { CollapsibleSectionService } from './collapsible-section.service';

@Component({
  selector: 'app-collapsible-section',
  standalone: true,
  templateUrl: './collapsible-section.component.html',
  styleUrl: './collapsible-section.component.scss',
  imports: [],
  providers: [CollapsibleSectionService],
})
export class CollapsibleSectionComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) sectionId!: string;
  canEdit = true;
  isEditing = false;
  isExpanded = false;
  @ViewChild('collapsibleRef') collapsibleRef!: ElementRef;

  maxCollapsibleHeight = '60px';
  collapsibleService = inject(CollapsibleSectionService);
  collapsibleListService = inject(CollapsibleListService);

  ngOnInit(): void {
    this.collapsibleService.setSectionId(this.sectionId);
    this.collapsibleService.sectionId$.subscribe((sectionId) => {
      if (sectionId) this.sectionId = sectionId;
    });
    this.collapsibleListService.expandedSectionIds$.subscribe((ids) => {
      this.isExpanded = ids.includes(this.sectionId);
      this.updateContentHeight();
    });
    this.collapsibleListService.canEdit$.subscribe((canEdit) => {
      this.canEdit = canEdit;
    });
    this.collapsibleListService.editingSectionIds$.subscribe((ids) => {
      this.isEditing = ids.includes(this.sectionId);
    });
  }

  ngAfterViewInit(): void {
    this.updateContentHeight();
  }

  toggleExpand(): void {
    this.collapsibleListService.toggleExpand(this.sectionId);
    this.updateContentHeight();
  }

  toggleEdit(e: Event): void {
    e.stopPropagation();
    if (!this.canEdit) return;
    this.isEditing = !this.isEditing;
  }

  private updateContentHeight(): void {
    if (!this.collapsibleRef?.nativeElement) return;

    requestAnimationFrame(() => {
      const scrollHeight = this.collapsibleRef.nativeElement.scrollHeight;
      this.maxCollapsibleHeight = this.isExpanded
        ? `${scrollHeight + 100}px`
        : '60px';
    });
  }
}
