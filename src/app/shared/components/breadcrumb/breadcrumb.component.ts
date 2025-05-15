import { Component, Input, OnInit } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  active?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator: string = '>';
  @Input() color: string = '#6e7781';
  @Input() fontSize: string = '14px';
  @Input() separatorSpacing: string = '12px';

  constructor() {}

  ngOnInit(): void {
    // Mark the last item as active if no active item is specified
    if (this.items.length > 0 && !this.items.some((item) => item.active)) {
      this.items[this.items.length - 1].active = true;
    }
  }

  isLastItem(index: number): boolean {
    return index === this.items.length - 1;
  }

  getSeparatorStyle() {
    return {
      margin: `0 ${this.separatorSpacing}`,
      color: this.color,
      'font-weight': 'normal',
    };
  }
}
