import { Injectable } from '@angular/core';
import { interval, BehaviorSubject, Subscription } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { TimerType } from './timer.component';
import { removeMilliseconds } from '@shared/helper/date.helper';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private countUpSubject = new BehaviorSubject<number>(0);
  countUp$ = this.countUpSubject.asObservable();

  private countDownSubject = new BehaviorSubject<number>(0);
  countDown$ = this.countDownSubject.asObservable();

  private timerSub?: Subscription;
  private countDownSub?: Subscription;

  private timerType = new BehaviorSubject<TimerType>('count-up');
  timerType$ = this.timerType.asObservable();

  private startTime: Date = new Date();
  private completedTime: Date = new Date();

  private unscribe() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = undefined;
    } else if (this.countDownSub) {
      this.countDownSub.unsubscribe();
      this.countDownSub = undefined;
    }
  }

  setTimerType(timerType: TimerType) {
    this.timerType.next(timerType);
  }

  setCountUp(countUp: number) {
    this.countUpSubject.next(countUp);
  }

  setCountDown(countDown: number) {
    this.countDownSubject.next(countDown);
  }

  start() {
    if (this.timerType.getValue() === 'count-up') this.startCountUp();
    else this.startCountDown();
  }

  startCountUp() {
    if (this.timerSub) return;
    this.timerSub = interval(1000).subscribe((seconds) => {
      if (seconds === 0) this.startTime = removeMilliseconds(new Date());
      this.countUpSubject.next(seconds);
    });
  }

  startCountDown() {
    if (this.countDownSub) return;
    const from = this.countDownSubject.getValue();
    this.countDownSub = interval(1000).subscribe((value) => {
      if (value === 0) {
        this.startTime = removeMilliseconds(new Date());
        console.log('start time', this.startTime);
      }
      this.countDownSubject.next(from - value);
    });
  }

  stop() {
    this.unscribe();
    this.completedTime = removeMilliseconds(new Date());
    return this.completedTime;
  }

  reset() {
    this.countUpSubject.next(0);
    this.countDownSubject.next(0);
  }

  getStartTime() {
    return this.startTime;
  }
}
