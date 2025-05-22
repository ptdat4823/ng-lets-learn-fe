import { Component, Input, OnInit } from '@angular/core';
import { StudentResponseService } from '@shared/services/student-response.service';
import { PageTopic } from '@shared/models/topic';
import { TabService } from '@shared/components/tab-list/tab-list.service';
import { PageTab } from '@modules/page/constants/page.constant';

@Component({
  selector: 'tab-page',
  standalone: false,
  templateUrl: './tab-Page.component.html',
  styleUrl: './tab-Page.component.scss',
  providers: [StudentResponseService],
})
export class TabPageComponent implements OnInit {
  @Input({ required: true }) topic!: PageTopic;

  constructor(private tabService: TabService<string>) {}

  ngOnInit(): void {}
}
