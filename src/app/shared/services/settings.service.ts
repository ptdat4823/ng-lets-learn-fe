import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@shared/services/user.service';
import {UpdateProfile, UpdatePassword} from '@shared/api/user.api';
@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(
    private userService: UserService,
    private toastService: ToastrService
  ) {}

  updateProfile(username: string, avatar: string) {
    return UpdateProfile(username, avatar)
      .then((updatedUser) => {
        this.userService.setUser(updatedUser);
        this.toastService.success('Profile updated successfully');
        return updatedUser;
      })
      .catch((error) => {
        this.toastService.error(error.message);
        throw error;
      });
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return UpdatePassword(oldPassword, newPassword)
      .then(() => {
        this.toastService.success('Password updated successfully');
      })
      .catch((error) => {
        this.toastService.error(error.message);
        throw error;
      });
  }
}
