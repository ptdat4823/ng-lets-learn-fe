import { Injectable } from '@angular/core';
import { User } from '@shared/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor() {}

  setUser(user: User) {
    this.user.next(user);
  }

  getUser(): User | null {
    return this.user.getValue();
  }
}
