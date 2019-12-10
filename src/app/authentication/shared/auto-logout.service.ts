import {Injectable, NgZone} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import * as store from 'store';

const MINUTES_UNITL_AUTO_LOGOUT_HIDDEN = 15;
const MINUTES_UNITL_AUTO_LOGOUT__VISIBLE = 30;
const CHECK_INTERVALL = 1000; // in ms
const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  private isHiddenWindow = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private ngZone: NgZone) {
  }

  get lastAction() {
    return parseInt(store.get(STORE_KEY), 10);
  }

  set lastAction(value) {
    store.set(STORE_KEY, value);
  }

  start() {
    this.check();
    this.initListener();
    this.initInterval();
  }

  private initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            console.log('yes is hidden');
            // this.check();
            // this.initInterval();
            this.isHiddenWindow = true;
            this.reset();
          } else {
            this.isHiddenWindow = false;
            console.log('no is not hidden');
            this.reset();
          }
        }
        , false);
    });
  }

  private initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
        // this.preCheck();
      }, CHECK_INTERVALL);
    });
  }

  private reset() {
    this.lastAction = Date.now();
  }

  private check() {
    const now = Date.now();
    const timeLeft = this.lastAction +
      (this.isHiddenWindow ? MINUTES_UNITL_AUTO_LOGOUT_HIDDEN : MINUTES_UNITL_AUTO_LOGOUT__VISIBLE) * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      if (isTimeout && this.authService.authenticated) {
        this.authService.logout();
        this.router.navigate(['login']).catch(console.log);
      }
    });
  }
}
