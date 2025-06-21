import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@shared/constants/routes';
import { GOOGLE_ICON_LINK } from '@shared/helper/google-icon.helper';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ng-lets-learn-fe';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Config for Google Material Icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = GOOGLE_ICON_LINK;
    document.head.appendChild(link);

    // Subscribe to user changes
    this.userService.user$.subscribe((user) => {
      // Use set timeout to ensure the router navigation happens after the current change detection cycle
      // This ensures that we can get correct current URL
      setTimeout(() => {
        if (!user) {
          if (
            this.router.url !== ROUTES.LOGIN &&
            this.router.url !== ROUTES.SIGN_UP
          ) {
            // Clear the url tree to avoid go back to the working page
            const tree = this.router.createUrlTree([ROUTES.LOGIN]);
            this.router.navigateByUrl(tree, { replaceUrl: true });
          }
        } else {
          // Clear the url tree to avoid go back to the login page
          const tree = this.router.createUrlTree([ROUTES.HOME]);
          this.router.navigateByUrl(tree, { replaceUrl: true });
        }
      });
    });
  }
}
