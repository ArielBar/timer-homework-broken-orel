import { Injectable, NgZone } from '@angular/core';
import { Observable, timer, BehaviorSubject, Subscription } from 'rxjs';
import { filter, map, takeWhile } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TimerManagerService {
  readonly initialValue = 0;
  private timers: {
    id: number;
    subj$: BehaviorSubject<number>;
    isRunning: boolean;
  }[] = [];
  private subscription: Subscription | null = null;

  constructor(private ngZone: NgZone) {}

  getTimer(id: number): Observable<number> {
    const newTimer = this.createTimer();
    this.timers.push({ id, subj$: newTimer, isRunning: false });
    return newTimer.asObservable();
  }

  private createTimer() {
    return new BehaviorSubject<number>(this.initialValue);
  }

  public playTimer(id: number): void {
    const timer = this.timers.find((x) => x.id === id);
    if (timer) {
      timer.isRunning = true;
    }
    this.startCountingIfAnyTimerRunning(); // function that start the timer when at least 1 timer should running
  }

  public pauseTimer(id: number): void {
    const timer = this.timers.find((x) => x.id === id);
    if (timer) {
      timer.isRunning = false;
    }
    this.stopCountingIfAllTimersStop(); // function that destroy the timer when all timers has paused
  }

  private startCountingIfAnyTimerRunning() {
    if (!this.subscription && this.timers.some(timer => timer.isRunning)) {
      this.runTimers();
    }
  }

  private stopCountingIfAllTimersStop() {
    if (this.subscription && this.timers.every(timer => !timer.isRunning)) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private runTimers(): void {
    this.ngZone.runOutsideAngular(() => {
      this.subscription = timer(0, 1000).pipe(
        map(() => this.timers.filter(timer => timer.isRunning)),
        filter(runningTimers => runningTimers.length > 0),
        takeWhile(runningTimers => runningTimers.length > 0)
      ).subscribe((timers) => {
          this.ngZone.run(() => {
            timers.forEach((timer) => timer.subj$.next(timer.subj$.value + 1))
          })
      })
    })
  }
}
