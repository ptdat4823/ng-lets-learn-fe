import { Injectable } from '@angular/core';
import { Login, Logout, SignUp } from '@modules/auth/api/auth.api';
import { GetProfile } from '@shared/api/user.api';
import { Role } from '@shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ROUTES } from '@shared/constants/routes';
import { clearAllLocalStorageData } from '@shared/helper/local-storage.helper';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  onLoginSuccess(res: any) {
    return GetProfile().then((profile) => {
      this.userService.setUser(profile);
      this.toastService.success(res.message);
    });
  }

  login(email: string, password: string) {
    return Login(email, password)
      .then((res) => this.onLoginSuccess(res))
      .catch((error) => {
        this.toastService.error(error.message);
      });
  }

  signup(
    username: string,
    email: string,
    password: string,
    isTeacher: boolean
  ) {
    return SignUp(
      username,
      email,
      password,
      isTeacher ? Role.TEACHER : Role.STUDENT
    )
      .then((res) => {
        this.toastService.success(res.message);
        this.router.navigate([ROUTES.LOGIN]);
      })
      .catch((error) => {
        this.toastService.error(error.message);
      });
  }

  logout() {
    return Logout()
      .then(() => {
        this.userService.clearUser();
        this.toastService.success('Logged out successfully');
        clearAllLocalStorageData();
      })
      .catch((error) => {
        this.toastService.error(error.message);
      });
  }
}
