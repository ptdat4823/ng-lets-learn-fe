import { Injectable } from '@angular/core';
import { interval, BehaviorSubject, Subscription } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { TimerType } from './timer.component';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private countUpSubject = new BehaviorSubject<number>(0);
  countUp$ = this.countUpSubject.asObservable();

  private countDownSubject = new BehaviorSubject<number>(0);
  countDown$ = this.countDownSubject.asObservable();

  private timerSub?: Subscription;
  private countDownSub?: Subscription;
  private type: TimerType = 'count-up';
  private startTime: Date = new Date();

  private unscribe() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = undefined;
    } else if (this.countDownSub) {
      this.countDownSub.unsubscribe();
      this.countDownSub = undefined;
    }
  }

  setTimerType(type: TimerType) {
    this.type = type;
  }

  setCountUp(countUp: number) {
    this.countUpSubject.next(countUp);
  }

  setCountDown(countDown: number) {
    this.countDownSubject.next(countDown);
  }

  start() {
    if (this.type === 'count-up') this.startCountUp();
    else this.startCountDown();
  }

  startCountUp() {
    if (this.timerSub) return;
    this.timerSub = interval(1000).subscribe((seconds) => {
      if (seconds === 0) this.startTime = new Date();
      this.countUpSubject.next(seconds);
    });
  }

  startCountDown() {
    if (this.countDownSub) return;
    const from = this.countDownSubject.getValue();
    this.countDownSub = interval(1000).subscribe((value) => {
      if (value === 0) {
        this.startTime = new Date();
        console.log('start time', this.startTime);
      }
      this.countDownSubject.next(from - value);
    });
  }

  stop() {
    this.unscribe();
    return new Date();
  }

  reset() {
    this.countUpSubject.next(0);
    this.countDownSubject.next(0);
  }

  getStartTime() {
    return this.startTime;
  }
}
