import { Component, OnInit } from '@angular/core';
import { GOOGLE_ICON_LINK } from '@shared/helper/google-icon.helper';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ng-lets-learn-fe';

  ngOnInit() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = GOOGLE_ICON_LINK;
    document.head.appendChild(link);
  }
}
