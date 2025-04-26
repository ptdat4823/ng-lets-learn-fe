import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { mockTopics } from '@shared/mocks/topic';
import { Section } from '@shared/models/course';
import { ButtonComponent } from '../button/button.component';
import { CollapsibleListService } from '../collapsible-list/collapsible-list.service';
import { TopicComponent } from '../topic/topic.component';
import { CollapsibleSectionService } from './collapsible-section.service';

@Component({
  selector: 'collapsible-section',
  standalone: true,
  templateUrl: './collapsible-section.component.html',
  styleUrl: './collapsible-section.component.scss',
  imports: [ButtonComponent, TopicComponent],
  providers: [CollapsibleSectionService],
})
export class CollapsibleSectionComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) section!: Section;
  canEdit = true;
  isEditing = false;
  isExpanded = false;
  @ViewChild('collapsibleRef') collapsibleRef!: ElementRef;

  maxCollapsibleHeight = '60px';
  collapsibleService = inject(CollapsibleSectionService);
  collapsibleListService = inject(CollapsibleListService);

  ngOnInit(): void {
    this.collapsibleService.setSection(this.section);
    this.collapsibleService.section$.subscribe((section) => {
      if (section) this.section = section;
    });

    this.collapsibleListService.expandedSectionIds$.subscribe((ids) => {
      this.isExpanded = ids.includes(this.section.id);
      this.updateContentHeight();
    });
    this.collapsibleListService.canEdit$.subscribe((canEdit) => {
      this.canEdit = canEdit;
    });
    this.collapsibleListService.editingSectionIds$.subscribe((ids) => {
      this.isEditing = ids.includes(this.section.id);
    });
  }

  ngAfterViewInit(): void {
    this.updateContentHeight();
  }

  addOneMoreItem(): void {
    this.collapsibleService.addTopic(mockTopics[0]);
    this.updateContentHeight();
  }

  toggleExpand(): void {
    this.collapsibleListService.toggleExpand(this.section.id);
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
