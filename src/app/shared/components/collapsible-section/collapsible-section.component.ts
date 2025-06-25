import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CollapsibleListService } from '../collapsible-list/collapsible-list.service';
import { CollapsibleSectionService } from './collapsible-section.service';

@Component({
  selector: 'app-collapsible-section',
  standalone: false,
  templateUrl: './collapsible-section.component.html',
  styleUrl: './collapsible-section.component.scss',
  providers: [CollapsibleSectionService],
})
export class CollapsibleSectionComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) sectionId!: string;
  @Input() title: string = '';
  @Input() hasBorder: boolean = true;
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<string>();
  @Output() titleChange = new EventEmitter<string>();
  canEdit = true;
  isEditing = false;
  isExpanded = false;
  isEditingTitle = false;
  @ViewChild('collapsibleRef') collapsibleRef!: ElementRef;
  @ViewChild('titleInput') titleInputRef!: ElementRef<HTMLInputElement>;

  maxCollapsibleHeight = '0px';
  collapsibleService = inject(CollapsibleSectionService);
  collapsibleListService = inject(CollapsibleListService);

  ngOnInit(): void {
    this.collapsibleService.setSectionId(this.sectionId);
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
    if (!this.canEdit || this.isEditingTitle) return;
    this.collapsibleListService.toggleExpand(this.sectionId);
    this.updateContentHeight();
  }

  toggleEdit(e: Event): void {
    e.stopPropagation();
    if (!this.canEdit || this.isEditingTitle) return;
    this.collapsibleListService.toggleEdit(this.sectionId);
  }

  toggleEditingTitle(): void {
    if (!this.canEdit) return;
    this.isEditingTitle = !this.isEditingTitle;
  }

  setEditingTitle(isEditing: boolean): void {
    if (!this.canEdit) return;
    this.isEditingTitle = isEditing;
  }

  onCancelTitleChange(): void {
    if (!this.canEdit || !this.isEditingTitle) return;
    this.setEditingTitle(false);
    if (this.titleInputRef?.nativeElement) {
      this.titleInputRef.nativeElement.value = this.title;
    }
  }

  onSaveTitle(): void {
    if (!this.titleInputRef?.nativeElement) return;
    const newTitle = this.titleInputRef.nativeElement.value.trim();
    this.titleChange.emit(newTitle);
    this.setEditingTitle(false);
  }

  onSave(): void {
    if (!this.canEdit) return;
    this.collapsibleListService.removeEditingSectionId(this.sectionId);
    this.setEditingTitle(false);
    this.save.emit(this.sectionId);
  }

  onCancel(): void {
    if (!this.canEdit) return;
    this.collapsibleListService.removeEditingSectionId(this.sectionId);
    this.setEditingTitle(false);
    this.cancel.emit(this.sectionId);
  }

  private updateContentHeight(): void {
    if (!this.collapsibleRef?.nativeElement) return;

    requestAnimationFrame(() => {
      const scrollHeight = this.collapsibleRef.nativeElement.scrollHeight;
      this.maxCollapsibleHeight = this.isExpanded
        ? `${scrollHeight + 200}px`
        : '0px';
    });
  }
}
