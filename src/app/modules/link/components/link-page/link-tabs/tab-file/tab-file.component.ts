import { Component, Input, OnInit } from '@angular/core';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { LinkTopic } from '@shared/models/topic';
import { LinkTabService } from '../link-tab.service';
@Component({
  selector: 'tab-file',
  standalone:false,
  templateUrl: './tab-file.component.html',
  styleUrls: ['./tab-file.component.scss']
})
export class TabFileComponent implements OnInit {
  @Input({ required: true }) topic!: any;

  uploadedFileUrl: string | null = null;
  uploadedFileName: string | null = null;
  
  constructor(
    private tabService: TabService<string>,
    private linkTabService: LinkTabService, 
  ) {}

  ngOnInit(): void {
      this.linkTabService.fileUrl$.subscribe(url => {
      this.uploadedFileUrl = url;
    });
    
    this.linkTabService.fileName$.subscribe(name => {
      this.uploadedFileName = name;
    });
  }
}
