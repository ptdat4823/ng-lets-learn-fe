import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LinkTopic } from '@shared/models/topic';

@Component({
  selector: 'tab-file',
  standalone: false,
  templateUrl: './tab-file.component.html',
  styleUrls: ['./tab-file.component.scss']
})
export class TabFileComponent implements OnInit, OnChanges {
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

  onLinkClick(): void {
    if (!this.linkUrl) {
      console.warn('No URL available');
      alert('No file has been uploaded yet. Please upload a file in the Settings tab first.');
      return;
    }
    window.open(this.linkUrl, '_blank');
  }
}
