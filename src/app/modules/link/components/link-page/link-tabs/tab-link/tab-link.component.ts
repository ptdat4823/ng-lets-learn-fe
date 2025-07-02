import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LinkTopic } from '@shared/models/topic';

@Component({
  selector: 'tab-file',
  standalone: false,
  templateUrl: './tab-link.component.html',
  styleUrls: ['./tab-link.component.scss'],
})
export class TabLinkComponent implements OnInit, OnChanges {
  @Input({ required: true }) topic!: LinkTopic;

  hasLink: boolean = false;
  linkUrl: string | null = null;

  constructor() {}
  ngOnInit(): void {
    // Get URL from topic data
    this.linkUrl = this.topic?.data?.url || null;
    this.hasLink = !!this.linkUrl;
  }

  ngOnChanges(): void {
    // Update when topic changes
    this.linkUrl = this.topic?.data?.url || null;
    this.hasLink = !!this.linkUrl;
  }
}
