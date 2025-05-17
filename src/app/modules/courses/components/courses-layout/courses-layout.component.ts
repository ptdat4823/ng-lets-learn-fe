import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';

@Component({
  selector: 'app-courses-layout',
  standalone: false,
  templateUrl: './courses-layout.component.html',
  styleUrl: './courses-layout.component.scss',
})
export class CoursesLayoutComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}
  ngOnInit(): void {
    console.log('CoursesLayoutComponent initialized');
    this.breadcrumbService.setBreadcrumbs([
      {
        label: 'Home',
        url: '/courses',
        active: true,
      },
    ]);
  }
}
